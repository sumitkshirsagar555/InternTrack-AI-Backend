const express = require("express");

const {
    createInterview,
    getInterviews,
    updateInterview,
    deleteInterview
} = require("../controllers/interviewController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// Add Interview
router.post(
    "/",
    authMiddleware,
    createInterview
);


// Get Interviews
router.get(
    "/",
    authMiddleware,
    getInterviews
);


// Update Interview
router.put(
    "/:id",
    authMiddleware,
    updateInterview
);


// Delete Interview
router.delete(
    "/:id",
    authMiddleware,
    deleteInterview
);


module.exports = router;