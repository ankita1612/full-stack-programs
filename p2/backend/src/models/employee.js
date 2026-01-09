import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const empSchema = new Schema({
   name: String,
   email: String,
   department: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "department"
   }    
});
const Employee = mongoose.model("employee", empSchema);
export default Employee

