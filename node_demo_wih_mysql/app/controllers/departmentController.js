'use strict';
const Department = require('../models/department');
const Joi = require('joi');
const common_helper = require('../helper/common');
const { Op } = require('sequelize');
const CONSTANTS = require('../../config/constants'); // Import the constants

exports.findAll = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const offset = (page - 1) * limit;

    try {
        const result = await Department.findAndCountAll({
            limit,
            offset,
        });

        res.json({
            error: false,
            totalItems: result.count,
            totalPages: Math.ceil(result.count / limit),
            currentPage: page,
            data: result.rows,
            message: ''
        });
    } catch (err) {
        common_helper.errorLog(err)
        res.status(500).json({ error: true, message: err.message });
    }
};


const departmentCreate = Joi.object({
    name: Joi.string().trim().required().messages({
        'string.empty': 'Name cannot be empty!',
        'any.required': 'Name is a required.',
    }),
    start_date: Joi.string().trim().required().messages({
        'string.empty': 'start_date cannot be empty!',
        'any.required': 'start_date is a required.'
    }),
    status: Joi.string().trim().required().messages({
        'string.empty': 'status cannot be empty!',
        'any.required': 'status is a required.'
    }),
    description: Joi.string().optional()
});

const departmentUpdate = Joi.object({
    id: Joi.string()
        .optional() // ID is optional for "add" but should be validated if provided (e.g., during "edit")
        .messages({
            'string.empty': 'ID cannot be empty.',
        }),
    name: Joi.string().trim().required().messages({
        'string.empty': 'Name cannot be empty!',
        'any.required': 'Name is a required.',
    }),
    start_date: Joi.string().trim().required().messages({
        'string.empty': 'start_date cannot be empty!',
        'any.required': 'start_date is a required.'
    }),
    status: Joi.string().trim().required().messages({
        'string.empty': 'status cannot be empty!',
        'any.required': 'status is a required.'
    }),
    description: Joi.string().optional()
});

exports.create = async (req, res) => {
    try {
        //validations
        const { error, value } = departmentCreate.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            const errorMessages = error.details.map(err => err.message);
            return res.status(400).json({ error: true, errors: errorMessages, data: [] });
        }

        const department = await Department.create(req.body);
        res.status(200).json({ error: false, message: CONSTANTS.DEPARTMENT.DEPARTMENT_CREATED_SUCCESS, data: department });
    } catch (err) {
        common_helper.errorLog(err)
        res.status(500).json({ error: true, message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { error, value } = departmentUpdate.validate(req.body); // Validate input
        if (error) {
            return res.status(400).json({ error: true, message: error.details[0].message, data: [] });
        }

        // Find department by ID
        const department = await Department.findByPk(req.params.id);
        if (!department) {
            return res.status(400).json({ error: true, message: CONSTANTS.DEPARTMENT.DEPARTMENT_NOT_FOUND, data: [] });
        }

        // Perform partial update using Sequelize
        await department.update(req.body);
        res.status(200).json({ error: false, message: CONSTANTS.DEPARTMENT.DEPARTMENT_UPDATED_SUCCESS, data: department });
    } catch (err) {
        common_helper.errorLog(err)
        res.status(500).json({ error: true, message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const department = await Department.findByPk(req.params.id);
        if (department) {
            await department.destroy();
            res.status(200).json({ error: false, message: CONSTANTS.DEPARTMENT.DEPARTMENT_DELETE_SUCCESS, data: [] });
        } else {
            res.status(404).json({ error: true, message: CONSTANTS.DEPARTMENT.DEPARTMENT_NOT_FOUND, data: [] });
        }
    } catch (err) {
        common_helper.errorLog(err)
        res.status(500).json({ error: true, message: err.message, data: [] });
    }
};


exports.findById = async (req, res) => {
    try {
        const department = await Department.findOne({
            where: { id: req.params.id }
        });

        if (department) {
            res.status(200).json({ error: false, message: '', data: department });
        } else {
            res.status(404).json({ error: true, message: CONSTANTS.DEPARTMENT.DEPARTMENT_NOT_FOUND_FOR_ID, data: {} });
        }
    } catch (err) {
        common_helper.errorLog(err)
        res.status(500).json({ error: true, message: err.message });
    }
};