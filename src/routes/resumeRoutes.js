import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createResume } from "../controllers/resumeController.js";

const router = express.Router();

router.use(protect);

router.post("/", createResume);

export default router;