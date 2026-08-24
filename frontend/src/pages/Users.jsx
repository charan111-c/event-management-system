import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get("/admin/users");

            setUsers(response.data.users || []);
        } catch (error) {
            console.error("Get users error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to load users"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950">

            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-10">

                {/* Header */}
                <div className="mb-8">

                    <Link
                        to="/admin"
                        className="text-slate-400 hover:text-white transition"
                    >
                        ← Back to Dashboard
                    </Link>

                    <p className="text-indigo-400 font-medium mt-6">
                        Administration
                    </p>

                    <h1 className="text-4xl font-bold text-white mt-1">
                        Users
                    </h1>

                    <p className="text-slate-400 mt-2">
                        View all registered users on the platform.
                    </p>

                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                        {error}
                    </div>
                )}

                {/* Loading */}
                {loading ? (
                    <div className="flex justify-center py-20">

                        <div className="w-10 h-10 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin" />

                    </div>
                ) : users.length === 0 ? (

                    <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-2xl">

                        <div className="text-6xl mb-5">
                            👥
                        </div>

                        <h2 className="text-2xl font-bold text-white">
                            No users found
                        </h2>

                        <p className="text-slate-400 mt-2">
                            There are no registered users yet.
                        </p>

                    </div>

                ) : (

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

                        {/* Desktop Table */}
                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-slate-800/50">

                                    <tr>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                                            ID
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                                            User
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                                            Email
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                                            Role
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                                            Joined
                                        </th>

                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-slate-800">

                                    {users.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="hover:bg-slate-800/30 transition"
                                        >

                                            <td className="px-6 py-5 text-slate-500">
                                                #{user.id}
                                            </td>

                                            <td className="px-6 py-5">

                                                <div className="flex items-center gap-3">

                                                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-semibold">
                                                        {user.full_name
                                                            ?.charAt(0)
                                                            ?.toUpperCase()}
                                                    </div>

                                                    <p className="text-white font-medium">
                                                        {user.full_name}
                                                    </p>

                                                </div>

                                            </td>

                                            <td className="px-6 py-5 text-slate-400">
                                                {user.email}
                                            </td>

                                            <td className="px-6 py-5">

                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                        user.role === "ADMIN"
                                                            ? "bg-purple-500/10 text-purple-400"
                                                            : "bg-blue-500/10 text-blue-400"
                                                    }`}
                                                >
                                                    {user.role}
                                                </span>

                                            </td>

                                            <td className="px-6 py-5 text-slate-400 text-sm">
                                                {user.created_at}
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                )}

            </main>

        </div>
    );
};

export default Users;