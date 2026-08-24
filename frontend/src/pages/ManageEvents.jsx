import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

const ManageEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deleting, setDeleting] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await api.get("/events");

            setEvents(response.data.events || []);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Unable to load events"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (eventId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this event?"
        );

        if (!confirmed) {
            return;
        }

        setDeleting(eventId);
        setError("");

        try {
            await api.delete(`/admin/events/${eventId}`);

            setEvents((prevEvents) =>
                prevEvents.filter(
                    (event) => event.id !== eventId
                )
            );

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Unable to delete event"
            );
        } finally {
            setDeleting(null);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950">

            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-10">

                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">

                    <div>
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
                            Manage Events
                        </h1>

                        <p className="text-slate-400 mt-2">
                            View and manage all events on the platform.
                        </p>
                    </div>

                    <Link
                        to="/admin/create-event"
                        className="px-5 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
                    >
                        + Create Event
                    </Link>

                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin" />
                    </div>
                ) : events.length === 0 ? (
                    <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-2xl">

                        <div className="text-6xl mb-5">
                            📅
                        </div>

                        <h2 className="text-2xl font-bold text-white">
                            No events found
                        </h2>

                        <p className="text-slate-400 mt-2">
                            Create your first event to get started.
                        </p>

                        <Link
                            to="/admin/create-event"
                            className="inline-block mt-6 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                        >
                            Create Event
                        </Link>

                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"
                            >

                                <div className="h-44 bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">

                                    {event.image_url ? (
                                        <img
                                            src={event.image_url}
                                            alt={event.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-6xl">
                                            🎫
                                        </span>
                                    )}

                                </div>

                                <div className="p-6">

                                    <div className="flex items-center justify-between gap-3">

                                        <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium">
                                            {event.category || "General"}
                                        </span>

                                        <span className="text-xs text-slate-500">
                                            ID: {event.id}
                                        </span>

                                    </div>

                                    <h2 className="text-xl font-bold text-white mt-4">
                                        {event.title}
                                    </h2>

                                    <p className="text-slate-400 text-sm mt-2 line-clamp-2">
                                        {event.description ||
                                            "No description available."}
                                    </p>

                                    <div className="mt-5 space-y-2 text-sm text-slate-400">

                                        <p>
                                            📅 {event.event_date}
                                        </p>

                                        <p>
                                            🕐 {event.event_time}
                                        </p>

                                        <p>
                                            📍 {event.venue}
                                        </p>

                                        <p>
                                            👥 Capacity: {event.capacity}
                                        </p>

                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-6">

                                        <Link
                                            to={`/events/${event.id}`}
                                            className="text-center py-2.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-white text-sm font-medium transition"
                                        >
                                            View
                                        </Link>

                                        <button
                                            onClick={() =>
                                                handleDelete(event.id)
                                            }
                                            disabled={
                                                deleting === event.id
                                            }
                                            className="py-2.5 rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-red-900 text-white text-sm font-medium transition"
                                        >
                                            {deleting === event.id
                                                ? "Deleting..."
                                                : "Delete"}
                                        </button>

                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </main>

        </div>
    );
};

export default ManageEvents;