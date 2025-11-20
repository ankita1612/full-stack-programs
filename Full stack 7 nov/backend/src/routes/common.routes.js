const express = require("express");
const multer  = require('multer')
const path = require("path");

// Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/myphoto/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  }
});

// File Filter (Extension Validation)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png/; // allowed extensions

  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);

  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg, .jpeg, .png files allowed!"));
  }
};

// Multer Upload Setup (Size + Filter)
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 1 }, // 1 MB limit
  fileFilter: fileFilter
});
const {
    uploadSingleFile,
    uploadMultiple,
    uploadMultipleNameFile
    
} = require("../controllers/extraController");
const router = express.Router();

router.post("/uploadSingleFile",  upload.single('my_photo',1), uploadSingleFile);
 router.post("/uploadMultiple",  upload.array('my_photo', 10), uploadMultiple);
 router.post("/uploadMultipleNameFile",  upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 2 }]), uploadMultipleNameFile);

module.exports = router;
