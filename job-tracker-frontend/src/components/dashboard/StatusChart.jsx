import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import useDashboard from "../../hooks/useDashboard";

const COLORS = [
  "#3B82F6", // Applied
  "#F59E0B", // Interview
  "#22C55E", // Offer
  "#EF4444", // Rejected
];

export default function StatusChart() {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) {
    return (
      <div className="h-96 animate-pulse rounded-xl bg-slate-200" />
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 p-6 text-red-600">
        Failed to load chart.
      </div>
    );
  }

  const chartData = data.statusDistribution.map((item) => ({
  name: item.status,
  value: item.count,
}));

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Application Status
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}