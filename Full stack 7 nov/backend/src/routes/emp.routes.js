const express = require("express");
const multer = require("multer");
const path = require("path");
const auth = require('../middleware/auth.middleware');

const {
  addEmployee,
  updateEmployee,
  getEmployees,
  getEmployeeById,
  deleteEmployee,
  checkEmailExists
} = require("../controllers/employeeController");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/employee/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });
router.use(auth) // it will apply routet to
// Routes
router.post("/", upload.fields([
  { name: "profile_image", maxCount: 1 },
  { name: "salary_slip", maxCount: 1 }
]), addEmployee);

router.put("/:id", upload.fields([
  { name: "profile_image", maxCount: 1 },
  { name: "salary_slip", maxCount: 1 }
]), updateEmployee);

router.get("/", getEmployees);
router.get("/:id", getEmployeeById);
router.delete("/:id", deleteEmployee);
router.get("/check-email/:email", checkEmailExists);


module.exports = router;
