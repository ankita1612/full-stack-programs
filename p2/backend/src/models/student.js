import mongoose from 'mongoose';
const educationSchema = new mongoose.Schema({
  name: {
    type: String,    
  },
  collage: {
    type: String,
  },
  year: {
    type: Number,
  },
})
const StudentSchema = new mongoose.Schema({
  name: {
    type: String,    
  },
  email: {
    type: String,
  },
  age: {
    type: Number,    
  },
  mandatory_image:{
     type: String,
  },
  optional_image:{
     type: String,
  },
  multi_image:{
    type: [String]
  },
  skills:{
    type:[String]
  },
  educations:{
    type:[educationSchema]
  }
});

const Student = mongoose.model( 'student', StudentSchema);
export default Student;