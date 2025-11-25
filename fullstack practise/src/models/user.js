const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({    
    name: String,
    email: String,
    password: String,    
    deletedAt:Date,
    my_date:Date    
},{timestamp:true});

module.exports = mongoose.model('user', userSchema, 'users');