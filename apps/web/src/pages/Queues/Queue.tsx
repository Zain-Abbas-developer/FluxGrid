import React, { useState } from "react";
import {
  Plus,
  Search,
  ChevronDown,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

// Mock data based on the blueprint
const initialQueues = [
  {
    id: "q-1",
    name: "default",
    waiting: 14,
    active: 3,
    failed: 0,
    workers: 3,
    status: "Active",
  },
  {
    id: "q-2",
    name: "reports",
    waiting: 8,
    active: 2,
    failed: 1,
    workers: 2,
    status: "Active",
  },
  {
    id: "q-3",
    name: "compute",
    waiting: 0,
    active: 0,
    failed: 5,
    workers: 1,
    status: "Paused",
  },
];

export default function Queues(): React.ReactElement {
  const [queues] = useState(initialQueues);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Calculate totals for the summary cards
  const totalWaiting = queues.reduce((sum, q) => sum + q.waiting, 0);
  const totalActive = queues.reduce((sum, q) => sum + q.active, 0);
  const totalFailed = queues.reduce((sum, q) => sum + q.failed, 0);

  // Filter logic
  const filteredQueues = queues.filter((queue) => {
    const matchesSearch = queue.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || queue.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          QUEUES
        </h1>
        <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
          <Plus size={16} />
          CREATE QUEUE
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Waiting
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            {totalWaiting}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Active
          </p>
          <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
            {totalActive}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Failed
          </p>
          <p className="mt-2 text-3xl font-bold text-red-600 dark:text-red-400">
            {totalFailed}
          </p>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-200 text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/70">
              <tr>
                {[
                  "Queue Name",
                  "Waiting",
                  "Active",
                  "Failed",
                  "Workers",
                  "Status",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredQueues.length > 0 ? (
                filteredQueues.map((queue) => (
                  <tr
                    key={queue.id}
                    className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  >
                    <td className="px-5 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                      {queue.name}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {queue.waiting}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {queue.active}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {queue.failed}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {queue.workers}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                          queue.status === "Active"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                        }`}
                      >
                        {queue.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10">
                        <ExternalLink size={14} />
                        Open
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-sm text-slate-500">
                    No queues found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER (Search, Filter, Refresh) */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row dark:border-slate-800 dark:bg-[#0f172a]">
          <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search
                size={16}
                className="absolute left-3 top-2.5 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search Queue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
              />
            </div>

            {/* Status Filter */}
            <div className="relative w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-4 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 sm:w-32 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Paused">Paused</option>
              </select>
              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3 top-2.5 text-slate-400"
              />
            </div>
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60 sm:w-auto dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <RefreshCw
              size={15}
              className={isRefreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>
      </div>

    </div>
  );
}