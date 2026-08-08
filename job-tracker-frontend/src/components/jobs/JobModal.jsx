import { useEffect, useState } from "react";
import { X } from "lucide-react";

import {
  useCreateJob,
  useUpdateJob,
} from "../../hooks/useJobs";

const initialState = {
  title: "",
  company: "",
  status: "APPLIED",
  jobUrl: "",
  notes: "",
  appliedDate: "",
};

export default function JobModal({
  open,
  onClose,
  editJob = null,
}) {
  const [form, setForm] = useState(initialState);

  const createMutation = useCreateJob();
  const updateMutation = useUpdateJob();

  useEffect(() => {
    if (editJob) {
      setForm({
        title: editJob.title || "",
        company: editJob.company || "",
        status: editJob.status || "APPLIED",
        jobUrl: editJob.jobUrl || "",
        notes: editJob.notes || "",
        appliedDate: editJob.appliedDate
          ? editJob.appliedDate.slice(0, 10)
          : "",
      });
    } else {
      setForm(initialState);
    }
  }, [editJob]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editJob) {
      await updateMutation.mutateAsync({
        id: editJob.id,
        jobData: form,
      });
    } else {
      await createMutation.mutateAsync(form);
    }

    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-xl rounded-xl bg-white p-6">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {editJob ? "Edit Job" : "Add Job"}
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            name="title"
            placeholder="Job Title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />

          <input
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          >
            <option value="APPLIED">Applied</option>
            <option value="INTERVIEW">Interview</option>
            <option value="OFFER">Offer</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <input
            type="date"
            name="appliedDate"
            value={form.appliedDate}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <input
            name="jobUrl"
            placeholder="Job URL"
            value={form.jobUrl}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border p-3"
          />

          <button
            type="submit"
            disabled={
              createMutation.isPending ||
              updateMutation.isPending
            }
            className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
          >
            {editJob ? "Update Job" : "Create Job"}
          </button>

        </form>

      </div>

    </div>
  );
}