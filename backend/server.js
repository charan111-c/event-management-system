const express = require("express");
const cors = require("cors");

const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoutes");

const verifyToken = require("./middleware/authMiddleware");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// ===============================
// Middleware
// ===============================

app.use(cors());
app.use(express.json());

// ===============================
// Authentication Routes
// ===============================

app.use("/api/auth", authRoutes);

// ===============================
// Event Routes
// ===============================

app.use("/api/events", eventRoutes);

// ===============================
// Registration Routes
// ===============================

app.use("/api/registrations", registrationRoutes);

// ===============================
// Home Route
// ===============================

app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Event Management System Backend Running"
    });
});

// ===============================
// Database Test
// ===============================

app.get("/api/test-db", (req, res) => {
    db.query("SELECT 1 AS result", (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database connection failed"
            });
        }

        res.json({
            success: true,
            message: "Database connected successfully",
            data: results
        });
    });
});

// ===============================
// Protected JWT Test
// ===============================

app.get("/api/protected", verifyToken, (req, res) => {
    res.json({
        success: true,
        message: "You accessed a protected route",
        user: req.user
    });
});

// ===============================
// Server
// ===============================

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});