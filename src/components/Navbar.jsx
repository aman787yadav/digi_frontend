import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    let role = "";

    if (token) {
        role = jwtDecode(token).role;
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="bg-card border-b border-border sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center mr-8">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-2">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <span className="text-xl font-bold text-white tracking-wide">Digivale</span>
                        </div>
                        <div className="hidden md:flex space-x-1">
                            <Link to="/dashboard" className="text-text-muted hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all">
                                Dashboard
                            </Link>
                            <Link to="/users" className="text-text-muted hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all">
                                Users
                            </Link>
                            {role === "admin" && (
                                <Link to="/create-user" className="text-text-muted hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all">
                                    Create User
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button onClick={handleLogout} className="btn-secondary !py-1.5 !px-4 text-sm">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            {/* Simple responsive visible links on mobile */}
            <div className="md:hidden border-t border-border bg-card/30 px-2 pt-2 pb-3 space-y-1">
                <Link to="/dashboard" className="text-text-muted hover:text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
                <Link to="/users" className="text-text-muted hover:text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium">Users</Link>
                {role === "admin" && (
                    <Link to="/create-user" className="text-text-muted hover:text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium">Create User</Link>
                )}
            </div>
        </nav>
    );
}