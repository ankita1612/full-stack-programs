const express =require("express")
const { body, validationResult } = require('express-validator');

const router= express.Router()

const {registration,login} =require("../controller/auth")

const login_validation = 
    [
      body("email").isEmail().withMessage("email required").trim(),
      body("password").notEmpty().withMessage("Password required").trim(),
    ]
const reg_validate=[
  body('name').trim().notEmpty(),
   body('email').trim().notEmpty().withMessage('e-mail address required').bail().isEmail().withMessage('Not a valid e-mail address'),
   body('password').trim().notEmpty().withMessage('Password required').isLength({ min: 5 }),
   body('confirm_password').custom((value, { req }) => {
    return value === req.body.password;
  }).withMessage("Must same"),
]

router.post("/registration",reg_validate, registration)
router.post("/login",login_validation,login)

module.exports=router