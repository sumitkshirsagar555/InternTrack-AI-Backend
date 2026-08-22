const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
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