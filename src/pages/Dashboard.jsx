import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const token =
        localStorage.getItem("token");

    if (!token) {
        return <h2>Please Login</h2>;
    }

    const user = jwtDecode(token);

    return (
        <div className="content-container">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-text-muted">Welcome back to the administration panel.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="card p-6 col-span-1 lg:col-span-2">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-white mb-1">User Profile</h2>
                            <p className="text-sm text-text-muted">Your current session details and assigned role.</p>
                        </div>
                        <div className={`badge ${user.role === 'admin' ? 'badge-success' : 'badge-warning'} uppercase tracking-wider`}>
                            {user.role}
                        </div>
                    </div>
                    
                    <div className="bg-input/30 rounded-lg p-5 border border-border/50 space-y-4">
                        <div>
                            <p className="text-sm font-medium text-text-muted mb-1">Email Address</p>
                            <p className="text-base text-white font-medium">{user.email}</p>
                        </div>
                        
                        <div className="pt-5 border-t border-border/50">
                            <Link to="/users" className="btn-primary inline-flex">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                                Manage Users
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Quick Information</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 rounded-lg bg-input/50 border border-border/50">
                            <span className="text-text-muted text-sm">Status</span>
                            <span className="flex items-center text-emerald-400 text-sm font-medium">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
                                Active
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-input/50 border border-border/50">
                            <span className="text-text-muted text-sm">Access Level</span>
                            <span className="text-white text-sm font-medium capitalize">{user.role}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}