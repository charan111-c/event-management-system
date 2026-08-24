import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
    return (
        <div className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition duration-300">

            {/* Event Image */}
            <div className="h-48 bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
                {event.image_url ? (
                    <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="text-white text-5xl">
                        🎫
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">

                <div className="flex items-center justify-between mb-3">

                    <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium">
                        {event.category || "General"}
                    </span>

                    <span className="text-xs text-slate-500">
                        Capacity: {event.capacity}
                    </span>

                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition">
                    {event.title}
                </h3>

                <p className="text-slate-400 text-sm mt-2 line-clamp-2">
                    {event.description || "Join us for this exciting event."}
                </p>

                {/* Event Info */}
                <div className="mt-5 space-y-2">

                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <span>📅</span>
                        <span>{event.event_date}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <span>🕐</span>
                        <span>{event.event_time}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <span>📍</span>
                        <span>{event.venue}</span>
                    </div>

                </div>

                {/* Button */}
                <Link
                    to={`/events/${event.id}`}
                    className="block text-center mt-6 w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
                >
                    View Details
                </Link>

            </div>

        </div>
    );
};

export default EventCard;