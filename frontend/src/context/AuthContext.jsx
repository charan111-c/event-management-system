import { createContext, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");

        if (savedUser) {
            return JSON.parse(savedUser);
        }

        return null;
    });

    const [loading, setLoading] = useState(false);


    // ========================================
    // LOGIN
    // ========================================

    const login = async (email, password) => {

        setLoading(true);

        try {

            const response = await api.post("/auth/login", {
                email,
                password
            });

            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            setUser(user);

            return {
                success: true,
                user: user
            };

        } catch (error) {

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Login failed"
            };

        } finally {

            setLoading(false);

        }
    };


    // ========================================
    // REGISTER
    // ========================================

    const register = async (
        full_name,
        email,
        password
    ) => {

        setLoading(true);

        try {

            const response = await api.post(
                "/auth/register",
                {
                    full_name,
                    email,
                    password
                }
            );

            return {
                success: true,
                message: response.data.message
            };

        } catch (error) {

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Registration failed"
            };

        } finally {

            setLoading(false);

        }
    };


    // ========================================
    // LOGOUT
    // ========================================

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


// ========================================
// CUSTOM HOOK
// ========================================

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;