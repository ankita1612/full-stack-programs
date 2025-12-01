const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
    },
  email:{
    type: String,
    unique: true
  } ,
  password:{
    type: String,
  },
  deleted_at:{
    type: Date,    
  },
  status:{
    type: String,
    require: true
  },
  joining_date:{
    type: Date,  
    require: true  
  }

},{timestamps: true});

// compile our model
const user = mongoose.model('User', userSchema);
module.exports = user
