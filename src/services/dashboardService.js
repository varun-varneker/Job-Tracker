import prisma from "../config/database.js";

/*
========================
DASHBOARD ANALYTICS
========================
*/

export const getDashboardService = async (userId) => {
  // Statistics
  const totalJobs = await prisma.job.count({
    where: { userId },
  });

  const applied = await prisma.job.count({
    where: {
      userId,
      status: "APPLIED",
    },
  });

  const interview = await prisma.job.count({
    where: {
      userId,
      status: "INTERVIEW",
    },
  });

  const offer = await prisma.job.count({
    where: {
      userId,
      status: "OFFER",
    },
  });

  const rejected = await prisma.job.count({
    where: {
      userId,
      status: "REJECTED",
    },
  });

  // Recent Jobs
  const recentJobs = await prisma.job.findMany({
    where: {
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

    orderBy: {
      createdAt: "desc",
    },

    take: 5,
  });

  // Status Distribution
  const statusDistribution = await prisma.job.groupBy({
    by: ["status"],

    where: {
      userId,
    },

    _count: {
      status: true,
    },
  });

  // Resume Usage
  const resumeUsage = await prisma.resume.findMany({
    where: {
      userId,
    },

    select: {
      id: true,
      displayName: true,
      _count: {
        select: {
          jobs: true,
        },
      },
    },
  });

  return {
    statistics: {
      totalJobs,
      applied,
      interview,
      offer,
      rejected,
    },

    recentJobs,

    statusDistribution: statusDistribution.map((item) => ({
      status: item.status,
      count: item._count.status,
    })),

    resumeUsage: resumeUsage.map((resume) => ({
      resumeId: resume.id,
      displayName: resume.displayName,
      count: resume._count.jobs,
    })),
  };
};