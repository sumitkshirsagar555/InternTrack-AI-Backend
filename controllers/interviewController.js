const Interview = require("../models/Interview");


// CREATE INTERVIEW

const createInterview = (req, res) => {

    try {

        const {
            applicationId,
            companyName,
            jobRole,
            interviewDate,
            interviewTime,
            interviewMode,
            interviewStatus,
            notes
        } = req.body;

        const userId = req.user.id;


        if (!companyName || !jobRole || !interviewDate) {

            return res.status(400).json({
                message: "Company name, job role and interview date are required"
            });

        }


        Interview.create(
            userId,
            applicationId,
            companyName,
            jobRole,
            interviewDate,
            interviewTime,
            interviewMode,
            interviewStatus,
            notes,
            (error, result) => {

                if (error) {

                    console.log(error);

                    return res.status(500).json({
                        message: "Failed to create interview"
                    });

                }


                res.status(201).json({
                    message: "Interview created successfully",
                    interviewId: result.insertId
                });

            }
        );

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

};



// GET USER INTERVIEWS

const getInterviews = (req, res) => {

    const userId = req.user.id;


    Interview.getByUserId(
        userId,
        (error, interviews) => {

            if (error) {

                console.log(error);

                return res.status(500).json({
                    message: "Failed to fetch interviews"
                });

            }


            res.status(200).json({
                interviews: interviews
            });

        }
    );

};



// UPDATE INTERVIEW

const updateInterview = (req, res) => {

    const interviewId = req.params.id;

    const userId = req.user.id;


    const {
        companyName,
        jobRole,
        interviewDate,
        interviewTime,
        interviewMode,
        interviewStatus,
        notes
    } = req.body;


    Interview.update(
        interviewId,
        userId,
        companyName,
        jobRole,
        interviewDate,
        interviewTime,
        interviewMode,
        interviewStatus,
        notes,
        (error, result) => {

            if (error) {

                console.log(error);

                return res.status(500).json({
                    message: "Failed to update interview"
                });

            }


            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Interview not found"
                });

            }


            res.status(200).json({
                message: "Interview updated successfully"
            });

        }
    );

};



// DELETE INTERVIEW

const deleteInterview = (req, res) => {

    const interviewId = req.params.id;

    const userId = req.user.id;


    Interview.delete(
        interviewId,
        userId,
        (error, result) => {

            if (error) {

                console.log(error);

                return res.status(500).json({
                    message: "Failed to delete interview"
                });

            }


            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Interview not found"
                });

            }


            res.status(200).json({
                message: "Interview deleted successfully"
            });

        }
    );

};



module.exports = {
    createInterview,
    getInterviews,
    updateInterview,
    deleteInterview
};