const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const propertyController = require('../controllers/property.controller');
const { uploadProperty } = require('../middleware/upload.middleware');
const { validatePropertyCreate } = require('../validators/property.validator');
const validate = require('../middleware/validate.middleware');

// Public listing (only active)
router.get('/', propertyController.listProperties);
//get http://localhost:8000/property

// Protected endpoints
router.post(
  '/',
  auth,
  uploadProperty.fields([
    { name: 'property_brochure', maxCount: 1 },
    { name: 'property_photos', maxCount: 10 }
  ]),
  validatePropertyCreate,
  validate,
  propertyController.createProperty
);
//post : http://localhost:8000/property
router.get('/:id', propertyController.getProperty);
router.patch('/:id', auth, propertyController.updateProperty);
router.put('/:id', auth, propertyController.replaceProperty);
router.delete('/:id', auth, propertyController.deleteProperty);

module.exports = router;
