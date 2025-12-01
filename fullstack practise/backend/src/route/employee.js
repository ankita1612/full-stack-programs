const express =require("express")
const {validateUser} = require("../middleware/auth");
const router = express.Router()
const {body} = require("express-validator")
const {employeeList, employeeAdd, employeeEdit, employeeDelete} = require("../controller/employee")


const validateAddEmp = [
     body('name').trim().notEmpty().withMessage("name must required").isLength({ max: 100, min:10 }).withMessage("min length is 10"),
     body('salary').trim().notEmpty().withMessage("salary not empty").isNumeric().withMessage("salary must numeric"),
     body('email').trim().notEmpty().withMessage("email required").isEmail().withMessage("valid email"),
     body('status').trim().notEmpty().withMessage("status should mot empty").isIn(["active", "inactive"]).withMessage("valid status"),
     body('desc').trim().optional()
]
const validateEditEmp = [
     body('name').trim().notEmpty().withMessage("a1").isLength({ max: 100, min:10 }).withMessage("min length is 10"),
     body('salary').trim().notEmpty().withMessage("a3").isNumeric().withMessage("a"),
     body('email').trim().notEmpty().withMessage("a4").isEmail().withMessage("a"),
     body('status').trim().notEmpty().withMessage("a5").isIn(["active", "inactive"]),
     body('desc').trim().optional()
]
router.get("/",validateUser,employeeList)
router.get("/:id",employeeList)
router.post("/",validateAddEmp,employeeAdd)
 router.delete("/:id",employeeDelete)
router.put("/:id",validateEditEmp,employeeEdit)
// router.put("/:id",validateAddEmp,employeeAdd)

module.exports = router