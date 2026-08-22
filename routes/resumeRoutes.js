const express = require("express");

const multer = require("multer");

const {
    analyzeResumeController
} = require("../controllers/resumeController");

const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();


// Store uploaded PDF in memory
const upload = multer({
    storage: multer.memoryStorage(),

    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {

        if (file.mimetype === "application/pdf") {

            cb(null, true);

        } else {

            cb(
                new Error("Only PDF files are allowed")
            );

        }

    }
});


// Analyze Resume
router.post(
    "/analyze",
    authMiddleware,
    upload.single("resume"),
    analyzeResumeController
);


module.exports = router;