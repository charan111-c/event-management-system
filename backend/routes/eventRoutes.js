const express = require("express");

const {
    createEvent,
    getAllEvents,
    getEventById
} = require("../controllers/eventController");

const verifyToken = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// ========================================
// ADMIN - CREATE EVENT
// ========================================

router.post(
    "/create",
    verifyToken,
    adminMiddleware,
    createEvent
);


// ========================================
// GET ALL EVENTS
// ========================================

router.get(
    "/",
    getAllEvents
);


// ========================================
// GET SINGLE EVENT
// ========================================

router.get(
    "/:id",
    getEventById
);


module.exports = router;