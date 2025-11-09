const express = require('express')
const router = express.Router()
const authController = require('../app/controllers/authController');
const employeeController = require('../app/controllers/employeeController');
const userController = require('../app/controllers/userController');
const commonController = require('../app/controllers/commonController');
const departmentController = require('../app/controllers/departmentController');
const authMiddleware = require('../app/middlewares/authMiddleware');

//auth
router.post('/auth/signup', authController.singup);
router.post('/auth/login', authController.login);
// router.get('/forgot_password', authController.forgotPassword);
// router.put('/reset_password', authController.resetPassword);
console.log('++++++++++++++++');
//employee
router.get('/employee', employeeController.findAll);
router.post('/employee',  employeeController.uploadMiddleware, employeeController.create);
router.get('/employee/:id', authMiddleware, employeeController.findById);
router.put('/employee/:id', authMiddleware, employeeController.update);
router.delete('/employee/:id', authMiddleware, employeeController.delete);

//users
router.get('/user', userController.findAll);
router.post('/user', authMiddleware, userController.create);
router.get('/user/:id', authMiddleware, userController.findById);
router.put('/user/:id', authMiddleware, userController.update);
router.delete('/user/:id', authMiddleware, userController.delete);

//department
router.get('/department', departmentController.findAll);
router.post('/department', departmentController.create);
router.get('/department/:id', departmentController.findById);
router.put('/department/:id', departmentController.update);
router.delete('/department/:id', departmentController.delete);

//common
router.get('/mailsend_demo', commonController.mailsendDemo);
router.post('/file_upload', commonController.fileUpload);
router.post('/xls_export', commonController.xlsExport);
router.post('/queue_demo', commonController.queueDemo);

module.exports = router
