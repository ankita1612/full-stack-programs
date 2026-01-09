import { body, validationResult }  from "express-validator";
import User from "../models/user.js";

export const registrationRules = () => {
   return [
    body("email").notEmpty().withMessage("email is required")
        .isEmail().withMessage("Please provide a valid email"),
    body("username").notEmpty().withMessage("username is required"),
    body("password").notEmpty().withMessage("Password name is required"),        
   ]
}
export const loginRules = () => {
   return [
    body("email").notEmpty().withMessage("email is required")
        .isEmail().withMessage("Please provide a valid email"),    
    body("password").notEmpty().withMessage("Password name is required"),        
   ]
}
export const validateRequests = (req, res, next) => {
   const errors = validationResult(req);
   const clientErrors = [];
    errors.array().map((err) => clientErrors.push({ message: 
      err.msg ,fieldName:  err.path}));
    if (clientErrors.length == 0) {
      return next();
     }
  return res.status(400).json({
    "success":false,
    "error" :clientErrors,
  });
};