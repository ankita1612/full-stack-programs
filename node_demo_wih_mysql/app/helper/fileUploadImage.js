const multer = require('multer');
const path = require('path');

// Set up storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); // Directory for saving files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Define file upload middleware
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        // Optional file validation (e.g., file type check)
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Only jpeg, png files are allow.'));
        }
        cb(null, true);
    }
});

// Export the upload function for use in routes
module.exports = upload;