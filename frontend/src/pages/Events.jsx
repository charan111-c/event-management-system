import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import api from "../services/api";

const Events = () => {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {

            const response = await api.get("/events");

            setEvents(response.data.events || []);

        } catch (error) {

            console.error("Fetch events error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to load events"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-slate-950">

            <Navbar />

            {/* Header */}
            <section className="max-w-7xl mx-auto px-6 pt-12 pb-8">

                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

                    <div>
                        <p className="text-indigo-400 font-medium mb-2">
                            Explore
                        </p>

                        <h1 className="text-4xl font-bold text-white">
                            Upcoming Events
                        </h1>

                        <p className="text-slate-400 mt-2">
                            Discover events and reserve your place.
                        </p>
                    </div>

                    <div className="text-sm text-slate-500">
                        {events.length} event{events.length !== 1 ? "s" : ""}
                    </div>

                </div>

            </section>

            {/* Events */}
            <main className="max-w-7xl mx-auto px-6 pb-16">

                {loading && (
                    <div className="flex justify-center py-20">

                        <div className="w-10 h-10 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin">
                        </div>

                    </div>
                )}

                {error && !loading && (
                    <div className="max-w-xl mx-auto mt-10 p-5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-center">
                        {error}
                    </div>
                )}

                {!loading && !error && events.length === 0 && (
                    <div className="text-center py-20">

                        <div className="text-6xl mb-5">
                            📅
                        </div>

                        <h2 className="text-2xl font-bold text-white">
                            No events available
                        </h2>

                        <p className="text-slate-400 mt-2">
                            Check back later for upcoming events.
                        </p>

                    </div>
                )}

                {!loading && !error && events.length > 0 && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {events.map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                            />
                        ))}

                    </div>
                )}

            </main>

        </div>
    );
};

export default Events;