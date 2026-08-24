import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

const CreateEvent = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        event_date: "",
        event_time: "",
        venue: "",
        capacity: "",
        image_url: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await api.post(
                "/events/create",
                {
                    ...form,
                    capacity: Number(form.capacity)
                }
            );

            setSuccess(response.data.message);

            setTimeout(() => {
                navigate("/admin/events");
            }, 1200);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Unable to create event"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950">

            <Navbar />

            <main className="max-w-4xl mx-auto px-6 py-10">

                <Link
                    to="/admin"
                    className="text-slate-400 hover:text-white transition"
                >
                    ← Back to Dashboard
                </Link>

                <div className="mt-8">

                    <p className="text-indigo-400 font-medium">
                        Administration
                    </p>

                    <h1 className="text-4xl font-bold text-white mt-1">
                        Create Event
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Add a new event to the Eventify platform.
                    </p>

                </div>

                <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">

                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
                            {success}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Event Title *
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Enter event title"
                                required
                                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-600 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Describe your event..."
                                rows="5"
                                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-600 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Category
                            </label>

                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            >
                                <option value="">
                                    Select category
                                </option>
                                <option value="Technology">
                                    Technology
                                </option>
                                <option value="Cultural">
                                    Cultural
                                </option>
                                <option value="Sports">
                                    Sports
                                </option>
                                <option value="Workshop">
                                    Workshop
                                </option>
                                <option value="Seminar">
                                    Seminar
                                </option>
                                <option value="Entertainment">
                                    Entertainment
                                </option>
                                <option value="Other">
                                    Other
                                </option>
                            </select>
                        </div>

                        {/* Date + Time */}
                        <div className="grid md:grid-cols-2 gap-6">

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Event Date *
                                </label>

                                <input
                                    type="date"
                                    name="event_date"
                                    value={form.event_date}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Event Time *
                                </label>

                                <input
                                    type="time"
                                    name="event_time"
                                    value={form.event_time}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                />
                            </div>

                        </div>

                        {/* Venue + Capacity */}
                        <div className="grid md:grid-cols-2 gap-6">

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Venue *
                                </label>

                                <input
                                    type="text"
                                    name="venue"
                                    value={form.venue}
                                    onChange={handleChange}
                                    placeholder="Event venue"
                                    required
                                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-600 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Capacity *
                                </label>

                                <input
                                    type="number"
                                    name="capacity"
                                    value={form.capacity}
                                    onChange={handleChange}
                                    placeholder="Maximum participants"
                                    min="1"
                                    required
                                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-600 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                />
                            </div>

                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Image URL
                            </label>

                            <input
                                type="url"
                                name="image_url"
                                value={form.image_url}
                                onChange={handleChange}
                                placeholder="https://example.com/event-image.jpg"
                                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-600 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold transition"
                            >
                                {loading
                                    ? "Creating Event..."
                                    : "Create Event"}
                            </button>

                            <Link
                                to="/admin"
                                className="flex-1 py-3 rounded-lg border border-slate-700 hover:bg-slate-800 text-white font-semibold text-center transition"
                            >
                                Cancel
                            </Link>

                        </div>

                    </form>

                </div>

            </main>

        </div>
    );
};

export default CreateEvent;