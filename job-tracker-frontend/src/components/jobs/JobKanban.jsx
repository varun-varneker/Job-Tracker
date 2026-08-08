import { useMemo } from "react";

import KanbanColumn from "./KanbanColumn";

const columns = [
  {
    status: "APPLIED",
    title: "Applied",
  },
  {
    status: "INTERVIEW",
    title: "Interview",
  },
  {
    status: "OFFER",
    title: "Offer",
  },
  {
    status: "REJECTED",
    title: "Rejected",
  },
];

export default function JobKanban({
  jobs = [],
  onAdd,
  onEdit,
  onDelete,
}) {
  const groupedJobs = useMemo(() => {
    return columns.reduce((groups, column) => {
      groups[column.status] = jobs.filter(
        (job) => job.status === column.status
      );

      return groups;
    }, {});
  }, [jobs]);

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex min-w-max gap-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.status}
            status={column.status}
            title={column.title}
            jobs={groupedJobs[column.status]}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}