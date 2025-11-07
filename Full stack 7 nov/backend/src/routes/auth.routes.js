const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/auth.controller');
const { validateRegister, validateLogin } = require('../validators/auth.validator');
const validate = require('../middleware/validate.middleware');

router.post('/register', validateRegister, validate, register);
router.post('/login', validateLogin, validate, login);

module.exports = router;
