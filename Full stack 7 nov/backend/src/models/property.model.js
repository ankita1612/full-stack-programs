const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  property_name: { type: String, required: true, index: true },
  property_owner_email: { type: String, required: true, index: true },
  property_detail: { type: String, required: true },
  property_type: { type: String, enum: ['Residential', 'Commercial'], required: true },
  property_size: { type: String, enum: ['2 BHK', '3 BHK'] },
  property_owner: { type: String, enum: ['ankita', 'maulik', 'jenil'], required: true },
  property_address: { type: String },
  property_brochure_url: { type: String },
  property_photos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PropertyPhoto' }],
  property_amenities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PropertyAmenity' }], // 👈 reference here
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  created_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

module.exports = mongoose.model('Property', PropertySchema);
