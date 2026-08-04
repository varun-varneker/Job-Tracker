import DashboardLayout from "../layouts/DashboardLayout";

import DashboardStats from "../components/dashboard/DashboardStats";
import StatusChart from "../components/dashboard/StatusChart";
import ResumeUsageChart from "../components/dashboard/ResumeUsageChart";
import RecentJobs from "../components/dashboard/RecentJobs";

export default function Dashboard() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Welcome back! Here's your application overview.
          </p>
        </div>

        <DashboardStats />

        <div className="grid gap-6 lg:grid-cols-2">

          <StatusChart />

          <ResumeUsageChart />

        </div>

        <RecentJobs />

      </div>

    </DashboardLayout>
  );
}