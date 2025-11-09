'use strict';
const User = require('../models/user');
const sendTestEmail = require('../helper/sendEmail');// create express app
const upload = require('../helper/fileUploadImage'); // Import the helper
const Joi = require('joi');
const common_helper = require('../helper/common');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const CONSTANTS = require('../../config/constants'); // Import the constants
const userCreate = Joi.object({
    name: Joi.string().trim().min(3).max(30).required().messages({
        'string.empty': 'Name cannot be empty!',
        'string.min': 'Name must be at least 3 characters long.',
        'string.max': 'Name cannot exceed 30 characters.',
        'any.required': 'Name is a required.',
    }),
    email: Joi.string().trim().email().required().messages({
        'string.email': 'Invalid email address.',
        'any.required': 'Email is required.',
    }),
    password: Joi.string().trim().required().messages({
        'any.required': 'password is required.',
    })
});

const userUpdate = Joi.object({
    id: Joi.string()
        .optional() // ID is optional for "add" but should be validated if provided (e.g., during "edit")
        .messages({
            'string.empty': 'ID cannot be empty.',
        }),
    name: Joi.string().trim().min(3).max(30).required().messages({
        'string.empty': 'Name cannot be empty!',
        'string.min': 'Name must be at least 3 characters long.',
        'string.max': 'Name cannot exceed 30 characters.',
        'any.required': 'Name is a required.',
    }),
    email: Joi.string().trim().email().required().messages({
        'string.email': 'Invalid email address.',
        'any.required': 'Email is required.',
    }),
    // password: Joi.string().optional()
});

exports.create = async (req, res) => {
    try {
        //validations
        const { error, value } = userCreate.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            const errorMessages = error.details.map(err => err.message);
            return res.status(400).json({ error: true, errors: errorMessages, data: [] });
        }

        //check unique
        const email = req.body.email;
        const existingdata = await User.findOne({ where: { email } });
        if (existingdata) {
            return res.status(400).json({ error: true, message: CONSTANTS.USER.EMAIL_ALREADY_EXIST, data: [] });
        }
        //end check

        const user = await User.create(req.body);
        res.status(200).json({ error: false, message: CONSTANTS.USER.USER_CREATED_SUCCESS, data: user });
    } catch (err) {
        common_helper.errorLog(err)
        res.status(500).json({ error: true, message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { error, value } = userUpdate.validate(req.body); // Validate input
        if (error) {
            return res.status(400).json({ error: true, message: error.details[0].message, data: [] });
        }

        // Find user by ID
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(400).json({ error: true, message: CONSTANTS.USER.USER_NOT_FOUND, data: [] });
        }

        //check unique
        const existingUser = await User.findOne({ where: { email: value.email, id: { [Op.ne]: req.params.id } } });

        if (existingUser) {
            return res.status(400).json({ error: true, message: CONSTANTS.USER.EMAIL_ALREADY_EXIST, data: [] });
        }

        // Perform partial update using Sequelize
        await user.update(req.body);
        res.status(200).json({ error: false, message: CONSTANTS.USER.USER_UPDATED_SUCCESS, data: user });
    } catch (err) {
        common_helper.errorLog(err)
        res.status(500).json({ error: true, message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.status(200).json({ error: false, message: CONSTANTS.USER.USER_DELETE_SUCCESS, data: [] });
        } else {
            res.status(404).json({ error: true, message: CONSTANTS.USER.USER_NOT_FOUND, data: [] });
        }
    } catch (err) {
        common_helper.errorLog(err)
        res.status(500).json({ error: true, message: err.message, data: [] });
    }
};

exports.findAll = async (req, res) => {
    try {
        const user = await User.findAll({});
        res.status(200).json({ error: false, message: '', data: user });
    } catch (err) {
        common_helper.errorLog(err)
        res.status(500).json({ error: true, message: err.message });
    }
};

exports.findById = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.id }
        });

        if (user) {
            res.status(200).json({ error: false, message: '', data: user });
        } else {
            res.status(404).json({ error: true, message: CONSTANTS.USER.USER_NOT_FOUND_FOR_ID, data: {} });
        }
    } catch (err) {
        common_helper.errorLog(err)
        res.status(500).json({ error: true, message: err.message });
    }
};