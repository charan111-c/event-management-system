const db = require("../config/db");

// ========================================
// REGISTER FOR EVENT
// ========================================

const registerForEvent = async (req, res) => {
    try {
        const userId = req.user.id;
        const { event_id } = req.body;

        // Validate event ID
        if (!event_id) {
            return res.status(400).json({
                success: false,
                message: "Event ID is required"
            });
        }

        // Check whether event exists
        const [events] = await db.promise().query(
            "SELECT id, title, capacity FROM events WHERE id = ?",
            [event_id]
        );

        if (events.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        const event = events[0];

        // Check duplicate registration
        const [existing] = await db.promise().query(
            `SELECT id, status
             FROM registrations
             WHERE user_id = ? AND event_id = ?`,
            [userId, event_id]
        );

        if (existing.length > 0) {
            if (existing[0].status === "REGISTERED") {
                return res.status(409).json({
                    success: false,
                    message: "You are already registered for this event"
                });
            }

            // If previously cancelled, reactivate registration
            await db.promise().query(
                `UPDATE registrations
                 SET status = 'REGISTERED',
                     registered_at = CURRENT_TIMESTAMP
                 WHERE id = ?`,
                [existing[0].id]
            );

            return res.status(200).json({
                success: true,
                message: "Registration successful",
                registrationId: existing[0].id
            });
        }

        // Count active registrations
        const [countResult] = await db.promise().query(
            `SELECT COUNT(*) AS registered_count
             FROM registrations
             WHERE event_id = ?
             AND status = 'REGISTERED'`,
            [event_id]
        );

        const registeredCount = countResult[0].registered_count;

        // Check capacity
        if (registeredCount >= event.capacity) {
            return res.status(400).json({
                success: false,
                message: "Event is full"
            });
        }

        // Create registration
        const [result] = await db.promise().query(
            `INSERT INTO registrations
             (user_id, event_id, status)
             VALUES (?, ?, 'REGISTERED')`,
            [userId, event_id]
        );

        res.status(201).json({
            success: true,
            message: "Registration successful",
            registrationId: result.insertId,
            event: event.title
        });

    } catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// GET MY REGISTRATIONS
// ========================================

const getMyRegistrations = async (req, res) => {
    try {
        const userId = req.user.id;

        const [registrations] = await db.promise().query(
            `SELECT
                r.id AS registration_id,
                r.status,
                r.registered_at,
                e.id AS event_id,
                e.title,
                e.description,
                e.category,
                e.event_date,
                e.event_time,
                e.venue,
                e.capacity
             FROM registrations r
             JOIN events e ON r.event_id = e.id
             WHERE r.user_id = ?
             ORDER BY e.event_date ASC, e.event_time ASC`,
            [userId]
        );

        res.json({
            success: true,
            count: registrations.length,
            registrations: registrations
        });

    } catch (error) {
        console.error("Get registrations error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// CANCEL REGISTRATION
// ========================================

const cancelRegistration = async (req, res) => {
    try {
        const userId = req.user.id;
        const { registrationId } = req.params;

        const [registrations] = await db.promise().query(
            `SELECT id, status
             FROM registrations
             WHERE id = ? AND user_id = ?`,
            [registrationId, userId]
        );

        if (registrations.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Registration not found"
            });
        }

        if (registrations[0].status === "CANCELLED") {
            return res.status(400).json({
                success: false,
                message: "Registration is already cancelled"
            });
        }

        await db.promise().query(
            `UPDATE registrations
             SET status = 'CANCELLED'
             WHERE id = ?`,
            [registrationId]
        );

        res.json({
            success: true,
            message: "Registration cancelled successfully"
        });

    } catch (error) {
        console.error("Cancel registration error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// EXPORT
// ========================================

module.exports = {
    registerForEvent,
    getMyRegistrations,
    cancelRegistration
};