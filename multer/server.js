const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// -----------------------------
// 1) MULTER STORAGE (optional)
// -----------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder must exist
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, unique + path.extname(file.originalname));
  }
});

// -----------------------------
// 2) FILE FILTER (extension validation)
// -----------------------------
function fileFilter(req, file, cb) {
  const allowed = [".jpg", ".jpeg", ".png", ".pdf"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowed.includes(ext)) {
    return cb(new Error("Invalid file type. Only JPG, PNG, PDF allowed"));
  }

  cb(null, true);
}

// -----------------------------
// 3) MULTER UPLOAD CONFIG
// -----------------------------
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 1 // 1MB size limit
  }
});

// -----------------------------
// 4) ROUTE
// -----------------------------
app.post("/upload", upload.single("myfile"), (req, res) => {
  return res.json({
    success: true,
    message: "File uploaded successfully",
    file: req.file
  });
});

// -----------------------------
// 5) GLOBAL ERROR HANDLER
// -----------------------------
app.use((err, req, res, next) => {
  // Multer size limit error
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large. Max 1MB allowed."
      });
    }
    return res.status(400).json({ success: false, message: err.message });
  }

  // Extension or custom errors
  return res.status(400).json({
    success: false,
    message: err.message || "Something went wrong"
  });
});

// -----------------------------
// 6) START SERVER
// -----------------------------
app.listen(3000, () => console.log("Server running on port 3000"));
