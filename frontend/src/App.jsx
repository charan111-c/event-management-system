import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import MyRegistrations from "./pages/MyRegistrations";

import AdminDashboard from "./pages/AdminDashboard";
import CreateEvent from "./pages/CreateEvent";
import ManageEvents from "./pages/ManageEvents";
import Participants from "./pages/Participants";
import Users from "./pages/Users";

function App() {
    return (
        <BrowserRouter>

            <AuthProvider>

                <Routes>

                    {/* =================================
                        PUBLIC PAGES
                    ================================= */}

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />


                    {/* =================================
                        EVENTS
                        Both STUDENT and ADMIN can access
                    ================================= */}

                    <Route element={<ProtectedRoute />}>

                        <Route
                            path="/events"
                            element={<Events />}
                        />

                        <Route
                            path="/events/:id"
                            element={<EventDetails />}
                        />

                    </Route>


                    {/* =================================
                        STUDENT ONLY
                    ================================= */}

                    <Route element={<ProtectedRoute role="STUDENT" />}>

                        <Route
                            path="/my-registrations"
                            element={<MyRegistrations />}
                        />

                    </Route>


                    {/* =================================
                        ADMIN ONLY
                    ================================= */}

                    <Route element={<ProtectedRoute role="ADMIN" />}>

                        <Route
                            path="/admin"
                            element={<AdminDashboard />}
                        />

                        <Route
                            path="/admin/create-event"
                            element={<CreateEvent />}
                        />

                        <Route
                            path="/admin/events"
                            element={<ManageEvents />}
                        />

                        <Route
                            path="/admin/registrations"
                            element={<Participants />}
                        />

                        <Route
    path="/admin/users"
    element={<Users />}
/>

                    </Route>

                </Routes>

            </AuthProvider>

        </BrowserRouter>
    );
}

export default App;