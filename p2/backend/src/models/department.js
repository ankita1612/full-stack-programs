import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const deptSchema = new Schema({
   name: String,
   status: String   
});
const Department = mongoose.model("department", deptSchema);

export default Department