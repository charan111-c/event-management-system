import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ role }) => {
    const { user } = useAuth();

    // User is not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Role-specific protection
    if (role && user.role !== role) {

        if (user.role === "ADMIN") {
            return <Navigate to="/admin" replace />;
        }

        return <Navigate to="/events" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;