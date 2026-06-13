import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Users from "./pages/Users";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";

function App() {
    const location = useLocation();
    return (
        <>
            {location.pathname !== "/" &&
                location.pathname !== "/login" &&
                location.pathname !== "/signup" && (
                    <Navbar />
                )}

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                    path="/users"
                    element={
                        <ProtectedRoute>
                            <Users />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/create-user"
                    element={
                        <ProtectedRoute>
                            <CreateUser />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/edit-user/:id"
                    element={
                        <ProtectedRoute>
                            <EditUser />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default App;