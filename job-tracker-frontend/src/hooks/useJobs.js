import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from "../api/jobApi";

import toast from "react-hot-toast";
import useAuth from "./useAuth";

/*
========================
GET JOBS
========================
*/

export function useJobs() {
  const { user, loading } = useAuth();

  return useQuery({
    queryKey: ["jobs", user?.id],

    queryFn: getJobs,

    enabled: !loading && !!user?.id,
  });
}

/*
========================
CREATE JOB
========================
*/

export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createJob,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      toast.success("Job created successfully");
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create job");
    },
  });
}

/*
========================
UPDATE JOB
========================
*/

export function useUpdateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateJob,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      toast.success("Job updated successfully");
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update job");
    },
  });
}

/*
========================
DELETE JOB
========================
*/

export function useDeleteJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJob,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      toast.success("Job deleted successfully");
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete job");
    },
  });
}