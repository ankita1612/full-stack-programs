const { body } = require('express-validator');

exports.validateRegister = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
  body('confirmpassword').custom((v, { req }) => {
    if (v !== req.body.password) throw new Error('Passwords must match');
    return true;
  })
];

exports.validateLogin = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required')
];
