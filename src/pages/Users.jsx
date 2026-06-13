import { useQuery } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";
import { GET_USERS } from "../graphql/queries";
import { jwtDecode } from "jwt-decode";
import { useMutation } from "@apollo/client/react";
import { DELETE_USER } from "../graphql/mutations";



export default function Users() {
    const { loading, error, data } =
        useQuery(GET_USERS);
    const [deleteUser] = useMutation(DELETE_USER, {
        refetchQueries: [{ query: GET_USERS }],
    });
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const role = token
        ? jwtDecode(token).role
        : "";

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {
            const { data } = await deleteUser({
                variables: {
                    id,
                },
            });

            console.log(data);

            alert("User deleted successfully");
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    if (loading) return (
        <div className="content-container flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                <h2 className="text-xl font-medium text-white">Loading users...</h2>
            </div>
        </div>
    );

    if (error) return (
        <div className="content-container flex items-center justify-center min-h-[50vh]">
            <div className="text-center bg-red-500/10 border border-red-500/20 p-6 rounded-xl max-w-md">
                <svg className="w-10 h-10 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h2 className="text-lg font-medium text-white mb-2">Error loading users</h2>
                <p className="text-red-400/80 text-sm">{error.message}</p>
            </div>
        </div>
    );

    return (
        <div className="content-container">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Users</h1>
                    <p className="text-text-muted text-sm">Manage team members and their roles.</p>
                </div>
                
                <div className="flex items-center space-x-3">
                    <div className="relative hidden md:block">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input type="text" placeholder="Search..." className="input-field !py-2 !pl-9 !w-64" readOnly />
                    </div>
                    {role === "admin" && (
                        <button onClick={() => navigate("/create-user")} className="btn-primary !py-2">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                            Create
                        </button>
                    )}
                </div>
            </div>

            <div className="table-container">
                {!data || !data.users || data.users.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-input/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-border/50">
                            <svg className="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                        </div>
                        <h3 className="text-lg font-medium text-white mb-1">No users found</h3>
                        <p className="text-text-muted text-sm">There are currently no users to display.</p>
                    </div>
                ) : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                {role === "admin" && <th className="text-right">Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {data.users.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <div className="font-medium text-white">{user.name}</div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`badge ${user.role === 'admin' ? 'badge-success' : 'badge-warning'} uppercase tracking-wide`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    {role === "admin" && (
                                        <td className="text-right">
                                            <div className="flex justify-end space-x-2">
                                                <button onClick={() => navigate(`/edit-user/${user.id}`)} className="btn-icon" title="Edit User">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                                </button>
                                                {user.id !== jwtDecode(token).id && (
                                                    <button onClick={() => handleDelete(user.id)} className="btn-icon text-red-400 hover:text-red-300 hover:bg-red-500/10 hover:border-red-500/30" title="Delete User">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}