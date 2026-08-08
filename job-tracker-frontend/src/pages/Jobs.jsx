import { useState } from "react";
import { LayoutGrid, List, Plus, Search, SlidersHorizontal } from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import JobKanban from "../components/jobs/JobKanban";
import JobModal from "../components/jobs/JobModal";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useJobs, useDeleteJob } from "../hooks/useJobs";

export default function Jobs() {
  const { data, isLoading, error } = useJobs();
  const deleteMutation = useDeleteJob();

  const [view, setView] = useState("board");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [defaultStatus, setDefaultStatus] = useState("APPLIED");

  const jobs = data?.jobs || [];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title?.toLowerCase().includes(search.toLowerCase()) ||
      job.company?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleAddJob = (status = "APPLIED") => {
    setSelectedJob(null);
    setDefaultStatus(status);
    setDrawerOpen(true);
  };

  const handleEditJob = (job) => {
    setSelectedJob(job);
    setDefaultStatus(job.status || "APPLIED");
    setDrawerOpen(true);
  };

  const handleDeleteJob = async (job) => {
    const confirmed = window.confirm(
      `Delete "${job.title}" at ${job.company}?`
    );

    if (!confirmed) return;

    await deleteMutation.mutateAsync(job.id);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Page Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Jobs
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Track every opportunity from application to offer.
            </p>
          </div>

          <Button
            size="lg"
            onClick={() => handleAddJob()}
          >
            <Plus className="h-4 w-4" />
            Add Job
          </Button>

        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">

          {/* Search */}
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search jobs or companies..."
              className="pl-9"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">

            {/* Status Filter */}
            <div className="relative">
              <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="h-10 rounded-lg border border-slate-300 bg-white pl-9 pr-8 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="ALL">All statuses</option>
                <option value="APPLIED">Applied</option>
                <option value="INTERVIEW">Interview</option>
                <option value="OFFER">Offer</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1">

              <button
                type="button"
                onClick={() => setView("board")}
                className={`flex h-8 items-center gap-2 rounded-md px-3 text-sm font-medium transition ${
                  view === "board"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
                Board
              </button>

              <button
                type="button"
                onClick={() => setView("table")}
                className={`flex h-8 items-center gap-2 rounded-md px-3 text-sm font-medium transition ${
                  view === "table"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <List className="h-4 w-4" />
                Table
              </button>

            </div>

          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex min-h-100 items-center justify-center rounded-xl border border-slate-200 bg-white">
            <p className="text-sm text-slate-500">
              Loading your jobs...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="font-medium text-red-700">
              Failed to load jobs.
            </p>

            <p className="mt-1 text-sm text-red-600">
              Please refresh the page and try again.
            </p>
          </div>
        )}

        {/* Board */}
        {!isLoading && !error && view === "board" && (
          <JobKanban
            jobs={filteredJobs}
            onAdd={handleAddJob}
            onEdit={handleEditJob}
            onDelete={handleDeleteJob}
          />
        )}

        {/* Temporary Table View */}
        {!isLoading && !error && view === "table" && (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
            <p className="font-medium text-slate-700">
              Table view is coming next.
            </p>

            <p className="mt-1 text-sm text-slate-500">
              The Kanban board is currently the primary CareerCanvas experience.
            </p>
          </div>
        )}

        {/* Add / Edit Drawer */}
        <JobModal
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          editJob={selectedJob}
          defaultStatus={defaultStatus}
        />

      </div>
    </DashboardLayout>
  );
}