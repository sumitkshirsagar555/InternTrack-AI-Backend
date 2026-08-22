const db = require("../config/db");

const Interview = {

    // CREATE INTERVIEW
    create: (
        userId,
        applicationId,
        companyName,
        jobRole,
        interviewDate,
        interviewTime,
        interviewMode,
        interviewStatus,
        notes,
        callback
    ) => {

        const sql = `
            INSERT INTO interviews
            (
                user_id,
                application_id,
                company_name,
                job_role,
                interview_date,
                interview_time,
                interview_mode,
                interview_status,
                notes
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                userId,
                applicationId || null,
                companyName,
                jobRole,
                interviewDate,
                interviewTime || null,
                interviewMode || "Online",
                interviewStatus || "Scheduled",
                notes || null
            ],
            callback
        );
    },


    // GET USER INTERVIEWS
    getByUserId: (userId, callback) => {

        const sql = `
            SELECT *
            FROM interviews
            WHERE user_id = ?
            ORDER BY interview_date ASC, interview_time ASC
        `;

        db.query(
            sql,
            [userId],
            callback
        );
    },


    // UPDATE INTERVIEW
    update: (
        id,
        userId,
        companyName,
        jobRole,
        interviewDate,
        interviewTime,
        interviewMode,
        interviewStatus,
        notes,
        callback
    ) => {

        const sql = `
            UPDATE interviews
            SET
                company_name = ?,
                job_role = ?,
                interview_date = ?,
                interview_time = ?,
                interview_mode = ?,
                interview_status = ?,
                notes = ?
            WHERE id = ? AND user_id = ?
        `;

        db.query(
            sql,
            [
                companyName,
                jobRole,
                interviewDate,
                interviewTime || null,
                interviewMode,
                interviewStatus,
                notes || null,
                id,
                userId
            ],
            callback
        );
    },


    // DELETE INTERVIEW
    delete: (id, userId, callback) => {

        const sql = `
            DELETE FROM interviews
            WHERE id = ? AND user_id = ?
        `;

        db.query(
            sql,
            [id, userId],
            callback
        );
    }

};

module.exports = Interview;