'use strict';
const User = require('../models/user');
const Joi = require('joi')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CONSTANTS = require('../../config/constants'); // Import the constants

const userSignupSchema = Joi.object({
    name: Joi.string().trim().min(3).max(30).required().messages({
        'string.empty': 'Name cannot be empty!',
        'string.min': 'Name must be at least 3 characters long.',
        'string.max': 'Name cannot exceed 30 characters.',
        'any.required': 'Name is a required field.',
    }),
    email: Joi.string().trim().email().required().messages({
        'string.empty': 'Email cannot be empty!',
        'string.email': 'Invalid email address.',
        'any.required': 'Email is required.',
    }),
    password: Joi.string().trim().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_]{6,30}$')).required()
        .messages({
            'string.empty': 'Password cannot be empty!',
            'string.pattern.base': 'Password must be alphanumeric and between 6 to 30 characters long.',
            'any.required': 'Password is a required field.',
        }),
});

// Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } ,attributes: ['id', 'name', 'email', 'password'] });      
        if (!user) {
            return res.status(404).json({ message: CONSTANTS.USER.USER_NOT_FOUND });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: CONSTANTS.USER.INVALID_PASSWORD });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY, {
            expiresIn: '5h',
        });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.singup = function (req, res) {
    const { error, value } = userSignupSchema.validate(req.body, {
        abortEarly: false,
    });
    if (error) {
        const errorMessages = error.details.map(err => err.message);
        res.json({ error: true, message: errorMessages });
    }
    else {
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (!user) {
                return bcrypt.hash(req.body.password, 10)
                    .then(hashedPassword => {
                        const user = new User({
                            name: req.body.name,
                            email: req.body.email,
                            password: hashedPassword,
                        });
                        user.save();
                    })
                    .then(result => {
                        res.json({ error: false, message: CONSTANTS.USER.SIGNUP_SUCCESS });
                    });
            } else {
                res.json({ error: true, message: CONSTANTS.USER.EMAIL_ALREADY_EXIST });
            }
        })
            .catch(err => console.log(err));
    }
};





