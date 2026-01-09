import { body, param } from "express-validator";

export const createEmployeeValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("salary").isNumeric().withMessage("Salary must be number")
];

export const idParamValidation = [
  param("id").isMongoId().withMessage("Invalid ID")
];
