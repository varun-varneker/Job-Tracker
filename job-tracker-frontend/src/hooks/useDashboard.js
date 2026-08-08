import { useQuery } from "@tanstack/react-query";

import { getDashboard } from "../api/dashboardApi";
import useAuth from "./useAuth";

export default function useDashboard() {
  const { user, loading } = useAuth();

  return useQuery({
    queryKey: ["dashboard", user?.id],

    queryFn: getDashboard,

    enabled: !loading && !!user?.id,

    staleTime: 1000 * 60 * 5,
  });
}