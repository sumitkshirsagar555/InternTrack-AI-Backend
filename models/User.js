const db = require("../config/db");

const User = {

    create: (fullName, email, password, callback) => {

        const sql = `
            INSERT INTO users (full_name, email, password)
            VALUES (?, ?, ?)
        `;

        db.query(
            sql,
            [fullName, email, password],
            callback
        );
    },


    findByEmail: (email, callback) => {

        const sql = `
            SELECT * FROM users
            WHERE email = ?
        `;

        db.query(
            sql,
            [email],
            (error, results) => {

                if (error) {
                    callback(error, null);
                    return;
                }

                callback(null, results[0]);
            }
        );
    }

};

module.exports = User;