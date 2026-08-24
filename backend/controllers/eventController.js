const db = require("../config/db");

// ========================================
// CREATE EVENT - ADMIN
// ========================================

const createEvent = async (req, res) => {
    try {
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

        if (Number(capacity) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Capacity must be greater than 0"
            });
        }

        const [result] = await db.promise().query(
            `INSERT INTO events
            (
                title,
                description,
                category,
                event_date,
                event_time,
                venue,
                capacity,
                image_url,
                created_by
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                title,
                description || null,
                category || null,
                event_date,
                event_time,
                venue,
                capacity,
                image_url || null,
                req.user.id
            ]
        );

        res.status(201).json({
            success: true,
            message: "Event created successfully",
            eventId: result.insertId
        });

    } catch (error) {
        console.error("Create event error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// GET ALL EVENTS
// ========================================

const getAllEvents = async (req, res) => {
    try {
        const [events] = await db.promise().query(
            `SELECT
                e.id,
                e.title,
                e.description,
                e.category,
                e.event_date,
                e.event_time,
                e.venue,
                e.capacity,
                e.image_url,
                e.created_at,
                u.full_name AS created_by
             FROM events e
             JOIN users u ON e.created_by = u.id
             ORDER BY e.event_date ASC, e.event_time ASC`
        );

        res.json({
            success: true,
            count: events.length,
            events: events
        });

    } catch (error) {
        console.error("Get events error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// GET SINGLE EVENT
// ========================================

const getEventById = async (req, res) => {
    try {
        const { id } = req.params;

        const [events] = await db.promise().query(
            `SELECT
                e.id,
                e.title,
                e.description,
                e.category,
                e.event_date,
                e.event_time,
                e.venue,
                e.capacity,
                e.image_url,
                e.created_at,
                u.full_name AS created_by
             FROM events e
             JOIN users u ON e.created_by = u.id
             WHERE e.id = ?`,
            [id]
        );

        if (events.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        res.json({
            success: true,
            event: events[0]
        });

    } catch (error) {
        console.error("Get event error:", error);

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
    createEvent,
    getAllEvents,
    getEventById
};