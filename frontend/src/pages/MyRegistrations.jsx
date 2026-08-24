import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

const MyRegistrations = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [cancelling, setCancelling] = useState(null);

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            const response = await api.get("/registrations/my");

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

    const handleCancel = async (registrationId) => {
        const confirmed = window.confirm(
            "Are you sure you want to cancel this registration?"
        );

        if (!confirmed) {
            return;
        }

        setCancelling(registrationId);
        setError("");

        try {
            await api.delete(
                `/registrations/${registrationId}`
            );

            await fetchRegistrations();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Unable to cancel registration"
            );
        } finally {
            setCancelling(null);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950">

            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-12">

                {/* Header */}
                <div className="mb-10">

                    <p className="text-indigo-400 font-medium mb-2">
                        Your Events
                    </p>

                    <h1 className="text-4xl font-bold text-white">
                        My Registrations
                    </h1>

                    <p className="text-slate-400 mt-2">
                        View and manage the events you have registered for.
                    </p>

                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                        {error}
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="flex justify-center py-20">

                        <div className="w-10 h-10 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin" />

                    </div>
                )}

                {/* Empty */}
                {!loading && registrations.length === 0 && (
                    <div className="text-center py-20">

                        <div className="text-6xl mb-5">
                            🎟️
                        </div>

                        <h2 className="text-2xl font-bold text-white">
                            No registrations yet
                        </h2>

                        <p className="text-slate-400 mt-2">
                            You haven't registered for any events.
                        </p>

                        <Link
                            to="/events"
                            className="inline-block mt-6 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
                        >
                            Explore Events
                        </Link>

                    </div>
                )}

                {/* Registration Cards */}
                {!loading && registrations.length > 0 && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {registrations.map((registration) => (
                            <div
                                key={registration.registration_id}
                                className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
                            >

                                {/* Status */}
                                <div className="flex items-center justify-between">

                                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">
                                        {registration.status}
                                    </span>

                                    <span className="text-xs text-slate-500">
                                        #{registration.registration_id}
                                    </span>

                                </div>

                                {/* Title */}
                                <h2 className="text-xl font-bold text-white mt-5">
                                    {registration.title}
                                </h2>

                                {registration.category && (
                                    <p className="text-indigo-400 text-sm mt-1">
                                        {registration.category}
                                    </p>
                                )}

                                {/* Details */}
                                <div className="mt-5 space-y-3">

                                    <div className="flex gap-3 text-sm text-slate-400">
                                        <span>📅</span>
                                        <span>
                                            {registration.event_date}
                                        </span>
                                    </div>

                                    <div className="flex gap-3 text-sm text-slate-400">
                                        <span>🕐</span>
                                        <span>
                                            {registration.event_time}
                                        </span>
                                    </div>

                                    <div className="flex gap-3 text-sm text-slate-400">
                                        <span>📍</span>
                                        <span>
                                            {registration.venue}
                                        </span>
                                    </div>

                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 mt-6">

                                    <Link
                                        to={`/events/${registration.event_id}`}
                                        className="flex-1 text-center py-2.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-white text-sm font-medium transition"
                                    >
                                        View Event
                                    </Link>

                                    {registration.status === "REGISTERED" && (
                                        <button
                                            onClick={() =>
                                                handleCancel(
                                                    registration.registration_id
                                                )
                                            }
                                            disabled={
                                                cancelling ===
                                                registration.registration_id
                                            }
                                            className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-red-900 text-white text-sm font-medium transition"
                                        >
                                            {cancelling ===
                                            registration.registration_id
                                                ? "Cancelling..."
                                                : "Cancel"}
                                        </button>
                                    )}

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </main>

        </div>
    );
};

export default MyRegistrations;