const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 4000,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    ssl: {
        minVersion: "TLSv1.2"
    }
});

db.connect((error) => {

    if (error) {
        console.log("Database connection failed");
        console.log(error.message);
        return;
    }

    console.log("MySQL Database Connected Successfully");

});

module.exports = db;