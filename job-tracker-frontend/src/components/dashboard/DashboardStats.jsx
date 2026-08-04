import {
  BriefcaseBusiness,
  Send,
  CalendarClock,
  BadgeCheck,
  CircleX,
} from "lucide-react";

import StatCard from "./StatCard";
import useDashboard from "../../hooks/useDashboard";

export default function DashboardStats() {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-40 animate-pulse rounded-xl bg-slate-200"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-300 bg-red-50 p-6 text-red-600">
        Failed to load dashboard data.
      </div>
    );
  }

  const stats = data.statistics;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

      <StatCard
        title="Total Jobs"
        value={stats.totalJobs}
        icon={BriefcaseBusiness}
        color="bg-blue-600"
      />

      <StatCard
        title="Applied"
        value={stats.applied}
        icon={Send}
        color="bg-cyan-600"
      />

      <StatCard
        title="Interview"
        value={stats.interview}
        icon={CalendarClock}
        color="bg-amber-500"
      />

      <StatCard
        title="Offer"
        value={stats.offer}
        icon={BadgeCheck}
        color="bg-green-600"
      />

      <StatCard
        title="Rejected"
        value={stats.rejected}
        icon={CircleX}
        color="bg-red-600"
      />

    </div>
  );
}