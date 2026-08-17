console.log("TEST: db_manager.js is running");

const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "campus_lost_found_db"
});

connection.connect((err) => {
    if (err) {
        console.log("Database connection failed!");
        console.log(err.message);
        return;
    }

    console.log("MySQL Database Connected Successfully!");
});

module.exports = connection;