const mongoose = require('mongoose');

const propertyAmenitySchema = new mongoose.Schema({
   property_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
  amenity_id: {  
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Amenity',
    required: true, 
  },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PropertyAmenity', propertyAmenitySchema);
