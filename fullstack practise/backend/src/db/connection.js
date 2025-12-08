const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/propertydb");
  console.log('MongoDB connected');
};
console.log("++x")

module.exports = connectDB;