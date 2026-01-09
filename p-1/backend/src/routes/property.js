const express = require('express');
const Property = require('../models/property');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const {  validateAdd,isRequestValidated, validateEdit} = require("../validators/property");

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 } // 1MB file size limit
});
router.post(
  "/",
  upload.fields([
    { name: "optional_image", maxCount: 1 },
    { name: "single_image", maxCount: 1 },
    { name: "multi_image", maxCount: 5 },
  ]),
  validateAdd,
  isRequestValidated,
  async (req, res) => {
    try {
      const { name, desc, stock } = req.body;

      // console.log(typeof req.body.amenities)
      // return res.json({body:req.body,len:typeof req.body.amenities});
      // ✅ Mandatory file checks
      if (!req.files?.single_image) {
        return res.status(200).json({ message: "single_image is required" });
      }

      // if (!req.files?.multi_image || req.files.multi_image.length === 0) {
      //   return res.status(200).json({ message: "multi_image is required" });
      // }

      // ✅ Extract filenames
      const singleImage = req.files.single_image[0].filename;
      const optionalImage = req.files.optional_image? req.files.optional_image[0].filename: null;
      //const multiImages = req.files.multi_image.map((file) => file.filename);

      const property = await Property.create({
        name,
        desc,
        stock,
        single_image: singleImage,
        amenities : req.body.amenities
        // optional_image: optionalImage,
        // multi_image: multiImages,
      });

      res.status(200).json({message: "Property created successfully",success: true,data: property,files: req.files, 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({success: false, message:"something wrong", error: error.stack });
    }
  }
);
// const storage = multer.diskStorage({
//   destination: './uploads/',
//   filename: function(req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 } // 1MB file size limit
// }).single('single_image'); 

// router.post('/',upload, validateAdd,isRequestValidated, async (req, res) => {
//   const { name, desc, stock } = req.body;
//   try {
//       const property = await Property.create({
//         "name":name,
//         "desc":  desc,
//         "stock":  stock,    
//         "single_image": req.file ? req.file.filename : ''
//        })
//       res.send({"data":property,"file":req.file});
//   } catch (error) {
//       console.error(error);
//       res.status(500).send(error);
//   }
// });

// Get all users
router.get('/', async (req, res) => {
  try {
    const property = await Property.find({});
    const baseUrl = `${req.protocol}://${req.get('host')}`;    
    res.status(200).json({success:true,data:property});
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({error});
  }
});
// Get all users
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);
    res.status(200).json({success:true,data:property});
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({error});
  }
});
router.get('/check_name/:name', async (req, res) => {
  try {
   const { name } = req.params;
    
    const property = await Property.countDocuments({name:name})

    res.status(200).json({success:true,data:property});
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({error});
  }
});
// Update a user
router.put('/:id',validateEdit,isRequestValidated , async (req, res) => {
  const { id } = req.params;
  const { name, desc} = req.body;

  try {
    const user = await Property.findByIdAndUpdate(id, { name, desc }, { new: true });
    res.send(user);
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).send(error);
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Property.findByIdAndDelete(id);
    return res.status(200).send({"message":"Record successfully deleted",success:true});
  } catch (error) {
    return res.status(500).send({"error":error.stack,"message":"Something wrong",success:false});        
  }
});

module.exports = router;