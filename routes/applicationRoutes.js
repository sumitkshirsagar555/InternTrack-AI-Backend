const express = require("express");

const {
    createApplication,
    getApplications,
    updateApplication,
    deleteApplication
} = require("../controllers/applicationController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


router.post(
    "/",
    authMiddleware,
    createApplication
);


router.get(
    "/",
    authMiddleware,
    getApplications
);


router.put(
    "/:id",
    authMiddleware,
    updateApplication
);


router.delete(
    "/:id",
    authMiddleware,
    deleteApplication
);


module.exports = router;