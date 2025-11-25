//models/user.js
const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100
    },
    deleted_date: {
        type: Date,
        required: false,
    },   
}, { timestamps: true });

function validateUser(user) {
    const schema = Joi.object({        
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(7).max(100).required(),
        confirm_password: Joi.any().valid(Joi.ref('password')).required()

    })
    return schema.validate(user, { abortEarly: false })
}
const User = mongoose.model('User', userSchema)
module.exports.validate_user = validateUser
module.exports.User = User