# Digivale - User Management System (Frontend)

Welcome to the frontend codebase for **Digivale**, a modern User Management System built with **React**, **Vite**, **Apollo Client**, and **Tailwind CSS (v4)**. This application provides a premium user interface for user registration, authentication, dashboard visualisations, and CRUD operations on user data, powered by a backend GraphQL server.

---

## 🚀 Getting Started & Server Startup Instructions

This workspace contains both the backend server (`week_1_project`) and the frontend app (`frontend`).

### 1. Running the Backend Server
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd week_1_project
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Configure the backend environment variables in the `.env` file (e.g. Database connection info, Port, JWT secrets).
4. Run the development server (runs with `ts-node-dev` on port `4000` by default):
   ```bash
   npm run dev
   ```

### 2. Running the Frontend Application
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the local development server (runs with Vite):
   ```bash
   npm run dev
   ```
4. Open the displayed URL (typically `http://localhost:5173`) in your web browser.

---

## 📁 Project File Structure

Here is the folder and file architecture of the frontend directory:

```text
frontend/
├── .vscode/                 # VS Code editor workspace configurations
├── public/                  # Static assets accessible directly (favicons, etc.)
├── src/
│   ├── apollo/
│   │   └── client.js        # Apollo Client instance & authorization header middleware
│   ├── assets/              # Icons, images, and other importable frontend assets
│   ├── components/
│   │   ├── Navbar.jsx       # Global application navigation bar (hidden on auth pages)
│   │   └── ProtectedRoute.jsx # Route guard to redirect unauthorized users
│   ├── graphql/
│   │   ├── mutations.js     # GraphQL mutations (Login, Signup, CRUD user actions)
│   │   └── queries.js       # GraphQL queries (Fetch all users, Fetch single user)
│   ├── pages/
│   │   ├── CreateUser.jsx   # Page for admin to add a new user
│   │   ├── Dashboard.jsx    # User landing page displaying session info and actions
│   │   ├── EditUser.jsx     # Page for admin to edit user information
│   │   ├── Login.jsx        # Login page with credentials authorization form
│   │   ├── Signup.jsx       # Standard registration signup page
│   │   └── Users.jsx        # Table listing users with Search and Delete functionality
│   ├── App.css              # Custom global styles
│   ├── App.jsx              # Main router definition, layout, and protected routes setup
│   ├── index.css            # Tailwind CSS imports and custom utility classes
│   └── main.jsx             # Entrypoint wrapping App with Apollo and Router providers
├── index.html               # Main HTML layout wrapper
├── package.json             # NPM package scripts and client dependencies
├── vite.config.js           # Vite development and build settings
└── README.md                # This documentation file
```

---

## 🔗 GraphQL Integration & Data Fetching (Apollo Client)

The application uses **Apollo Client** to communicate with the backend GraphQL API.

### 1. Apollo Client Configuration
Located in `src/apollo/client.js`, it sets up a standard HttpLink and integrates an **authLink** middleware. The client checks `localStorage` for a `token` and injects it into every request under the `Authorization` header.

```javascript
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
});

// Middleware to inject JWT token into request headers
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "",
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
```

---

## 📡 How Data is Fetched and Modified

Queries and mutations are imported from `@apollo/client` and custom files under `src/graphql/`.

### 1. Fetching Data with `useQuery`
To fetch data, we use the `useQuery` hook. An example from `src/pages/Users.jsx`:

```jsx
import { useQuery } from "@apollo/client/react";
import { GET_USERS } from "../graphql/queries";

export default function Users() {
    const { loading, error, data } = useQuery(GET_USERS);

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <ul>
            {data.users.map(user => (
                <li key={user.id}>{user.name} ({user.email})</li>
            ))}
        </ul>
    );
}
```

*Note: For detail views like user editing, query variables can be passed as options:*
```javascript
const { loading, error, data } = useQuery(GET_USER, {
    variables: { id },
});
```

### 2. Modifying Data with `useMutation`
To perform writes (e.g. creating, editing, deleting user, logging in), we call the `useMutation` hook. An example from `src/pages/CreateUser.jsx`:

```jsx
import { useMutation } from "@apollo/client/react";
import { CREATE_USER } from "../graphql/mutations";
import { GET_USERS } from "../graphql/queries";

// Inside the component:
const [createUser] = useMutation(CREATE_USER, {
    // Automatically refetches list query to update local cache
    refetchQueries: [{ query: GET_USERS }],
});

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await createUser({
            variables: {
                name,
                email,
                password,
                role, // e.g. "USER" or "ADMIN"
            },
        });
        alert("User created successfully!");
    } catch (error) {
        alert(error.message);
    }
};
```

---

## 🪝 React Hooks & State Management

The application utilizes several React and Router hooks to implement local states, routes, and data flows:

### 1. Standard React Hooks
*   `useState`: Tracks user inputs inside forms (e.g. `email`, `password`, `name`, `role`).
*   `useEffect`: Synchronizes state with loaded data. For example, in `EditUser.jsx`, it populates local form states once the query resolves with the user details:
    ```javascript
    useEffect(() => {
        if (data?.user) {
            setName(data.user.name);
            setEmail(data.user.email);
            setRole(data.user.role);
        }
    }, [data]);
    ```

### 2. Routing Hooks (`react-router-dom`)
*   `useNavigate`: Triggers programmatic routing transitions (e.g., redirecting back to `/users` after creating/editing a user).
*   `useParams`: Extracts query/URL variables from dynamic routes (e.g. `const { id } = useParams()` in `/edit-user/:id`).
*   `useLocation`: Checks the current path string to dynamically show or hide the global `Navbar` component.

### 3. JWT Utility Hooks & Decoding
*   `jwt-decode`: Used on the client to decode the base64 JWT payload stored in local storage. This reads the user's logged-in status, `id`, and permissions `role` to conditionally render action items (like the "Create" button or "Delete" option, which are exclusive to the `admin` role).
    ```javascript
    import { jwtDecode } from "jwt-decode";
    
    const token = localStorage.getItem("token");
    const role = token ? jwtDecode(token).role : "";
    ```

---

## 🔒 Route Protection & Guards

Security routing is managed by `ProtectedRoute.jsx` in `src/components/ProtectedRoute.jsx`. It prevents anonymous users from visiting pages like `/users`, `/dashboard`, or `/create-user`:

```jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    // Redirect to login page if token is missing
    if (!token) {
        return <Navigate to="/" />;
    }

    return children;
}
```

It is registered in `App.jsx` as follows:
```jsx
<Route
    path="/users"
    element={
        <ProtectedRoute>
            <Users />
        </ProtectedRoute>
    }
/>
```

---

## 🛡️ Best Practices & Features
*   **Token-Based Persistent Session**: Session tokens are automatically persisted to and fetched from `localStorage`.
*   **Automatic Cache Synchronization**: Deletions, edits, and additions immediately synchronize the listings using Apollo Client's `refetchQueries`.
*   **Dynamic Role-Based Actions**: Components evaluate the JWT payload role to restrict dashboard actions conditionally.
