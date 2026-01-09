import dotenv from "dotenv";
import express from "express";

import connectDB from "./config/db";
import employeeRoutes from "./employee/employee.routes";
import { errorHandler } from "./middlewares/error.middleware";

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION 💥", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION 💥", reason);
  process.exit(1);
});


dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/employees", employeeRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
