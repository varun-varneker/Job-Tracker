import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

/*
========================
UPLOAD RESUME
========================
*/

export const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Please upload a PDF resume.");
  }

  const file = {
    originalFileName: req.file.originalname,
    storedFileName: req.file.filename,
    fileUrl: `/uploads/resumes/${req.file.filename}`,
    fileSize: req.file.size,
    mimeType: req.file.mimetype,
};

  res.status(201).json({
    success: true,
    message: "Resume uploaded successfully",
    file,
  });
});