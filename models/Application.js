const db = require("../config/db");

const Application = {

    create: (
        userId,
        companyName,
        jobRole,
        location,
        applicationDate,
        status,
        deadline,
        notes,
        callback
    ) => {

        const sql = `
            INSERT INTO applications
            (user_id, company_name, job_role, location, application_date, status, deadline, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                userId,
                companyName,
                jobRole,
                location,
                applicationDate,
                status,
                deadline,
                notes
            ],
            callback
        );
    },


    getByUserId: (userId, callback) => {

        const sql = `
            SELECT *
            FROM applications
            WHERE user_id = ?
            ORDER BY created_at DESC
        `;

        db.query(
            sql,
            [userId],
            callback
        );
    },


    update: (
        id,
        userId,
        companyName,
        jobRole,
        location,
        applicationDate,
        status,
        deadline,
        notes,
        callback
    ) => {

        const sql = `
            UPDATE applications
            SET
                company_name = ?,
                job_role = ?,
                location = ?,
                application_date = ?,
                status = ?,
                deadline = ?,
                notes = ?
            WHERE id = ? AND user_id = ?
        `;

        db.query(
            sql,
            [
                companyName,
                jobRole,
                location,
                applicationDate,
                status,
                deadline,
                notes,
                id,
                userId
            ],
            callback
        );
    },


    delete: (id, userId, callback) => {

        const sql = `
            DELETE FROM applications
            WHERE id = ? AND user_id = ?
        `;

        db.query(
            sql,
            [id, userId],
            callback
        );
    }

};

module.exports = Application;