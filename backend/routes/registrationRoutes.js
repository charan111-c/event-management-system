const express = require("express");

const {
    registerForEvent,
    getMyRegistrations,
    cancelRegistration
} = require("../controllers/registrationController");

const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Register for event
router.post(
    "/",
    verifyToken,
    registerForEvent
);

// Get my registrations
router.get(
    "/my",
    verifyToken,
    getMyRegistrations
);

// Cancel registration
router.delete(
    "/:registrationId",
    verifyToken,
    cancelRegistration
);

module.exports = router;