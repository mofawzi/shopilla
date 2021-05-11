import express from "express";
import path from "path";
import multer from "multer";

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
  // Save image(s) to uploads folder
  destination(req, file, callback) {
    callback(null, "uploads/");
  },
  // Create the image with a unique name
  filename(req, file, callback) {
    callback(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, callback) {
  // Allowed image extensions
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return callback(null, true);
  } else {
    // Error: Image extension is not valid
    callback("Images Only");
  }
}

// The upload Middleware
const upload = multer({
  storage,
  fileFilter: function (req, file, callback) {
    checkFileType(file, callback);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
