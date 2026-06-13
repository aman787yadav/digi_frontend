import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_USER } from "../graphql/mutations";
import { GET_USERS } from "../graphql/queries";
import { useNavigate } from "react-router-dom";

function CreateUser() {
    const [createUser] = useMutation(CREATE_USER, {
        refetchQueries: [{ query: GET_USERS }],
    });
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("USER");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await createUser({
                variables: {
                    name,
                    email,
                    password,
                    role,
                },
            });

            console.log(data);

            alert("User created successfully");

            setName("");
            setEmail("");
            setPassword("");
            setRole("USER");

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div className="content-container max-w-4xl">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Create User</h1>
                    <p className="text-text-muted text-sm">Add a new member to the system and configure their access.</p>
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

                        <div className="space-y-1.5">
                            <label className="input-label">Password *</label>
                            <input
                                className="input-field"
                                type="password"
                                placeholder="Create a secure password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="input-label">Role Assignment *</label>
                            <div className="relative">
                                <select
                                    className="input-field appearance-none cursor-pointer"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="USER" className="bg-card">USER</option>
                                    <option value="ADMIN" className="bg-card">ADMIN</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-muted">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 flex justify-end border-t border-border/50">
                        <button type="submit" className="btn-primary px-8">
                            Create User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;