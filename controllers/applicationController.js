const Application = require("../models/Application");


// CREATE APPLICATION

const createApplication = (req, res) => {

    try {

        const {
            companyName,
            jobRole,
            location,
            applicationDate,
            status,
            deadline,
            notes
        } = req.body;

        const userId = req.user.id;

        if (!companyName || !jobRole) {
            return res.status(400).json({
                message: "Company name and job role are required"
            });
        }

        Application.create(
            userId,
            companyName,
            jobRole,
            location,
            applicationDate,
            status,
            deadline,
            notes,
            (error, result) => {

                if (error) {

                    console.log(error);

                    return res.status(500).json({
                        message: "Failed to create application"
                    });

                }

                res.status(201).json({
                    message: "Application created successfully",
                    applicationId: result.insertId
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


// GET USER APPLICATIONS

const getApplications = (req, res) => {

    const userId = req.user.id;

    Application.getByUserId(
        userId,
        (error, applications) => {

            if (error) {

                console.log(error);

                return res.status(500).json({
                    message: "Failed to fetch applications"
                });

            }

            res.status(200).json({
                applications: applications
            });

        }
    );

};


// UPDATE APPLICATION

const updateApplication = (req, res) => {

    const applicationId = req.params.id;

    const userId = req.user.id;

    const {
        companyName,
        jobRole,
        location,
        applicationDate,
        status,
        deadline,
        notes
    } = req.body;


    Application.update(
        applicationId,
        userId,
        companyName,
        jobRole,
        location,
        applicationDate,
        status,
        deadline,
        notes,
        (error, result) => {

            if (error) {

                console.log(error);

                return res.status(500).json({
                    message: "Failed to update application"
                });

            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Application not found"
                });

            }

            res.status(200).json({
                message: "Application updated successfully"
            });

        }
    );

};


// DELETE APPLICATION

const deleteApplication = (req, res) => {

    const applicationId = req.params.id;

    const userId = req.user.id;


    Application.delete(
        applicationId,
        userId,
        (error, result) => {

            if (error) {

                console.log(error);

                return res.status(500).json({
                    message: "Failed to delete application"
                });

            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Application not found"
                });

            }

            res.status(200).json({
                message: "Application deleted successfully"
            });

        }
    );

};


module.exports = {
    createApplication,
    getApplications,
    updateApplication,
    deleteApplication
};