const express =require("express")

const router = express.Router()
const {body} = require("express-validator")
const {employeeList, employeeAdd, employeeEdit, employeeDelete} = require("../controller/employee")

const validateAddEmp = [
     body('name').trim().notEmpty().withMessage("a").isLength({ max: 100, min:10 }).withMessage("a"),
     body('salary').trim().notEmpty().withMessage("a").isNumeric().withMessage("a"),
     body('email').trim().notEmpty().withMessage("a").isEmail().withMessage("a"),
     body('status').trim().notEmpty().withMessage("a").isIn(["active", "inactive"]),
     body('desc').trim().optional()
]
const validateEditEmp = [
     body('name').trim().notEmpty().withMessage("a").isLength({ max: 100, min:10 }).withMessage("a"),
     body('salary').trim().notEmpty().withMessage("a").isNumeric().withMessage("a"),
     body('email').trim().notEmpty().withMessage("a").isEmail().withMessage("a"),
     body('status').trim().notEmpty().withMessage("a").isIn(["active", "inactive"]),
     body('desc').trim().optional()
]
router.get("/",employeeList)
router.get("/:id",employeeList)
router.post("/",validateAddEmp,employeeAdd)
 router.delete("/:id",employeeDelete)
router.put("/:id",validateEditEmp,employeeEdit)
// router.put("/:id",validateAddEmp,employeeAdd)

module.exports = router