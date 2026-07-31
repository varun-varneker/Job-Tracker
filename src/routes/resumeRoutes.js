import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
  setDefaultResume,
} from "../controllers/resumeController.js";

const router = express.Router();
console.log("Resume routes loaded");

router.use(protect);

router.post("/", createResume);
router.get("/", getResumes);
router.get("/:id", getResumeById);
router.patch("/:id",updateResume);
router.patch("/:id/default", setDefaultResume);
router.delete("/:id", deleteResume);

export default router;