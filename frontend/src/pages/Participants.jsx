
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

const Participants = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            const response = await api.get("/admin/registrations");

            setRegistrations(
                response.data.registrations || []
            );
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Unable to load registrations"
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
                        Event Registrations
                    </h1>

                    <p className="text-slate-400 mt-2">
                        View all students registered for events.
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
                ) : registrations.length === 0 ? (
                    <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-2xl">

                        <div className="text-6xl mb-5">
                            👥
                        </div>

                        <h2 className="text-2xl font-bold text-white">
                            No registrations
                        </h2>

                        <p className="text-slate-400 mt-2">
                            No students have registered for an event yet.
                        </p>

                    </div>
                ) : (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-slate-800/50">

                                    <tr>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                                            Student
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                                            Event
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                                            Date
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                                            Registered
                                        </th>

                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-slate-800">

                                    {registrations.map((registration) => (
                                        <tr
                                            key={registration.registration_id}
                                            className="hover:bg-slate-800/30 transition"
                                        >

                                            <td className="px-6 py-5">

                                                <p className="text-white font-medium">
                                                    {registration.full_name}
                                                </p>

                                                <p className="text-slate-500 text-sm">
                                                    {registration.email}
                                                </p>

                                            </td>

                                            <td className="px-6 py-5">

                                                <p className="text-white font-medium">
                                                    {registration.event_title}
                                                </p>

                                                <p className="text-slate-500 text-sm">
                                                    📍 {registration.venue}
                                                </p>

                                            </td>

                                            <td className="px-6 py-5 text-slate-400 text-sm">
                                                <p>
                                                    {registration.event_date}
                                                </p>

                                                <p>
                                                    {registration.event_time}
                                                </p>
                                            </td>

                                            <td className="px-6 py-5">

                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                        registration.status ===
                                                        "REGISTERED"
                                                            ? "bg-green-500/10 text-green-400"
                                                            : "bg-red-500/10 text-red-400"
                                                    }`}
                                                >
                                                    {registration.status}
                                                </span>

                                            </td>

                                            <td className="px-6 py-5 text-slate-400 text-sm">
                                                {registration.registered_at}
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden divide-y divide-slate-800">

                            {registrations.map((registration) => (
                                <div
                                    key={registration.registration_id}
                                    className="p-5"
                                >

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-white font-semibold">
                                                {registration.full_name}
                                            </p>

                                            <p className="text-slate-500 text-sm">
                                                {registration.email}
                                            </p>
                                        </div>

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                registration.status ===
                                                "REGISTERED"
                                                    ? "bg-green-500/10 text-green-400"
                                                    : "bg-red-500/10 text-red-400"
                                            }`}
                                        >
                                            {registration.status}
                                        </span>

                                    </div>

                                    <div className="mt-4">

                                        <p className="text-white font-medium">
                                            {registration.event_title}
                                        </p>

                                        <p className="text-slate-500 text-sm mt-1">
                                            📅 {registration.event_date}
                                        </p>

                                        <p className="text-slate-500 text-sm">
                                            📍 {registration.venue}
                                        </p>

                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>
                )}

            </main>

        </div>
    );
};

export default Participants;