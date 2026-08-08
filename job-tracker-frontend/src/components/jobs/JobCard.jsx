import {
  CalendarDays,
  ExternalLink,
  FileText,
  Pencil,
  Trash2,
} from "lucide-react";

import Card from "../ui/Card";
import Badge from "../ui/Badge";
import DropdownMenu from "../ui/DropdownMenu";

export default function JobCard({
  job,
  onEdit,
  onDelete,
}) {
  const formatDate = (date) => {
    if (!date) return "No date";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleOpenJob = () => {
    if (!job.jobUrl) return;

    window.open(
      job.jobUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Card
      padding="sm"
      hover
      className="group relative"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-slate-900">
            {job.title}
          </h3>

          <p className="mt-1 truncate text-sm text-slate-500">
            {job.company}
          </p>
        </div>

        <DropdownMenu
          items={[
            {
              label: "Edit",
              icon: <Pencil className="h-4 w-4" />,
              onClick: () => onEdit?.(job),
            },
            ...(job.jobUrl
              ? [
                  {
                    label: "Open Job",
                    icon: (
                      <ExternalLink className="h-4 w-4" />
                    ),
                    onClick: handleOpenJob,
                  },
                ]
              : []),
            {
              separator: true,
            },
            {
              label: "Delete",
              icon: (
                <Trash2 className="h-4 w-4" />
              ),
              danger: true,
              onClick: () => onDelete?.(job),
            },
          ]}
        />
      </div>

      {/* Status */}
      <div className="mt-3">
        <Badge status={job.status}>
          {formatStatus(job.status)}
        </Badge>
      </div>

      {/* Details */}
      <div className="mt-4 space-y-2">
        {job.appliedDate && (
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <CalendarDays className="h-3.5 w-3.5" />

            <span>
              Applied {formatDate(job.appliedDate)}
            </span>
          </div>
        )}

        {job.resume?.displayName && (
          <div className="flex min-w-0 items-center gap-2 text-xs text-slate-500">
            <FileText className="h-3.5 w-3.5 shrink-0" />

            <span className="truncate">
              {job.resume.displayName}
            </span>
          </div>
        )}
      </div>

      {/* Source */}
      {job.source && (
        <div className="mt-3 border-t border-slate-100 pt-3">
          <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            {job.source}
          </span>
        </div>
      )}
    </Card>
  );
}

function formatStatus(status) {
  const labels = {
    APPLIED: "Applied",
    INTERVIEW: "Interview",
    OFFER: "Offer",
    REJECTED: "Rejected",
    ASSESSMENT: "Assessment",
    HR_ROUND: "HR Round",
    ARCHIVED: "Archived",
  };

  return labels[status] || status;
}