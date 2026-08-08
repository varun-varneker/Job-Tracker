import { Pencil, Trash2, ExternalLink } from "lucide-react";

export default function JobTable({
  jobs = [],
  onEdit,
}) {
  if (jobs.length === 0) {
    return (
      <div className="py-16 text-center">
        <h3 className="text-xl font-semibold text-slate-700">
          No jobs found
        </h3>

        <p className="mt-2 text-slate-500">
          Start by adding your first job application.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">

      <table className="min-w-full">

        <thead className="border-b bg-slate-50">

          <tr>

            <th className="px-4 py-3 text-left">Position</th>

            <th className="px-4 py-3 text-left">Company</th>

            <th className="px-4 py-3 text-left">Status</th>

            <th className="px-4 py-3 text-left">Applied</th>

            <th className="px-4 py-3 text-left">Resume</th>

            <th className="px-4 py-3 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {jobs.map((job) => (
            <tr
              key={job.id}
              className="border-b hover:bg-slate-50"
            >
              <td className="px-4 py-4 font-medium">
                {job.title}
              </td>

              <td className="px-4 py-4">
                {job.company}
              </td>

              <td className="px-4 py-4">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                  {job.status}
                </span>
              </td>

              <td className="px-4 py-4">
                {job.appliedDate
                  ? new Date(job.appliedDate).toLocaleDateString()
                  : "-"}
              </td>

              <td className="px-4 py-4">
                {job.resume?.displayName || "-"}
              </td>

              <td className="px-4 py-4">

                <div className="flex justify-center gap-3">

                  {job.jobUrl && (
                    <button title="Open Job">
                      <ExternalLink
                        size={18}
                        className="text-slate-500 hover:text-blue-600"
                      />
                    </button>
                  )}

                  <button
                    title="Edit"
                    onClick={() => onEdit(job)}
                >
                    <Pencil
                      size={18}
                      className="text-amber-500 hover:text-amber-700"
                    />
                  </button>

                  <button title="Delete">
                    <Trash2
                      size={18}
                      className="text-red-500 hover:text-red-700"
                    />
                  </button>

                </div>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}