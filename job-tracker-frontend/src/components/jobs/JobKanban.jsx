import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";

import KanbanColumn from "./KanbanColumn";
import JobCard from "./JobCard";

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
  onStatusChange,
}) {
  const [activeJob, setActiveJob] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = ({ active }) => {
    const job = jobs.find(
      (item) => String(item.id) === String(active.id)
    );

    setActiveJob(job || null);
  };

  const handleDragCancel = () => {
    setActiveJob(null);
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveJob(null);

    if (!over) {
      return;
    }

    const job = jobs.find(
      (item) => String(item.id) === String(active.id)
    );

    if (!job) {
      return;
    }

    const targetStatus = columns.find(
      (column) =>
        String(column.status) === String(over.id)
    );

    if (!targetStatus) {
      return;
    }

    if (job.status === targetStatus.status) {
      return;
    }

    onStatusChange?.(
      job,
      targetStatus.status
    );
  };

  const groupedJobs = columns.reduce(
    (groups, column) => {
      groups[column.status] = jobs.filter(
        (job) => job.status === column.status
      );

      return groups;
    },
    {}
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
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

      <DragOverlay>
        {activeJob ? (
          <div className="w-[320px] rotate-2">
            <JobCard job={activeJob} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}