const Employee = require("../models/employee");
const path = require("path");

// Helper to collect validation errors
const getValidationErrors = (err) => {
  return Object.keys(err.errors).map(field => ({
    field,
    message: err.errors[field].message
  }));
};

// ✅ Check if email exists (excluding a specific ID)
exports.checkEmailExists = async (req, res) => {
  try {
    const { email } = req.params;
    const { excludeId } = req.query;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const query = { email: email.toLowerCase() }; // ensure case-insensitive matching
    if (excludeId) {
      query._id = { $ne: excludeId }; // exclude this ID
    }

    const existingEmployee = await Employee.findOne(query);

    if (existingEmployee) {
      return res.json({ success: true, exists: true, message: "Email already exists" });
    } else {
      return res.json({ success: true, exists: false, message: "Email available" });
    }
  } catch (err) {
    console.error("Error checking email:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// Add Employee
exports.addEmployee = async (req, res) => {
  try {
    const { name, email, salary, dob, description, status } = req.body;
    const profileImage = req.files?.profile_image?.[0];
    const salarySlip = req.files?.salary_slip?.[0];

    // ✅ File validations
    const fileErrors = [];

    if (!profileImage) {
      fileErrors.push({ field: "profile_image", message: "Profile image is required" });
    } else if (!["image/jpeg", "image/jpg"].includes(profileImage.mimetype)) {
      fileErrors.push({ field: "profile_image", message: "Profile image must be JPG or JPEG" });
    }

    if (salarySlip && salarySlip.mimetype !== "application/pdf") {
      fileErrors.push({ field: "salary_slip", message: "Salary slip must be a PDF file" });
    }

    if (fileErrors.length > 0) {
      return res.status(200).json({ success: false, errors: fileErrors });
    }

    // ✅ Check email uniqueness before creating
    const existing = await Employee.findOne({ email });
    if (existing) {
      return res.status(200).json({ 
        success: false, 
        errors: [{ field: "email", message: "Email already exists" }] 
      });
    }

    // ✅ Create employee document
    const employee = new Employee({
      name,
      email,
      salary,
      dob,
      description,
      status,
      profile_image: profileImage ? profileImage.path.replace(/\\/g, "/") : null,
      salary_slip: salarySlip ? salarySlip.path.replace(/\\/g, "/") : null
    });

    // ✅ Validate schema before saving
    await employee.validate();

    await employee.save();

    res.status(201).json({ 
      success: true, 
      message: "Employee added successfully", 
      data: employee 
    });

  } catch (err) {
    console.error(err);

    if (err.name === "ValidationError") {
      return res.status(400).json({ success: false, errors: getValidationErrors(err) });
    }
    console.error(err.stack);
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
  try {
    const { name, email, salary, dob, description, status } = req.body;
    const employeeId = req.params.id;

    // Find existing employee
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    const profileImage = req.files?.profile_image?.[0];
    const salarySlip = req.files?.salary_slip?.[0];

    // ✅ File validations
    const fileErrors = [];

    // Profile image is optional in update
    if (profileImage && !["image/jpeg", "image/jpg"].includes(profileImage.mimetype)) {
      fileErrors.push({ field: "profile_image", message: "Profile image must be JPG or JPEG" });
    }

    if (salarySlip && salarySlip.mimetype !== "application/pdf") {
      fileErrors.push({ field: "salary_slip", message: "Salary slip must be a PDF file" });
    }

    if (fileErrors.length > 0) {
      return res.status(400).json({ success: false, errors: fileErrors });
    }

    // ✅ Check email uniqueness (exclude current employee)    
    const existingEmail = await Employee.findOne({ email: email.toLowerCase(), _id: { $ne: employeeId } });

    if (existingEmail) {
      return res.status(400).json({ 
        success: false, 
        errors: [{ field: "email", message: "Email already exists" }] 
      });
    }

    // ✅ Update fields
    employee.name = name;
    employee.email = email;
    employee.salary = salary;
    employee.dob = dob;
    if (description) employee.description = description;
    employee.status = status;

    // Only update files if provided
    const normalizePath = (filePath) => filePath?.replace(/\\/g, "/");

    if (profileImage) employee.profile_image = normalizePath(profileImage?.path);;
    if (salarySlip) employee.salary_slip = normalizePath(salarySlip?.path);

    // ✅ Validate schema
    await employee.validate();
    await employee.save();

    res.status(200).json({ 
      success: true, 
      message: "Employee updated successfully", 
      data: employee 
    });

  } catch (err) {
    console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({ success: false, errors: getValidationErrors(err) });
  }

    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};



// Get All Employees
exports.getEmployees = async (req, res) => {
  try {
    // 🔹 Extract query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // ✅ Cap limit to max 100
    const safeLimit = Math.min(limit, 100);

    const search = req.query.search || "";
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

    // ✅ Allowed sort fields
    const allowedSortFields = ["name", "email", "salary", "dob", "createdAt"];
    const sortKey = allowedSortFields.includes(req.query.sortField)
      ? req.query.sortField
      : "createdAt";

    // 🔹 Calculate skip
    const skip = (page - 1) * safeLimit;

    // 🔹 Build search filter
    const filter = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    // 🔹 Build sort object
    const sort = {};
    sort[sortKey] = sortOrder;

    // 🔹 Fetch data
    const employees = await Employee.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(safeLimit);

    const total = await Employee.countDocuments(filter);

    res.json({
      success: true,
      data: employees,
      pagination: {
        total,
        page,
        limit: safeLimit,
        totalPages: Math.ceil(total / safeLimit),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};


// Get Employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });
    res.json({ success: true, data: employee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });
    res.json({ success: true, message: "Employee deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};


/*
{
  success: true/false,
  data: ...,
  errors: [...],
  message: "..."
}
*/