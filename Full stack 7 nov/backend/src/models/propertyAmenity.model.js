const mongoose = require('mongoose');

const AmenitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PropertyAmenity', AmenitySchema);
