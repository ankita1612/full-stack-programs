const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"], trim: true },
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    unique: true, 
    lowercase: true,
    match: [/.+@.+\..+/, "Invalid email format"]
  },
  salary: { type: Number, required: [true, "Salary is required"], min: [0, "Salary must be positive"] },
  dob: { type: Date, required: [true, "Date of Birth is required"] },
  description: { type: String, default: "", trim: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  image: { type: String, optional: [true, "Employee image is required"] },
  salary_slip: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
