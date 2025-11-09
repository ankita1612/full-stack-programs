const Employee = require("../models/employee");

// Helper to collect validation errors
const getValidationErrors = (err) => {
  return Object.keys(err.errors).map(field => ({
    field,
    message: err.errors[field].message
  }));
};

// Add Employee
exports.addEmployee = async (req, res) => {
  try {
    const employee = new Employee({
      ...req.body,
      // image: req.files?.image?.[0]?.path,
      // salary_slip: req.files?.salary_slip?.[0]?.path || null,
    });

    // File validation
    const fileErrors = [];
    // if (!req.files?.image) fileErrors.push({ field: "image", message: "Employee image is required" });
    // if (fileErrors.length > 0) return res.status(400).json({ success: false, errors: fileErrors });

    // Validate schema
    await employee.validate();

    // Check email uniqueness
    const existing = await Employee.findOne({ email: employee.email });
    if (existing) return res.status(400).json({ success: false, errors: [{ field: "email", message: "Email already exists" }] });

    await employee.save();
    res.status(201).json({ success: true, data: employee });

  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ success: false, errors: getValidationErrors(err) });
    }
    console.error(err);
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });

    // Update fields
    ["name", "email", "salary", "dob", "description", "status"].forEach(field => {
      if (req.body[field] !== undefined) employee[field] = req.body[field];
    });

    // File update
    if (req.files?.image?.[0]?.path) employee.image = req.files.image[0].path;
    if (req.files?.salary_slip?.[0]?.path) employee.salary_slip = req.files.salary_slip[0].path;

    // Validate schema
    await employee.validate();

    // Check email uniqueness
    if (req.body.email && req.body.email !== employee.email) {
      const existing = await Employee.findOne({ email: req.body.email, _id: { $ne: id } });
      if (existing) return res.status(400).json({ success: false, errors: [{ field: "email", message: "Email already exists" }] });
    }

    await employee.save();
    res.json({ success: true, data: employee });

  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ success: false, errors: getValidationErrors(err) });
    }
    console.error(err);
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};

// Get All Employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json({ success: true, data: employees });
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
