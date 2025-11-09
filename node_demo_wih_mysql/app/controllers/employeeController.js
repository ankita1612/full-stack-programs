'use strict';
console.log("HAiii")

const Employee = require('../models/employee');
const Joi = require('joi');
const multer = require('multer');
const path = require('path');
const common_helper = require('../helper/common');
const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
// Configure multer for file storage
// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder for uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

// File filter to validate extensions
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
        return cb(new Error('Invalid file type. Only images are allowed.'));
    }
    cb(null, true);
};
        console.log(222222222222)

// Initialize multer
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});
exports.uploadMiddleware = upload.single('profile_image');

const employeeCreate = Joi.object({
    
    id: Joi.string()
        .optional() // ID is optional for "add" but should be validated if provided (e.g., during "edit")
        .messages({
            'string.empty': 'ID cannot be empty.',
        }),
    first_name: Joi.string().trim().min(3).max(30).required().messages({
        'string.empty': 'First name cannot be empty!',
        'string.min': 'First name must be at least 3 characters long.',
        'string.max': 'First name cannot exceed 30 characters.',
        'any.required': 'First name is a required.',
    }),
    last_name: Joi.string().trim().min(3).max(30).required().messages({
        'string.empty': 'Last name cannot be empty!',
        'string.min': 'Last name must be at least 3 characters long.',
        'string.max': 'Last name cannot exceed 30 characters.',
        'any.required': 'Last name is a required.',
    }),
    email: Joi.string().trim().email().required().messages({
        'string.email': 'Invalid email address.',
        'any.required': 'Email is required.',
    }),
    phone: Joi.string().trim().required().messages({
        'any.required': 'Phone is required.',
    }),
    DOB: Joi.date().min('1980-01-01').max('now').messages({
        'date.empty': 'Date of birth cannot be empty!',
        'date.min': 'min!',
        'date.max': 'DOB must be greater than today\'s Date',
    }),
    designation: Joi.string().valid('Manager', 'Developer', 'Designer', 'Tester').required().messages({
        'any.only': 'Designation must be one of: Manager, Developer, Designer, Tester.',
        'any.required': 'Designation is required.',
    }),
    salary: Joi.string().trim().required().messages({
        'string.empty': 'Salary is required.',
    }),
    status: Joi.string().trim().optional(),
    profile_image: Joi.string().optional(),
});

exports.create = async (req, res) => {
    //file validation
    // const file_path = req.file;
    // if (!req.file) {                                
    //     return res.status(400).json({ error: 'File upload failed or no file provided' });
    // }
    // console.log(file_path);
    //end file validation    

    //console.log('POST Data:', req.body); // Print POST data to console
    //console.log("~~>" + req.body.email);
    //process.exit(0);

    //validations
    const { error, value } = employeeCreate.validate(req.body, {
        abortEarly: false,
    });
    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).json({ error: true, errors: errorMessages, data: [] });
    }

    //check unique
    const email = req.body.email;
    const existingdata = await Employee.findOne({ where: { email } });
    if (existingdata) {
        return res.status(400).json({ error: true, message: CONSTANTS.EMPLOYEE.EMAIL_ALREADY_EXIST, data: [] });
    }
    //end check
    try {
        const { first_name, last_name, email, phone, DOB, designation, salary, status } = req.body;
        const profile_image = req.file ? req.file.filename : null;
        const employee = await Employee.create({ first_name, last_name, email, phone, DOB, designation, salary, status, profile_image });
        res.status(200).json({ error: false, message: [], data: employee });
    } catch (err) {
        common_helper.errorLog(err)
        res.status(500).json({ error: true, message: err.message });
    }
    // try {
    //     const employee = await Employee.create(req.body);
    //     res.status(201).json(employee);
    // } catch (err) {
    //     common_helper.errorLog(err)
    //     res.status(500).json({ error: err.message });
    // }







};

exports.update = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (employee) {
            // console.log(req.body)
            await employee.update(req.body);
            res.status(200).json({ error: false, message: '', data: employee });
        } else {
            res.status(400).json({ error: true, message: CONSTANTS.EMPLOYEE.EMPLOYEE_NOT_FOUND, data: [] });
        }
    } catch (err) {
        common_helper.errorLog(err)
        res.status(500).json({ error: true, message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        console.log(employee)
        if (employee) {
            await employee.destroy();
            res.status(200).json({ error: false, message: CONSTANTS.EMPLOYEE.EMPLOYEE_DELETE_SUCCESS, data: [] });
        } else {
            res.status(400).json({ error: true, message: CONSTANTS.EMPLOYEE.EMPLOYEE_NOT_FOUND, data: [] });
        }
    } catch (err) {
        common_helper.errorLog(err)
        res.status(500).json({ error: true, message: err.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        console.log(111111111)
        const employee = await Employee.findAll();
        res.status(200).json({ error: false, message: '', data: employee });
    } catch (err) {
        common_helper.errorLog(err)
        res.status(500).json({ error: true, message: err.message });
    }
};

exports.findById = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (employee) {
            res.status(200).json({ error: false, message: '', data: employee });
        } else {
            res.status(404).json({ error: true, message: CONSTANTS.EMPLOYEE.EMPLOYEE_NOT_FOUND_FOR_ID, data: [] });
        }
    } catch (err) {
        common_helper.errorLog(err)
        res.status(500).json({ error: true, message: err.message });
    }
};