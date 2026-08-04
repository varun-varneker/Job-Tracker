import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import useDashboard from "../../hooks/useDashboard";

export default function ResumeUsageChart() {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) {
    return (
      <div className="h-96 animate-pulse rounded-xl bg-slate-200" />
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 p-6 text-red-600">
        Failed to load resume usage.
      </div>
    );
  }

  const chartData = data.resumeUsage;

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Resume Usage
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="displayName"
              tick={{ fontSize: 12 }}
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="count"
              radius={[6, 6, 0, 0]}
              fill="#2563EB"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}