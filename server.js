require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const db = require("./config/db");

const app = express();


// Middleware

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));

app.use(express.json());


// Routes

app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/resume", resumeRoutes);


// Port

const PORT = process.env.PORT || 5000;


// Backend Test Route

app.get("/api/test", (req, res) => {

    res.json({
        message: "InternTrack AI Backend Connected Successfully"
    });

});


// Start Server

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});