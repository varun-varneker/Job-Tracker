import { Link } from "react-router-dom";
import useDashboard from "../../hooks/useDashboard";

export default function RecentJobs() {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="h-60 animate-pulse rounded-lg bg-slate-200"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 p-6 text-red-600">
        Failed to load recent jobs.
      </div>
    );
  }

  const jobs = data?.recentJobs || [];

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-semibold">
          Recent Jobs
        </h2>

        <Link
          to="/jobs"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View All
        </Link>

      </div>

      {jobs.length === 0 ? (
        <div className="py-12 text-center text-slate-500">
          No job applications yet.
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
            >
              <div>
                <h3 className="font-semibold">
                  {job.title}
                </h3>

                <p className="text-sm text-slate-500">
                  {job.company}
                </p>
              </div>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                {job.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}