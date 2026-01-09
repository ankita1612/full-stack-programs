const express = require("express");
const path  = require("path");
require("dotenv").config();
const connectDB = require("./src/db/connect");
const app = express();
var cors = require("cors");
const authRouter = require("./src/routes/auth");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api", authRouter);
//Port and Connect to DB
const port =  5000;
const start = async () => {
  try {
    await connectDB("mongodb://localhost:27017/practise");
    app.listen(port, () => {
         console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
      console.log("error =>", error);
  }
};
start();