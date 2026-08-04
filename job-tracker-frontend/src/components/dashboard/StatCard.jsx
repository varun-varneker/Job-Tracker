import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "bg-blue-500",
  change,
  changeType = "increase",
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl ${color}`}
        >
          <Icon className="text-white" size={28} />
        </div>

      </div>

      {/* Footer */}
      {change && (
        <div className="mt-5 flex items-center gap-2">

          {changeType === "increase" ? (
            <TrendingUp
              className="text-green-600"
              size={18}
            />
          ) : (
            <TrendingDown
              className="text-red-600"
              size={18}
            />
          )}

          <span
            className={`text-sm font-medium ${
              changeType === "increase"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {change}
          </span>

        </div>
      )}

    </div>
  );
}