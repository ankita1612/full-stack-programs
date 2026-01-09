import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  hobby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hobby"   // 🔑 must match model name
  }
});

const Admin = mongoose.model("admin", adminSchema);
export default Admin;
