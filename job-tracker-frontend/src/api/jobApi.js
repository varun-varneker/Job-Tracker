import api from "./axios";

export const getJobs = async () => {
  const { data } = await api.get("/jobs");
  return data;
};

export const getJobById = async (id) => {
  const { data } = await api.get(`/jobs/${id}`);
  return data;
};

export const createJob = async (jobData) => {
  const { data } = await api.post("/jobs", jobData);
  return data;
};

export const updateJob = async ({ id, jobData }) => {
  const { data } = await api.patch(`/jobs/${id}`, jobData);
  return data;
};

export const deleteJob = async (id) => {
  const { data } = await api.delete(`/jobs/${id}`);
  return data;
};