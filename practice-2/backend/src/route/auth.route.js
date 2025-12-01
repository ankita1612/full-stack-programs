const express = require("express")
const router = express.Router()
const {userLogin, userRegister} = require("../controller/auth")
const {  check , body } = require('express-validator');

const registerValidation =
   [
        body('name').trim().notEmpty().withMessage('name must not empty').isLength({ max: 100 }).withMessage('Max length is 100 bytes'),
        body('email').trim().notEmpty().withMessage('email must not empty').isEmail().withMessage('Not a valid e-mail address'),
        body('password').trim().notEmpty().withMessage('password must not empty'),
        body('confirm_password').custom((value, { req }) => {
            return value === req.body.password;
        }),
   ]
const loginValidation =
   [
        body('email').trim().notEmpty().withMessage('email must not empty').isEmail().withMessage('Not a valid e-mail address'),
        body('password').trim().notEmpty().withMessage('password must not empty'),       
   ]


router.post("/login",loginValidation, userLogin)
router.post("/register",registerValidation, userRegister)//,

module.exports = router;