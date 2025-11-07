const mongoose = require('mongoose');
const Property = require('../models/property.model');
const PropertyPhoto = require('../models/propertyPhoto.model');
const PropertyAmenity = require('../models/propertyAmenity.model'); 
const fs = require('fs');
const path = require('path');

const UPLOAD_DIR = process.env.FILE_UPLOAD_LOCAL_PATH || './uploads';
const MAX_BROCHURE = parseInt(process.env.MAX_BROCHURE_SIZE || '5242880', 10);

exports.listProperties = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '10', 10);
    const search = req.query.search || '';
    const sortBy = req.query.sort || 'created_at';
    const order = req.query.order === 'desc' ? -1 : 1;

    const filter = { status: 'Active' };
    if (search) {
      filter.$or = [
        { property_name: { $regex: search, $options: 'i' } },
        { property_owner_email: { $regex: search, $options: 'i' } }
      ];
    }

    const total = await Property.countDocuments(filter);
    const data = await Property.find(filter)
      .sort({ [sortBy]: order })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('property_photos');

    res.json({ success: true, data, meta: { total, page, limit } });
  } catch (err) {
    next(err);
  }
};

exports.createProperty = async (req, res) => {
  try {
    const { body, files } = req;

    // Parse and convert amenities
    let property_amenities = body.property_amenities;
    if (typeof property_amenities === 'string') {
      try {
        property_amenities = JSON.parse(property_amenities);
      } catch (err) {
        property_amenities = property_amenities.split(',').map(id => id.trim());
      }
    }
    if (!Array.isArray(property_amenities)) property_amenities = [];

    property_amenities = property_amenities.map(id => new mongoose.Types.ObjectId(id));

    // Create property
    const property = await Property.create({
      property_name: body.property_name,
      property_owner_email: body.property_owner_email,
      property_detail: body.property_detail,
      property_type: body.property_type,
      property_size: body.property_type === 'Residential' ? body.property_size : undefined,
      property_owner: body.property_owner,
      property_address: body.property_address,
      property_brochure_url: files?.property_brochure?.[0]
        ? `/uploads/${path.basename(files.property_brochure[0].path)}`
        : null,
      property_amenities: property_amenities, // ✅ correct variable
    });

    // Handle photos
    const savedPhotos = [];
    const photos = files?.property_photos || [];

    for (const p of photos) {
      const photo = await PropertyPhoto.create({
        property_id: property._id,
        image_url: `/uploads/${path.basename(p.path)}`,
      });
      savedPhotos.push(photo._id);
    }

    property.property_photos = savedPhotos;
    await property.save();

    res.status(201).json({ success: true, property });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getProperty = async (req, res, next) => {
  try {
    const p = await Property.findById(req.params.id).populate('property_photos');
    if (!p) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: p });
  } catch (err) {
    next(err);
  }
};

exports.updateProperty = async (req, res, next) => {
  try {
    // Partial update - only fields provided
    const updates = { ...req.body };
    const property = await Property.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!property) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: property });
  } catch (err) {
    next(err);
  }
};

exports.replaceProperty = async (req, res, next) => {
  try {
    // Full replace (PUT) - ensure required fields
    const required = ['property_name', 'property_owner_email', 'property_detail', 'property_type', 'property_owner'];
    for (const k of required) {
      if (!req.body[k]) return res.status(400).json({ success: false, message: `${k} required` });
    }
    const updates = { ...req.body };
    const property = await Property.findOneAndUpdate({ _id: req.params.id }, updates, { new: true, overwrite: true });
    if (!property) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: property });
  } catch (err) {
    next(err);
  }
};

exports.deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, { status: 'Inactive', deleted_at: new Date() }, { new: true });
    if (!property) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
