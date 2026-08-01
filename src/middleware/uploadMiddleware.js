import multer from "multer";
import path from "path";
import fs from "fs";

// Create uploads/resumes folder if it doesn't exist
const uploadPath = "uploads/resumes";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName + path.extname(file.originalname)
    );
  },
});

// Accept only PDF files
const fileFilter = (req, file, cb) => {
  if (file.mimetype !== "application/pdf") {
    return cb(
      new Error("Only PDF resumes are allowed."),
      false
    );
  }

  cb(null, true);
};

// Upload middleware
const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

export default upload;