import asyncHandler from "../utils/asyncHandler.js"; // ⭐ NEW

import {
  createResumeService,
  getResumesService,
  getResumeByIdService,
  updateResumeService,
  deleteResumeService,
  setDefaultResumeService,
} from "../services/resumeService.js";

/*
========================
CREATE RESUME
========================
*/

export const createResume = asyncHandler(async (req, res) => {
  const resume = await createResumeService(req.user.id, req.body);

  res.status(201).json({
    success: true, // ⭐ NEW
    message: "Resume created successfully",
    resume,
  });
});

/*
========================
GET ALL RESUMES
========================
*/

export const getResumes = asyncHandler(async (req, res) => {
  const resumes = await getResumesService(req.user.id);

  res.status(200).json({
    success: true, // ⭐ NEW
    totalResumes: resumes.length,
    resumes,
  });
});

/*
========================
GET SINGLE RESUME
========================
*/

export const getResumeById = asyncHandler(async (req, res) => {
  const resume = await getResumeByIdService(
    req.user.id,
    req.params.id
  );

  res.status(200).json({
    success: true, // ⭐ NEW
    resume,
  });
});

/*
========================
UPDATE RESUME
========================
*/

export const updateResume = asyncHandler(async (req, res) => {
  const { displayName } = req.body;

  const updatedResume = await updateResumeService(
    req.user.id,
    req.params.id,
    displayName
  );

  res.status(200).json({
    success: true, // ⭐ NEW
    message: "Resume updated successfully",
    resume: updatedResume,
  });
});

/*
========================
DELETE RESUME
========================
*/

export const deleteResume = asyncHandler(async (req, res) => {
  await deleteResumeService(
    req.user.id,
    req.params.id
  );

  res.status(200).json({
    success: true, // ⭐ NEW
    message: "Resume deleted successfully",
  });
});

/*
========================
SET DEFAULT RESUME
========================
*/

export const setDefaultResume = asyncHandler(async (req, res) => {
  const resume = await setDefaultResumeService(
    req.user.id,
    req.params.id
  );

  res.status(200).json({
    success: true, // ⭐ NEW
    message: "Default resume updated successfully",
    defaultResume: resume,
  });
});