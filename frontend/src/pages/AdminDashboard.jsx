import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

const AdminDashboard = () => {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const response = await api.get("/admin/dashboard");

            setDashboard(response.data.dashboard);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Unable to load dashboard"
            );
        } finally {
            setLoading(false);
        }
    };

    const stats = dashboard
        ? [
              {
                  title: "Total Users",
                  value: dashboard.total_users,
                  icon: "👥"
              },
              {
                  title: "Total Events",
                  value: dashboard.total_events,
                  icon: "📅"
              },
              {
                  title: "Registrations",
                  value: dashboard.total_registrations,
                  icon: "🎟️"
              },
              {
                  title: "Upcoming Events",
                  value: dashboard.upcoming_events,
                  icon: "🚀"
              }
          ]
        : [];

    return (
        <div className="min-h-screen bg-slate-950">

            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-10">

                {/* Header */}
                <div className="mb-10">

                    <p className="text-indigo-400 font-medium">
                        Administration
                    </p>

                    <h1 className="text-4xl font-bold text-white mt-1">
                        Admin Dashboard
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Manage events, users and registrations.
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

                ) : (

                    <>

                        {/* =========================
                            STATISTICS
                        ========================= */}

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

                            {stats.map((stat) => (

                                <div
                                    key={stat.title}
                                    className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
                                >

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <p className="text-slate-500 text-sm">
                                                {stat.title}
                                            </p>

                                            <p className="text-3xl font-bold text-white mt-2">
                                                {stat.value}
                                            </p>

                                        </div>

                                        <div className="text-3xl">
                                            {stat.icon}
                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>


                        {/* =========================
                            MANAGEMENT
                        ========================= */}

                        <div className="mt-10">

                            <h2 className="text-2xl font-bold text-white mb-5">
                                Management
                            </h2>


                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                                {/* Users */}

                                <Link
                                    to="/admin/users"
                                    className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-indigo-500/40 transition"
                                >

                                    <div className="text-3xl mb-4">
                                        👥
                                    </div>

                                    <h3 className="text-xl font-semibold text-white">
                                        Users
                                    </h3>

                                    <p className="text-slate-400 text-sm mt-2">
                                        View and manage registered users.
                                    </p>

                                </Link>


                                {/* Create Event */}

                                <Link
                                    to="/admin/create-event"
                                    className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-indigo-500/40 transition"
                                >

                                    <div className="text-3xl mb-4">
                                        ➕
                                    </div>

                                    <h3 className="text-xl font-semibold text-white">
                                        Create Event
                                    </h3>

                                    <p className="text-slate-400 text-sm mt-2">
                                        Create and publish a new event.
                                    </p>

                                </Link>


                                {/* Manage Events */}

                                <Link
                                    to="/admin/events"
                                    className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-indigo-500/40 transition"
                                >

                                    <div className="text-3xl mb-4">
                                        📋
                                    </div>

                                    <h3 className="text-xl font-semibold text-white">
                                        Manage Events
                                    </h3>

                                    <p className="text-slate-400 text-sm mt-2">
                                        Edit or delete existing events.
                                    </p>

                                </Link>


                                {/* Registrations */}

                                <Link
                                    to="/admin/registrations"
                                    className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-indigo-500/40 transition"
                                >

                                    <div className="text-3xl mb-4">
                                        🎟️
                                    </div>

                                    <h3 className="text-xl font-semibold text-white">
                                        Registrations
                                    </h3>

                                    <p className="text-slate-400 text-sm mt-2">
                                        View event participants.
                                    </p>

                                </Link>

                            </div>

                        </div>

                    </>

                )}

            </main>

        </div>
    );
};

export default AdminDashboard;