import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white">

            <Navbar />

            {/* =========================
                HERO
            ========================= */}

            <section className="relative overflow-hidden">

                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-950" />

                <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">

                    <div className="max-w-4xl">

                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium">
                            ✨ Your events. Your experiences.
                        </span>

                        <h1 className="mt-7 text-5xl md:text-7xl font-bold leading-tight">
                            Discover.
                            <span className="block text-indigo-500">
                                Connect.
                            </span>
                            Experience.
                        </h1>

                        <p className="mt-7 text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
                            Eventify is a complete event management
                            platform where you can discover exciting
                            events, register instantly, and manage all
                            your event registrations in one place.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mt-9">

                            <Link
                                to="/events"
                                className="px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-center transition"
                            >
                                Explore Events →
                            </Link>

                            <Link
                                to="/register"
                                className="px-7 py-3.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-white font-semibold text-center transition"
                            >
                                Create Free Account
                            </Link>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================
                STATS
            ========================= */}

            <section className="border-y border-slate-800 bg-slate-900/40">

                <div className="max-w-7xl mx-auto px-6 py-10">

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

                        <div className="text-center">
                            <p className="text-3xl font-bold text-white">
                                100+
                            </p>
                            <p className="text-slate-500 mt-1">
                                Events
                            </p>
                        </div>

                        <div className="text-center">
                            <p className="text-3xl font-bold text-white">
                                5K+
                            </p>
                            <p className="text-slate-500 mt-1">
                                Participants
                            </p>
                        </div>

                        <div className="text-center">
                            <p className="text-3xl font-bold text-white">
                                50+
                            </p>
                            <p className="text-slate-500 mt-1">
                                Organizers
                            </p>
                        </div>

                        <div className="text-center">
                            <p className="text-3xl font-bold text-white">
                                4.9/5
                            </p>
                            <p className="text-slate-500 mt-1">
                                User Rating
                            </p>
                        </div>

                    </div>

                </div>

            </section>


            {/* =========================
                FEATURES
            ========================= */}

            <section className="max-w-7xl mx-auto px-6 py-24">

                <div className="text-center max-w-2xl mx-auto">

                    <p className="text-indigo-400 font-semibold">
                        POWERFUL FEATURES
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold mt-3">
                        Everything you need for events
                    </h2>

                    <p className="text-slate-400 mt-4">
                        A simple platform designed to make discovering
                        and managing events effortless.
                    </p>

                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-12">

                    <div className="p-7 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition">

                        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-2xl">
                            🔎
                        </div>

                        <h3 className="text-xl font-bold mt-5">
                            Discover Events
                        </h3>

                        <p className="text-slate-400 mt-3 leading-relaxed">
                            Find technology, cultural, sports,
                            workshops, seminars and entertainment
                            events.
                        </p>

                    </div>

                    <div className="p-7 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition">

                        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-2xl">
                            🎟️
                        </div>

                        <h3 className="text-xl font-bold mt-5">
                            Easy Registration
                        </h3>

                        <p className="text-slate-400 mt-3 leading-relaxed">
                            Reserve your place in an event with
                            just a few clicks.
                        </p>

                    </div>

                    <div className="p-7 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition">

                        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-2xl">
                            📊
                        </div>

                        <h3 className="text-xl font-bold mt-5">
                            Manage Everything
                        </h3>

                        <p className="text-slate-400 mt-3 leading-relaxed">
                            Keep track of your registrations and
                            manage your upcoming events.
                        </p>

                    </div>

                </div>

            </section>


            {/* =========================
                HOW IT WORKS
            ========================= */}

            <section className="bg-slate-900/50 border-y border-slate-800">

                <div className="max-w-7xl mx-auto px-6 py-24">

                    <div className="text-center">

                        <p className="text-indigo-400 font-semibold">
                            HOW IT WORKS
                        </p>

                        <h2 className="text-3xl md:text-4xl font-bold mt-3">
                            Get started in three simple steps
                        </h2>

                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mt-14">

                        <div className="text-center">

                            <div className="mx-auto w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-xl font-bold">
                                1
                            </div>

                            <h3 className="text-xl font-bold mt-5">
                                Create an Account
                            </h3>

                            <p className="text-slate-400 mt-3">
                                Register for free and create your
                                Eventify account.
                            </p>

                        </div>

                        <div className="text-center">

                            <div className="mx-auto w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-xl font-bold">
                                2
                            </div>

                            <h3 className="text-xl font-bold mt-5">
                                Explore Events
                            </h3>

                            <p className="text-slate-400 mt-3">
                                Browse upcoming events and choose
                                the ones you love.
                            </p>

                        </div>

                        <div className="text-center">

                            <div className="mx-auto w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-xl font-bold">
                                3
                            </div>

                            <h3 className="text-xl font-bold mt-5">
                                Reserve Your Spot
                            </h3>

                            <p className="text-slate-400 mt-3">
                                Register for the event and get ready
                                for an amazing experience.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================
                WHY EVENTIFY
            ========================= */}

            <section className="max-w-7xl mx-auto px-6 py-24">

                <div className="grid lg:grid-cols-2 gap-14 items-center">

                    <div>

                        <p className="text-indigo-400 font-semibold">
                            WHY EVENTIFY?
                        </p>

                        <h2 className="text-3xl md:text-4xl font-bold mt-3">
                            Events made simple
                        </h2>

                        <p className="text-slate-400 mt-5 leading-relaxed">
                            Eventify brings event discovery,
                            registration and management together
                            in one easy-to-use platform.
                        </p>

                        <div className="mt-8 space-y-5">

                            <div className="flex gap-4">
                                <span className="text-green-400 text-xl">
                                    ✓
                                </span>

                                <div>
                                    <h3 className="font-semibold">
                                        Simple and intuitive
                                    </h3>

                                    <p className="text-slate-500 text-sm mt-1">
                                        Designed for students,
                                        participants and event
                                        organizers.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <span className="text-green-400 text-xl">
                                    ✓
                                </span>

                                <div>
                                    <h3 className="font-semibold">
                                        Secure authentication
                                    </h3>

                                    <p className="text-slate-500 text-sm mt-1">
                                        Your account and event
                                        registrations are protected.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <span className="text-green-400 text-xl">
                                    ✓
                                </span>

                                <div>
                                    <h3 className="font-semibold">
                                        Real-time event availability
                                    </h3>

                                    <p className="text-slate-500 text-sm mt-1">
                                        See available events and
                                        registration information.
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 p-10 min-h-[350px] flex items-center justify-center">

                        <div className="text-center">

                            <div className="text-8xl">
                                🎉
                            </div>

                            <h3 className="text-3xl font-bold mt-6">
                                Your next experience
                                starts here.
                            </h3>

                            <p className="text-indigo-100 mt-3">
                                Discover something amazing today.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================
                CTA
            ========================= */}

            <section className="max-w-7xl mx-auto px-6 pb-24">

                <div className="rounded-3xl bg-indigo-600 p-10 md:p-16 text-center">

                    <h2 className="text-3xl md:text-4xl font-bold">
                        Ready to discover your next event?
                    </h2>

                    <p className="text-indigo-100 mt-4 max-w-xl mx-auto">
                        Join Eventify and start exploring exciting
                        events today.
                    </p>

                    <Link
                        to="/register"
                        className="inline-block mt-8 px-7 py-3.5 rounded-xl bg-white text-indigo-700 font-bold hover:bg-slate-100 transition"
                    >
                        Get Started
                    </Link>

                </div>

            </section>


            {/* =========================
                FOOTER
            ========================= */}

            <footer className="border-t border-slate-800">

                <div className="max-w-7xl mx-auto px-6 py-8">

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                        <div className="flex items-center gap-3">

                            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center font-bold">
                                E
                            </div>

                            <span className="font-bold">
                                Eventify
                            </span>

                        </div>

                        <p className="text-sm text-slate-500">
                            © 2026 Eventify. All rights reserved.
                        </p>

                    </div>

                </div>

            </footer>

        </div>
    );
};

export default Home;