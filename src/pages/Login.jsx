import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../graphql/mutations";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [login] = useMutation(LOGIN);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const { data } = await login({
                variables: {
                    email,
                    password,
                },
            });

            localStorage.setItem(
                "token",
                data.login.token
            );

            navigate("/dashboard");
        } catch (err) {
            alert(err.message);
        }
    };

    const token = localStorage.getItem("token");

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="page-container flex items-center justify-center">
            <div className="card w-full max-w-md p-8">
                <div className="mb-8">
                    <div className="flex justify-center mb-6">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white text-center mb-2">Sign in to your account</h1>
                    <p className="text-text-muted text-center text-sm">
                        Not a member? <Link to="/signup" className="text-primary hover:text-primary-hover transition-colors font-medium">Sign up here</Link>
                    </p>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="input-label">Email address</label>
                        <input
                            className="input-field"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="input-label">Password</label>
                        <input
                            className="input-field"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>



                    <button className="btn-primary w-full mt-2" onClick={handleLogin}>
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    );
}