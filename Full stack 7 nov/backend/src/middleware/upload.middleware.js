const multer = require('multer');
const path = require('path');
const fs = require('fs');

const UPLOAD_DIR = process.env.FILE_UPLOAD_LOCAL_PATH || './uploads';
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}_${Math.random().toString(36).slice(2)}${ext}`);
  }
});

const brochureFileFilter = (req, file, cb) => {
  const mimetypes = ['application/pdf'];
  if (mimetypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Brochure must be a PDF'), false);
};

const photoFileFilter = (req, file, cb) => {
  const mimetypes = ['image/jpeg', 'image/png'];
  if (mimetypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Photos must be JPG/PNG'), false);
};

const uploadProperty = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_PHOTO_SIZE || '3145728', 10) // limit per file; brochure limit enforced later
  }
});

module.exports = { uploadProperty, brochureFileFilter, photoFileFilter };
