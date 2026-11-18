import React, { useState } from "react";
import {
  Search,
  Plus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Download,
} from "lucide-react";

// Mock data matching your blueprint
const jobsData = [
  {
    id: "job_001",
    type: "report",
    status: "Completed",
    priority: "Normal",
    created: "Date",
  },
  {
    id: "job_002",
    type: "compute",
    status: "Processing",
    priority: "High",
    created: "Date",
  },
  {
    id: "job_003",
    type: "export",
    status: "Failed",
    priority: "Normal",
    created: "Date",
  },
];

export default function JobsExplorer(): React.ReactElement {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Reusing the status colors from your provided code
  const statusColors: Record<string, string> = {
    Completed:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    Processing:
      "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
    Failed:
      "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
    Queued:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    Cancelled:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
  };

  const tabs = ["All", "Queued", "Processing", "Completed", "Failed", "Cancelled"];

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            JOBS
          </h1>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
          <Plus size={16} />
          CREATE JOB
        </button>
      </div>

      {/* FILTERS & SEARCH */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* Search Bar */}
        <div className="relative w-full xl:max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-3.5 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search Job ID / Type / Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {["Status", "Queue", "Type", "Date Range"].map((filter) => (
            <div key={filter} className="relative">
              <select className="appearance-none rounded-lg border border-slate-200 bg-white px-4 py-2.5 pr-9 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200">
                <option>{filter}</option>
              </select>
              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3 top-3 text-slate-400"
              />
            </div>
          ))}
          <button className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
            Clear Filters
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2 dark:border-slate-800">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeTab === tab
                ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TABLE SECTION */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-200 text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/70">
              <tr>
                {[
                  "Job ID",
                  "Job Type",
                  "Status",
                  "Priority",
                  "Created",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {jobsData.map((job) => (
                <tr
                  key={job.id}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                >
                  <td className="px-5 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                    {job.id}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {job.type}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusColors[job.status]}`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {job.priority}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">
                    {job.created}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10"
                      title="View Job Details"
                    >
                      <Eye size={15} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row dark:border-slate-800">
          <button className="flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
            <Download size={15} />
            Export CSV if permitted
          </button>

          <div className="flex items-center gap-1">
            <button className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
              <ChevronLeft size={15} />
              Prev
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-sm font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              1
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
              2
            </button>
            <button className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
              Next
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}