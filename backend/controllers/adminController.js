const db = require("../config/db");

// ========================================
// ADMIN DASHBOARD
// ========================================

const getDashboardStats = async (req, res) => {
    try {
        const [userResult] = await db.promise().query(
            "SELECT COUNT(*) AS total_users FROM users"
        );

        const [eventResult] = await db.promise().query(
            "SELECT COUNT(*) AS total_events FROM events"
        );

        const [registrationResult] = await db.promise().query(
            `SELECT COUNT(*) AS total_registrations
             FROM registrations
             WHERE status = 'REGISTERED'`
        );

        const [cancelledResult] = await db.promise().query(
            `SELECT COUNT(*) AS total_cancelled
             FROM registrations
             WHERE status = 'CANCELLED'`
        );

        const [upcomingResult] = await db.promise().query(
            `SELECT COUNT(*) AS upcoming_events
             FROM events
             WHERE event_date >= CURDATE()`
        );

        res.json({
            success: true,
            dashboard: {
                total_users: userResult[0].total_users,
                total_events: eventResult[0].total_events,
                total_registrations: registrationResult[0].total_registrations,
                total_cancelled: cancelledResult[0].total_cancelled,
                upcoming_events: upcomingResult[0].upcoming_events
            }
        });

    } catch (error) {
        console.error("Dashboard error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// GET ALL USERS
// ========================================

const getAllUsers = async (req, res) => {
    try {
        const [users] = await db.promise().query(
            `SELECT
                id,
                full_name,
                email,
                role,
                created_at
             FROM users
             ORDER BY created_at DESC`
        );

        res.json({
            success: true,
            count: users.length,
            users: users
        });

    } catch (error) {
        console.error("Get users error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// GET ALL REGISTRATIONS
// ========================================

const getAllRegistrations = async (req, res) => {
    try {
        const [registrations] = await db.promise().query(
            `SELECT
                r.id AS registration_id,
                r.status,
                r.registered_at,
                u.id AS user_id,
                u.full_name,
                u.email,
                e.id AS event_id,
                e.title AS event_title,
                e.event_date,
                e.event_time,
                e.venue
             FROM registrations r
             JOIN users u ON r.user_id = u.id
             JOIN events e ON r.event_id = e.id
             ORDER BY r.registered_at DESC`
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
// GET PARTICIPANTS FOR ONE EVENT
// ========================================

const getEventParticipants = async (req, res) => {
    try {
        const { eventId } = req.params;

        const [participants] = await db.promise().query(
            `SELECT
                r.id AS registration_id,
                r.status,
                r.registered_at,
                u.id AS user_id,
                u.full_name,
                u.email
             FROM registrations r
             JOIN users u ON r.user_id = u.id
             WHERE r.event_id = ?
             ORDER BY r.registered_at ASC`,
            [eventId]
        );

        res.json({
            success: true,
            count: participants.length,
            participants: participants
        });

    } catch (error) {
        console.error("Get participants error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// UPDATE EVENT - ADMIN
// ========================================

const updateEvent = async (req, res) => {
    try {
        const { eventId } = req.params;

        const {
            title,
            description,
            category,
            event_date,
            event_time,
            venue,
            capacity,
            image_url
        } = req.body;

        // Check whether event exists
        const [events] = await db.promise().query(
            "SELECT id FROM events WHERE id = ?",
            [eventId]
        );

        if (events.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        // Validate required fields
        if (
            !title ||
            !event_date ||
            !event_time ||
            !venue ||
            !capacity
        ) {
            return res.status(400).json({
                success: false,
                message: "Title, date, time, venue and capacity are required"
            });
        }

        // Validate capacity
        if (Number(capacity) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Capacity must be greater than 0"
            });
        }

        // Update event
        await db.promise().query(
            `UPDATE events
             SET
                title = ?,
                description = ?,
                category = ?,
                event_date = ?,
                event_time = ?,
                venue = ?,
                capacity = ?,
                image_url = ?
             WHERE id = ?`,
            [
                title,
                description || null,
                category || null,
                event_date,
                event_time,
                venue,
                capacity,
                image_url || null,
                eventId
            ]
        );

        res.json({
            success: true,
            message: "Event updated successfully"
        });

    } catch (error) {
        console.error("Update event error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// DELETE EVENT - ADMIN
// ========================================

const deleteEvent = async (req, res) => {
    try {
        const { eventId } = req.params;

        const [events] = await db.promise().query(
            "SELECT id FROM events WHERE id = ?",
            [eventId]
        );

        if (events.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        await db.promise().query(
            "DELETE FROM events WHERE id = ?",
            [eventId]
        );

        res.json({
            success: true,
            message: "Event deleted successfully"
        });

    } catch (error) {
        console.error("Delete event error:", error);

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
    getDashboardStats,
    getAllUsers,
    getAllRegistrations,
    getEventParticipants,
    updateEvent,
    deleteEvent
};