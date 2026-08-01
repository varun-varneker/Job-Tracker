import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { uploadResume } from "../controllers/uploadController.js";

const router = express.Router();

router.use(protect);

/*
========================
UPLOAD RESUME
========================
*/

router.post(
  "/resume",
  upload.single("resume"),
  uploadResume
);

export default router;