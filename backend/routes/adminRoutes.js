const express = require("express");

const {
    getDashboardStats,
    getAllUsers,
    getAllRegistrations,
    getEventParticipants,
    updateEvent,
    deleteEvent
} = require("../controllers/adminController");

const verifyToken = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.get(
    "/dashboard",
    verifyToken,
    adminMiddleware,
    getDashboardStats
);

router.get(
    "/users",
    verifyToken,
    adminMiddleware,
    getAllUsers
);

router.get(
    "/registrations",
    verifyToken,
    adminMiddleware,
    getAllRegistrations
);

router.get(
    "/events/:eventId/participants",
    verifyToken,
    adminMiddleware,
    getEventParticipants
);

router.put(
    "/events/:eventId",
    verifyToken,
    adminMiddleware,
    updateEvent
);

router.delete(
    "/events/:eventId",
    verifyToken,
    adminMiddleware,
    deleteEvent
);

module.exports = router;