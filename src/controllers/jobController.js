import prisma from "../config/database.js";
import {
    getJobsService,
    createJobService
} from "../services/jobService.js";

/*
========================
  CREATE JOB
========================
*/

export const createJob = async (req, res) => {
  try {
    const job = await createJobService(req.user.id, req.body);

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.error("Create job error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/*
========================
  GET ALL JOBS
========================
*/

export const getJobs = async (req, res) => {
  try {
    const result = await getJobsService(req.user.id, req.query);

    res.json(result);
  } catch (error) {
    console.error("Get jobs error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/*
========================
  UPDATE JOB
========================
*/

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const existingJob = await prisma.job.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!existingJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    const updatedJob = await prisma.job.update({
      where: { id },
      data: req.body,
    });

    res.json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error("Update job error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/*
========================
  DELETE JOB
========================
*/

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const existingJob = await prisma.job.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!existingJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    await prisma.job.delete({
      where: { id },
    });

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Delete job error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};