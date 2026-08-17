const express = require("express");
const path = require("path");
const db = require("./db_manager");

const app = express();
const PORT = 3000;

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Serve index.html and other frontend files
app.use(express.static(path.join(__dirname)));


// ==========================================
// TEST API
// ==========================================

app.get("/api/test", (req, res) => {
    res.json({
        message: "Backend server is working!"
    });
});


// ==========================================
// GET ALL ITEMS
// GET /api/items
// ==========================================

app.get("/api/items", (req, res) => {

    const search = req.query.search || "";
    const type = req.query.type || "";

    let sql = "";
    let values = [];

    // ------------------------------------------
    // LOST ITEMS
    // ------------------------------------------

    const lostQuery = `
        SELECT
            id,
            'Lost' AS type,
            item_name AS title,
            description,
            location,
            lost_date AS date,
            image_url AS photo_url
        FROM lost_items
    `;

    // ------------------------------------------
    // FOUND ITEMS
    // ------------------------------------------

    const foundQuery = `
        SELECT
            id,
            'Found' AS type,
            item_name AS title,
            description,
            location,
            found_date AS date,
            image_url AS photo_url
        FROM found_items
    `;


    // ==========================================
    // FILTER BY TYPE
    // ==========================================

    if (type === "Lost") {

        sql = lostQuery;

        if (search) {
            sql += `
                WHERE
                    item_name LIKE ?
                    OR description LIKE ?
                    OR location LIKE ?
            `;

            const searchValue = `%${search}%`;

            values = [
                searchValue,
                searchValue,
                searchValue
            ];
        }

    }

    else if (type === "Found") {

        sql = foundQuery;

        if (search) {
            sql += `
                WHERE
                    item_name LIKE ?
                    OR description LIKE ?
                    OR location LIKE ?
            `;

            const searchValue = `%${search}%`;

            values = [
                searchValue,
                searchValue,
                searchValue
            ];
        }

    }

    // ==========================================
    // ALL ITEMS
    // ==========================================

    else {

        if (search) {

            const searchValue = `%${search}%`;

            sql = `
                SELECT
                    id,
                    'Lost' AS type,
                    item_name AS title,
                    description,
                    location,
                    lost_date AS date,
                    image_url AS photo_url
                FROM lost_items
                WHERE
                    item_name LIKE ?
                    OR description LIKE ?
                    OR location LIKE ?

                UNION ALL

                SELECT
                    id,
                    'Found' AS type,
                    item_name AS title,
                    description,
                    location,
                    found_date AS date,
                    image_url AS photo_url
                FROM found_items
                WHERE
                    item_name LIKE ?
                    OR description LIKE ?
                    OR location LIKE ?
            `;

            values = [
                searchValue,
                searchValue,
                searchValue,
                searchValue,
                searchValue,
                searchValue
            ];

        }

        else {

            sql = `
                SELECT
                    id,
                    'Lost' AS type,
                    item_name AS title,
                    description,
                    location,
                    lost_date AS date,
                    image_url AS photo_url
                FROM lost_items

                UNION ALL

                SELECT
                    id,
                    'Found' AS type,
                    item_name AS title,
                    description,
                    location,
                    found_date AS date,
                    image_url AS photo_url
                FROM found_items
            `;
        }
    }


    // ==========================================
    // RUN DATABASE QUERY
    // ==========================================

    db.query(sql, values, (err, results) => {

        if (err) {

            console.log("GET ITEMS ERROR:");
            console.log(err);

            return res.status(500).json({
                error: "Failed to fetch items"
            });
        }

        res.json(results);
    });
});


// ==========================================
// SUBMIT ITEM
// POST /api/items
// ==========================================

app.post("/api/items", (req, res) => {

    const {
        type,
        title,
        description,
        location,
        date,
        contact_email,
        photo_url
    } = req.body;


    console.log("New report received:");
    console.log(req.body);


    // ==========================================
    // VALIDATION
    // ==========================================

    if (!type || !title || !location || !date || !contact_email) {

        return res.status(400).json({
            error: "Please fill in all required fields."
        });
    }


    // ==========================================
    // FIND OR CREATE USER
    // users table only has:
    // id
    // email
    // ==========================================

    const userSql = `
        INSERT INTO users (email)
        VALUES (?)
        ON DUPLICATE KEY UPDATE
        id = LAST_INSERT_ID(id)
    `;


    db.query(
        userSql,
        [contact_email],
        (userError, userResult) => {

            if (userError) {

                console.log("USER DATABASE ERROR:");
                console.log(userError);

                return res.status(500).json({
                    error: "Could not create/find user."
                });
            }


            const userId = userResult.insertId;


            console.log("User ID:", userId);


            // ==========================================
            // LOST ITEM
            // ==========================================

            if (type === "Lost") {

                const sql = `
                    INSERT INTO lost_items
                    (
                        user_id,
                        item_name,
                        description,
                        location,
                        lost_date,
                        image_url
                    )
                    VALUES (?, ?, ?, ?, ?, ?)
                `;


                db.query(
                    sql,
                    [
                        userId,
                        title,
                        description || "",
                        location,
                        date,
                        photo_url || null
                    ],
                    (err, result) => {

                        if (err) {

                            console.log("LOST ITEM DATABASE ERROR:");
                            console.log(err);

                            return res.status(500).json({
                                error: "Failed to save lost item."
                            });
                        }


                        console.log("Lost item saved. ID:", result.insertId);


                        res.status(201).json({
                            message: "Lost item submitted successfully!",
                            id: result.insertId
                        });
                    }
                );
            }


            // ==========================================
            // FOUND ITEM
            // ==========================================

            else if (type === "Found") {

                const sql = `
                    INSERT INTO found_items
                    (
                        user_id,
                        item_name,
                        description,
                        location,
                        found_date,
                        image_url
                    )
                    VALUES (?, ?, ?, ?, ?, ?)
                `;


                db.query(
                    sql,
                    [
                        userId,
                        title,
                        description || "",
                        location,
                        date,
                        photo_url || null
                    ],
                    (err, result) => {

                        if (err) {

                            console.log("FOUND ITEM DATABASE ERROR:");
                            console.log(err);

                            return res.status(500).json({
                                error: "Failed to save found item."
                            });
                        }


                        console.log("Found item saved. ID:", result.insertId);


                        res.status(201).json({
                            message: "Found item submitted successfully!",
                            id: result.insertId
                        });
                    }
                );
            }


            // ==========================================
            // INVALID TYPE
            // ==========================================

            else {

                return res.status(400).json({
                    error: "Type must be Lost or Found."
                });
            }
        }
    );
});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);

});