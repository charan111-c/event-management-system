import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchEvent();
    }, [id]);

    const fetchEvent = async () => {
        try {
            const response = await api.get(`/events/${id}`);
            setEvent(response.data.event);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Unable to load event"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        if (!user) {
            navigate("/login");
            return;
        }

        if (user.role === "ADMIN") {
            setError("Admin accounts cannot register for events.");
            return;
        }

        setRegistering(true);
        setError("");
        setMessage("");

        try {
            const response = await api.post("/registrations", {
                event_id: id
            });

            setMessage(response.data.message);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Registration failed"
            );
        } finally {
            setRegistering(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950">
                <Navbar />

                <div className="flex justify-center items-center py-32">
                    <div className="w-10 h-10 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    if (error && !event) {
        return (
            <div className="min-h-screen bg-slate-950">
                <Navbar />

                <div className="max-w-2xl mx-auto px-6 py-20 text-center">
                    <div className="text-6xl mb-5">😕</div>

                    <h2 className="text-2xl font-bold text-white">
                        Event not found
                    </h2>

                    <p className="text-red-400 mt-3">
                        {error}
                    </p>

                    <Link
                        to="/events"
                        className="inline-block mt-6 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                    >
                        Back to Events
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950">

            <Navbar />

            <main className="max-w-6xl mx-auto px-6 py-10">

                {/* Back */}
                <Link
                    to="/events"
                    className="text-slate-400 hover:text-white transition"
                >
                    ← Back to Events
                </Link>

                {/* Event */}
                <div className="mt-8 grid lg:grid-cols-3 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-2">

                        {/* Image */}
                        <div className="h-72 md:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">

                            {event.image_url ? (
                                <img
                                    src={event.image_url}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-8xl">
                                    🎫
                                </span>
                            )}

                        </div>

                        {/* Category */}
                        <div className="mt-8">
                            <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium">
                                {event.category || "General"}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">
                            {event.title}
                        </h1>

                        <p className="text-slate-400 text-lg leading-relaxed mt-5">
                            {event.description ||
                                "Join us for this exciting event."}
                        </p>

                        <div className="mt-8 grid sm:grid-cols-2 gap-4">

                            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                                <p className="text-sm text-slate-500">
                                    Date
                                </p>

                                <p className="text-white font-semibold mt-1">
                                    📅 {event.event_date}
                                </p>
                            </div>

                            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                                <p className="text-sm text-slate-500">
                                    Time
                                </p>

                                <p className="text-white font-semibold mt-1">
                                    🕐 {event.event_time}
                                </p>
                            </div>

                            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                                <p className="text-sm text-slate-500">
                                    Venue
                                </p>

                                <p className="text-white font-semibold mt-1">
                                    📍 {event.venue}
                                </p>
                            </div>

                            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                                <p className="text-sm text-slate-500">
                                    Capacity
                                </p>

                                <p className="text-white font-semibold mt-1">
                                    👥 {event.capacity} people
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Registration Card */}
                    <div>

                        <div className="sticky top-6 p-6 rounded-2xl bg-slate-900 border border-slate-800">

                            <h2 className="text-xl font-bold text-white">
                                Reserve your spot
                            </h2>

                            <p className="text-slate-400 text-sm mt-2">
                                Secure your place at this event.
                            </p>

                            {message && (
                                <div className="mt-5 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                                    {message}
                                </div>
                            )}

                            {error && (
                                <div className="mt-5 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={handleRegister}
                                disabled={registering || !!message}
                                className="w-full mt-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-400 text-white font-semibold transition"
                            >
                                {registering
                                    ? "Registering..."
                                    : message
                                        ? "Registered"
                                        : "Register Now"}
                            </button>

                            {!user && (
                                <p className="text-xs text-slate-500 text-center mt-4">
                                    You need to login before registering.
                                </p>
                            )}

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
};

export default EventDetails;