import prisma from "../config/database.js";
import ApiError from "../utils/ApiError.js";

/*
========================
CREATE JOB
========================
*/

export const createJobService = async (userId, jobData) => {
  const {
    title,
    company,
    status,
    appliedDate,
    notes,
    jobUrl,
    source,
    resumeId,
  } = jobData;

  if (!title || !company) {
    throw new ApiError(400, "Title and company are required.");
  }

  let selectedResumeId = resumeId;

  // If no resume selected, use default resume
  if (!selectedResumeId) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        defaultResumeId: true,
      },
    });

    selectedResumeId = user?.defaultResumeId || null;
  }

  // Validate resume ownership
  if (selectedResumeId) {
    const resume = await prisma.resume.findFirst({
      where: {
        id: selectedResumeId,
        userId,
      },
    });

    if (!resume) {
      throw new ApiError(404, "Selected resume not found.");
    }
  }

  const job = await prisma.job.create({
    data: {
      title,
      company,
      status,
      appliedDate: appliedDate ? new Date(appliedDate) : null,
      notes,
      jobUrl,
      source,
      resumeId: selectedResumeId,
      userId,
    },

    include: {
      resume: {
        select: {
          id: true,
          displayName: true,
        },
      },
    },
  });

  return job;
};

/*
========================
GET ALL JOBS
========================
*/

export const getJobsService = async (userId, query) => {
  const {
    status,
    page = 1,
    limit = 10,
    search,
  } = query;

  const filters = {
    userId,
  };

  if (status) {
    filters.status = status;
  }

  if (search) {
    filters.OR = [
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        company: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  const totalJobs = await prisma.job.count({
    where: filters,
  });

  const jobs = await prisma.job.findMany({
    where: filters,

    include: {
      resume: {
        select: {
          id: true,
          displayName: true,
        },
      },
    },

    skip: (Number(page) - 1) * Number(limit),

    take: Number(limit),

    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    totalJobs,
    totalPages: Math.ceil(totalJobs / Number(limit)),
    currentPage: Number(page),
    jobs,
  };
};

/*
========================
GET SINGLE JOB
========================
*/

export const getJobByIdService = async (
  userId,
  jobId
) => {
  const job = await prisma.job.findFirst({
    where: {
      id: jobId,
      userId,
    },

    include: {
      resume: {
        select: {
          id: true,
          displayName: true,
        },
      },
    },
  });

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  return job;
};

/*
========================
UPDATE JOB
========================
*/

export const updateJobService = async (
  userId,
  jobId,
  data
) => {

  const existingJob = await prisma.job.findFirst({
    where: {
      id: jobId,
      userId,
    },
  });

  if (!existingJob) {
    throw new ApiError(404, "Job not found");
  }

  if (data.resumeId) {
    const resume = await prisma.resume.findFirst({
      where: {
        id: data.resumeId,
        userId,
      },
    });

    if (!resume) {
      throw new ApiError(
        404,
        "Selected resume not found."
      );
    }
  }

  const updatedJob = await prisma.job.update({
     where: {
       id: jobId,
      },

  data: {
    ...data,
    appliedDate: data.appliedDate
      ? new Date(data.appliedDate)
      : null,
  },

  include: {
    resume: {
      select: {
        id: true,
        displayName: true,
      },
    },
  },
});

  return updatedJob;
};

/*
========================
DELETE JOB
========================
*/

export const deleteJobService = async (
  userId,
  jobId
) => {

  const existingJob = await prisma.job.findFirst({
    where: {
      id: jobId,
      userId,
    },
  });

  if (!existingJob) {
    throw new ApiError(404, "Job not found");
  }

  await prisma.job.delete({
    where: {
      id: jobId,
    },
  });

  return;
};