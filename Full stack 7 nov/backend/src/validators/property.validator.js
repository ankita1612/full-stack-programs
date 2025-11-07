const { body } = require('express-validator');

exports.validatePropertyCreate = [
  body('property_name').notEmpty().withMessage('property_name required'),
  body('property_owner_email').isEmail().withMessage('Valid owner email required'),
  body('property_detail').notEmpty().withMessage('property_detail required'),
  body('property_type').isIn(['Residential', 'Commercial']).withMessage('Invalid property_type'),
  body('property_owner').isIn(['ankita', 'maulik', 'jenil']).withMessage('Invalid property_owner'),
  body('property_size').custom((v, { req }) => {
    if (req.body.property_type === 'Residential' && !v) {
      throw new Error('property_size required for Residential');
    }
    if (v && !['2 BHK', '3 BHK'].includes(v)) {
      throw new Error('Invalid property_size');
    }
    return true;
  })
];

exports.validatePropertyUpdate = [
  body('property_name').notEmpty().withMessage('property_name cannot be empty'),
  body('property_owner_email').isEmail().withMessage('property_owner_email must be a valid email'),
  body('property_detail').optional().isString().withMessage('property_detail must be a string'),
  body('property_type').isIn(['Residential', 'Commercial']).withMessage('property_type must be Residential or Commercial'),
  body('property_size')
    .optional()
    .custom((value, { req }) => {
      if (req.body.property_type === 'Residential' && !value) {
        throw new Error('property_size is required when property_type is Residential');
      }
      if (value && !['2 BHK', '3 BHK'].includes(value)) {
        throw new Error('property_size must be 2 BHK or 3 BHK');
      }
      return true;
    }),

  body('property_owner').isIn(['ankita', 'maulik', 'jenil']).withMessage('property_owner must be one of ankita, maulik, jenil'),
  body('property_address').optional().isString().withMessage('property_address must be a string'),
  body('status').optional().isIn(['Active', 'Inactive']).withMessage('status must be Active or Inactive'),
  // property_amenities: optional array of ObjectIds
  body('property_amenities').optional(),

  ];