import mongoose from 'mongoose';

const connectDB = async () => {
  try {
     await mongoose.connect('mongodb://localhost:27017/p2');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
   }
}
export default connectDB;