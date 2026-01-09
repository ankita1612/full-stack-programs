import express from "express";
import employeeRoutes from "./employee/employee.routes"
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/employees", employeeRoutes);

app.use(errorHandler);

export default app;
