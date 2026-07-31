import prisma from "../config/database.js";

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
    throw new Error("All fields are required.");
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