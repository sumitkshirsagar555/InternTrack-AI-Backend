const mysql = require("mysql2");

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 4000,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    ssl: {
        minVersion: "TLSv1.2"
    },

    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});

db.getConnection((error, connection) => {

    if (error) {
        console.log("Database connection failed");
        console.log(error.message);
        return;
    }

    console.log("MySQL Database Connected Successfully");

    connection.release();
});

module.exports = db;