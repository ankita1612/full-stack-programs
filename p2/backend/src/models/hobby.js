import mongoose from "mongoose";

const hobbySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: String
});

const Hobby = mongoose.model("hobby", hobbySchema);
export default Hobby;
