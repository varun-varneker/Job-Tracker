import asyncHandler from "../utils/asyncHandler.js";

import {
  createJobService,
  getJobsService,
  getJobByIdService,
  updateJobService,
  deleteJobService,
} from "../services/jobService.js";

/*
========================
CREATE JOB
========================
*/

export const createJob = asyncHandler(async (req, res) => {
  const job = await createJobService(
    req.user.id,
    req.body
  );

  res.status(201).json({
    success: true,
    message: "Job created successfully",
    job,
  });
});

/*
========================
GET ALL JOBS
========================
*/

export const getJobs = asyncHandler(async (req, res) => {
  const result = await getJobsService(
    req.user.id,
    req.query
  );

  res.status(200).json({
    success: true,
    ...result,
  });
});

/*
========================
GET SINGLE JOB
========================
*/

export const getJobById = asyncHandler(async (req, res) => {
  const job = await getJobByIdService(
    req.user.id,
    req.params.id
  );

  res.status(200).json({
    success: true,
    job,
  });
});

/*
========================
UPDATE JOB
========================
*/

export const updateJob = asyncHandler(async (req, res) => {
  const job = await updateJobService(
    req.user.id,
    req.params.id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Job updated successfully",
    job,
  });
});

/*
========================
DELETE JOB
========================
*/

export const deleteJob = asyncHandler(async (req, res) => {
  await deleteJobService(
    req.user.id,
    req.params.id
  );

  res.status(200).json({
    success: true,
    message: "Job deleted successfully",
  });
});