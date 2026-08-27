import { useDroppable } from "@dnd-kit/core";
import { Plus } from "lucide-react";

import Button from "../ui/Button";
import JobCard from "./JobCard";

export default function KanbanColumn({
  status,
  title,
  jobs = [],
  onAdd,
  onEdit,
  onDelete,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <section
      ref={setNodeRef}
      className={`flex min-w-[300px] max-w-[340px] flex-1 flex-col rounded-xl p-3 transition ${
        isOver
          ? "bg-blue-50 ring-2 ring-blue-200"
          : "bg-slate-100/80"
      }`}
    >
      {/* Column Header */}
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-slate-800">
            {title}
          </h2>

          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-xs font-medium text-slate-500 shadow-sm">
            {jobs.length}
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onAdd?.(status)}
          aria-label={`Add job to ${title}`}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Cards */}
      <div className="flex min-h-[180px] flex-1 flex-col gap-3">
        {jobs.length === 0 ? (
          <div className="flex min-h-[140px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white/50 px-4 text-center">
            <p className="text-xs text-slate-400">
              Drop a job here
            </p>
          </div>
        ) : (
          jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  );
}