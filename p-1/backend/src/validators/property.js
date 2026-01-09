const { check, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");


const validateAdd = [
  check("name").notEmpty().withMessage("Name is required"),
  check("desc").notEmpty().withMessage("Desc Name is required"),
  check("stock").notEmpty().withMessage("Srock is required"),  
];
const validateEdit = [
  check("name").notEmpty().withMessage("Name is required"),
  check("desc").notEmpty().withMessage("Desc Name is required"),
  
];
const isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
 
  if (errors.array().length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: errors.array()[0].msg });
  }
  next();
};
module.exports = {
  validateAdd,
  validateEdit,
  isRequestValidated  
};