import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

const router = express.Router();

/*
========================
PROTECTED ROUTES
========================
*/

router.use(protect);

/*
========================
JOB ROUTES
========================
*/

// Create Job
router.post("/", createJob);

// Get All Jobs
router.get("/", getJobs);

// Get Single Job
router.get("/:id", getJobById);

// Update Job
router.patch("/:id", updateJob);

// Delete Job
router.delete("/:id", deleteJob);

export default router;