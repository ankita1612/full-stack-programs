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
// console.log("111")
// console.log(path.extname("/home/user/test.js"))
// console.log("222")
// console.log(path.resolve("src", "index.js"))
// console.log("333")
// console.log(path.join("dirname", "uploads", "file.txt"))
// console.log("444")
// console.log(path.parse("D:\MERN boilerplate\fullstack practise\backend\src\index.js"))
console.time('Execution  Time');
setTimeout(()  =>  { 
console.timeEnd('Execution  Time'); 
}, 1000); 
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
 app.use(express.static(path.join(__dirname, "../frontend/dist")));

// // Catch-all for SPA — Express 5 FIX
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
 });

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
