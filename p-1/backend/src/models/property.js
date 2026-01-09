const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: String,
  desc: String,
  stock: Number,
  single_image:String,
  optional_image:String,
  multi_image: {
      type: [String], // ✅ ARRAY OF FILES
      
    },
  amenities:[String]
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;