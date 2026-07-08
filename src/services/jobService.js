import prisma from "../config/database.js";

export const getJobsService = async (userId, query) => {
  const { status, page = 1, limit = 10, search } = query;

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
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: {
      createdAt: "desc",
    },
    include: {
      resumes: {
        select: {
          id: true,
          fileName: true,
          fileUrl: true,
          uploadedAt: true,
        },
      },
    },
  });

  return {
    totalJobs,
    totalPages: Math.ceil(totalJobs / Number(limit)),
    currentPage: Number(page),
    jobs,
  };
};