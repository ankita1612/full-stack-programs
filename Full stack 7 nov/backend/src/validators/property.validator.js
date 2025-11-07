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
