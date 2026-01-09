const mongoose = require("mongoose")
const empSchema = new mongoose.Schema({
  name: String,
  salary: Number,
  email: String,
  status :String,
  desc:String

},{timestamps:true});
empSchema.virtual('fullName').get(function () {
  return `${this.fname} ${this.lname}`;
});

//it add globally
  //  empSchema.set('toJSON', { virtuals: true });
  // empSchema.set('toObject', { virtuals: true });
module.exports = mongoose.model('employee', empSchema);