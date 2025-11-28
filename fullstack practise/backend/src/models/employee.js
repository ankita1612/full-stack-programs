const mongoose = require("mongoose")
const empSchema = new mongoose.Schema({
  name: String,
  salary: Number,
  email: String,
  status :String,
  desc:String

},{timestamps:true});

module.exports = mongoose.model('employee', empSchema);