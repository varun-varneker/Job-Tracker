import prisma from "../config/database.js";
import ApiError from "../utils/ApiError.js";

/*
========================
CREATE RESUME
========================
*/

export const createResumeService = async (userId, data) => {
  const {
    displayName,
    fileName,
    fileUrl,
    fileSize,
    mimeType,
  } = data;

  if (
    !displayName ||
    !fileName ||
    !fileUrl ||
    !fileSize ||
    !mimeType
  ) {
    // ⭐ CHANGED
    throw new ApiError(400, "All fields are required.");
  }

  const resume = await prisma.resume.create({
    data: {
      displayName,
      fileName,
      fileUrl,
      fileSize,
      mimeType,
      userId,
    },
  });

  return resume;
};

/*
========================
GET ALL RESUMES
========================
*/

export const getResumesService = async (userId) => {
  // Get the user's default resume
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      defaultResumeId: true,
    },
  });

  // Get all resumes
  const resumes = await prisma.resume.findMany({
    where: {
      userId,
    },

    select: {
      id: true,
      displayName: true,
      fileName: true,
      fileUrl: true,
      fileSize: true,
      mimeType: true,
      createdAt: true,
      updatedAt: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  // Add isDefault property
  const formattedResumes = resumes.map((resume) => ({
    ...resume,
    isDefault: resume.id === user.defaultResumeId,
  }));

  return formattedResumes;
};

/*
========================
GET SINGLE RESUME BY ID
========================
*/

export const getResumeByIdService = async (userId, resumeId) => {
  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId,
    },

    select: {
      id: true,
      displayName: true,
      fileName: true,
      fileUrl: true,
      fileSize: true,
      mimeType: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!resume) {
    // ⭐ CHANGED
    throw new ApiError(404, "Resume not found");
  }

  // Get user's default resume
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      defaultResumeId: true,
    },
  });

  return {
    ...resume,
    isDefault: resume.id === user.defaultResumeId,
  };
};

/*
========================
UPDATE RESUME
========================
*/

export const updateResumeService = async (
  userId,
  resumeId,
  displayName
) => {
  // Check ownership
  const existingResume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId,
    },
  });

  if (!existingResume) {
    // ⭐ CHANGED
    throw new ApiError(404, "Resume not found");
  }

  const updatedResume = await prisma.resume.update({
    where: {
      id: resumeId,
    },

    data: {
      displayName,
    },

    select: {
      id: true,
      displayName: true,
      fileName: true,
      fileUrl: true,
      fileSize: true,
      mimeType: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updatedResume;
};

/*
========================
DELETE RESUME
========================
*/

export const deleteResumeService = async (userId, resumeId) => {
  // Check ownership
  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId,
    },
    include: {
      jobs: true,
    },
  });

  if (!resume) {
    // ⭐ CHANGED
    throw new ApiError(404, "Resume not found");
  }

  // Prevent deletion if resume is used by jobs
  if (resume.jobs.length > 0) {
    // ⭐ CHANGED
    throw new ApiError(
      409,
      "Cannot delete this resume because it is linked to one or more job applications."
    );
  }

  await prisma.resume.delete({
    where: {
      id: resumeId,
    },
  });

  return;
};

/*
========================
SET DEFAULT RESUME
========================
*/

export const setDefaultResumeService = async (userId, resumeId) => {
  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId,
    },
  });

  if (!resume) {
    // ⭐ CHANGED
    throw new ApiError(404, "Resume not found");
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      defaultResumeId: resumeId,
    },
  });

  return {
    ...resume,
    isDefault: true,
  };
};