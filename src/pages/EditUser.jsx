import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client/react";

import { GET_USER, GET_USERS } from "../graphql/queries";
import { UPDATE_USER } from "../graphql/mutations";

export default function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const { loading, error, data } = useQuery(GET_USER, {
        variables: { id },
    });

    const [updateUser] = useMutation(UPDATE_USER, {
        refetchQueries: [{ query: GET_USERS }],
    });

    useEffect(() => {
        if (data?.user) {
            setName(data.user.name);
            setEmail(data.user.email);
            setRole(data.user.role);
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateUser({
                variables: {
                    id,
                    name,
                    email,
                    role,
                },
            });

            alert("User updated successfully");

            navigate("/users");
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) return (
        <div className="content-container flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                <h2 className="text-xl font-medium text-white">Loading user data...</h2>
            </div>
        </div>
    );

    if (error) return (
        <div className="content-container flex items-center justify-center min-h-[50vh]">
            <div className="text-center bg-red-500/10 border border-red-500/20 p-6 rounded-xl max-w-md">
                <svg className="w-10 h-10 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h2 className="text-lg font-medium text-white mb-2">Error loading user</h2>
                <p className="text-red-400/80 text-sm">{error.message}</p>
            </div>
        </div>
    );

    return (
        <div className="content-container max-w-4xl">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Edit User</h1>
                    <p className="text-text-muted text-sm">Update profile information and access level.</p>
                </div>
                <button onClick={() => navigate("/users")} className="btn-secondary !py-2">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Users
                </button>
            </div>

            <div className="card p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="input-label">Full Name *</label>
                            <input
                                className="input-field"
                                type="text"
                                placeholder="e.g. John Snow"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="input-label">Email Address *</label>
                            <input
                                className="input-field"
                                type="email"
                                placeholder="e.g. john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                            <label className="input-label">Role Assignment *</label>
                            <div className="relative md:w-1/2 md:pr-3">
                                <select
                                    className="input-field appearance-none cursor-pointer"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="user" className="bg-card">USER</option>
                                    <option value="admin" className="bg-card">ADMIN</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-muted md:pr-6">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 flex justify-end border-t border-border/50">
                        <button type="submit" className="btn-primary px-8">
                            Update User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}