import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useNavigate, Link } from "react-router-dom";

import { SIGNUP } from "../graphql/mutations";

export default function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [signup] = useMutation(SIGNUP);

    const handleSignup = async () => {
        try {
            await signup({
                variables: {
                    name,
                    email,
                    password,
                },
            });

            alert("Signup Success");

            navigate("/");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="page-container flex items-center justify-center">
            <div className="card w-full max-w-md p-8">
                <div className="mb-8">
                    <div className="flex justify-center mb-6">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white text-center mb-2">Create an account</h1>
                    <p className="text-text-muted text-center text-sm">
                        Already have an account? <Link to="/" className="text-primary hover:text-primary-hover transition-colors font-medium">Sign in here</Link>
                    </p>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="input-label">Full Name *</label>
                        <input
                            className="input-field"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="input-label">Email address *</label>
                        <input
                            className="input-field"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="input-label">Password *</label>
                        <input
                            className="input-field"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="btn-primary w-full mt-6" onClick={handleSignup}>
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    );
}