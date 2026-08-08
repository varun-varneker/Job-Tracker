import { cn } from "../../lib/utils";

const variants = {
  default: "bg-slate-100 text-slate-700",
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
  yellow: "bg-yellow-100 text-yellow-700",
  red: "bg-red-100 text-red-700",
  purple: "bg-purple-100 text-purple-700",
  orange: "bg-orange-100 text-orange-700",
};

const statusVariants = {
  APPLIED: "bg-blue-100 text-blue-700",
  INTERVIEW: "bg-purple-100 text-purple-700",
  OFFER: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  ASSESSMENT: "bg-yellow-100 text-yellow-700",
  HR_ROUND: "bg-orange-100 text-orange-700",
  ARCHIVED: "bg-slate-100 text-slate-600",
};

export default function Badge({
  children,
  variant = "default",
  status,
  className,
}) {
  const statusStyle = status
    ? statusVariants[status] || variants.default
    : variants[variant] || variants.default;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1",
        "text-xs font-medium whitespace-nowrap",
        statusStyle,
        className
      )}
    >
      {children}
    </span>
  );
}