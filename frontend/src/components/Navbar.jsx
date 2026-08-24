import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        // Clear authentication
        logout();

        // Force browser to go to Home page
        window.location.href = "/";
    };

    return (
        <nav className="bg-slate-950 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-6">

                <div className="h-16 flex items-center justify-between">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-3"
                    >
                        <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                            E
                        </div>

                        <span className="text-xl font-bold text-white">
                            Eventify
                        </span>
                    </Link>

                    {/* Navigation */}
                    <div className="flex items-center gap-6">

                        {/* Home */}
                        <Link
                            to="/"
                            className="text-slate-300 hover:text-white transition"
                        >
                            Home
                        </Link>

                        {/* Events */}
                        <Link
                            to="/events"
                            className="text-slate-300 hover:text-white transition"
                        >
                            Events
                        </Link>

                        {/* Student */}
                        {user?.role === "STUDENT" && (
                            <Link
                                to="/my-registrations"
                                className="text-slate-300 hover:text-white transition"
                            >
                                My Registrations
                            </Link>
                        )}

                        {/* Admin */}
                        {user?.role === "ADMIN" && (
                            <Link
                                to="/admin"
                                className="text-slate-300 hover:text-white transition"
                            >
                                Admin Dashboard
                            </Link>
                        )}

                        {/* Logged in */}
                        {user ? (
                            <div className="flex items-center gap-4">

                                <div className="hidden sm:block text-right">
                                    <p className="text-sm text-white font-medium">
                                        {user.full_name}
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        {user.role}
                                    </p>
                                </div>

                                {/* LOGOUT */}
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition"
                                >
                                    Logout
                                </button>

                            </div>
                        ) : (
                            <div className="flex items-center gap-3">

                                {/* Login */}
                                <Link
                                    to="/login"
                                    className="text-slate-300 hover:text-white transition text-sm font-medium"
                                >
                                    Login
                                </Link>

                                {/* Register */}
                                <Link
                                    to="/register"
                                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition"
                                >
                                    Get Started
                                </Link>

                            </div>
                        )}

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;