const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Name is required"], 
    trim: true,
    maxlength: [100, "Name cannot exceed 100 characters"]
  },
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    unique: true, 
    lowercase: true,
    match: [/.+@.+\..+/, "Invalid email format"]
  },
  salary: { 
    type: Number, 
    required: [true, "Salary is required"], 
    min: [1, "Salary must be greater than 0"], 
    max: [1000000, "Salary cannot exceed 10,00,000"]
  },
  dob: { 
    type: Date, 
    required: [true, "Date of Birth is required"], 
    validate: {
      validator: (v) => v < new Date(),
      message: "DOB must be earlier than today"
    }
  },
  description: { 
    type: String, 
    required: [true, "Description is required"], 
    trim: true 
  },
  status: { 
    type: String, 
    enum: ["Active", "Inactive"], 
    default: "Active" 
  },
  profile_image: { 
    type: String, 
    required: [function() { return this.isNew; }, "Profile image is required"]
  },
  salary_slip: { 
    type: String, 
    default: null
  },
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
