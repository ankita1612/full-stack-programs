
exports.uploadSingleFile = async (req, res) => {
  try {
    console.log("FILE RECEIVED:", req.file); ////not req.files as single file

    res.json({
      success: true,
      message: "File uploaded successfully",
      file: req.file
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);

    res.status(400).json({
      success: false,
      message: err.message || "File upload failed",
    });
  }
};


exports.uploadMultiple = async (req, res) => {
    console.log("FILE RECEIVED:", req.files);//not req.file
    res.send(req.files)
}

exports.uploadMultipleNameFile = async (req, res) => {
    console.log("FILE RECEIVED:", req.files); //not req.file
    res.send(req.files)
}
