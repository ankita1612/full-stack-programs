require('dotenv').config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const compression =  require("compression");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());

// Routes
const authRoute = require("./src/route/auth");
const queryTestingRoute = require("./src/route/queryTesting");
const empRoute = require("./src/route/employee")
// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => {
        console.error("MongoDB Error:", err.message);
        process.exit(1);
    });

// API Routes
app.use("/auth", authRoute);
app.use("/query-testing", queryTestingRoute);
app.use("/employee",empRoute)


// Serve React build
// app.use(express.static(path.join(__dirname, "../frontend/dist")));

// // Catch-all for SPA — Express 5 FIX
// app.get(/.*/, (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
// });

// Error Handler
app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        error: err.message,
        stack: err.stack
    });
});

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
