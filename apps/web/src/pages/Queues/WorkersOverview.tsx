import React, { useState } from "react";
import {
  RefreshCw,
  Search,
  ChevronDown,
  Eye,
  Server,
  Activity,
  PowerOff,
} from "lucide-react";

// Mock data based on the blueprint
const initialWorkers = [
  {
    id: "worker-01",
    status: "Online",
    queue: "default",
    cpu: "12%",
    memory: "256 MB",
    currentJob: "job_001",
  },
  {
    id: "worker-02",
    status: "Busy",
    queue: "reports",
    cpu: "85%",
    memory: "512 MB",
    currentJob: "job_002",
  },
  {
    id: "worker-03",
    status: "Offline",
    queue: "compute",
    cpu: "-",
    memory: "-",
    currentJob: "-",
  },
];

export default function WorkersOverview(): React.ReactElement {
  const [workers, setWorkers] = useState(initialWorkers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [queueFilter, setQueueFilter] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Calculate summary metrics dynamically
  const totalWorkers = workers.length;
  const busyWorkers = workers.filter((w) => w.status === "Busy").length;
  const offlineWorkers = workers.filter((w) => w.status === "Offline").length;

  // Filtering logic
  const filteredWorkers = workers.filter((worker) => {
    const matchesSearch =
      worker.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.currentJob.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || worker.status === statusFilter;
    const matchesQueue = queueFilter === "All" || worker.queue === queueFilter;
    return matchesSearch && matchesStatus && matchesQueue;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API fetch
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  // Badge color mapping
  const statusColors: Record<string, string> = {
    Online: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    Busy: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
    Offline: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          WORKERS
        </h1>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <RefreshCw size={15} className={isRefreshing ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Workers
            </p>
            <Server size={16} className="text-slate-400" />
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            {totalWorkers}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Busy Workers
            </p>
            <Activity size={16} className="text-blue-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
            {busyWorkers}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Offline
            </p>
            <PowerOff size={16} className="text-red-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-red-600 dark:text-red-400">
            {offlineWorkers}
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
                  "Worker ID",
                  "Status",
                  "Queue",
                  "CPU",
                  "Memory",
                  "Current Job",
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
              {filteredWorkers.length > 0 ? (
                filteredWorkers.map((worker) => (
                  <tr
                    key={worker.id}
                    className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  >
                    <td className="px-5 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                      {worker.id}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                          statusColors[worker.status]
                        }`}
                      >
                        {worker.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {worker.queue}
                    </td>
                    <td className="px-5 py-4 font-mono text-sm text-slate-600 dark:text-slate-300">
                      {worker.cpu}
                    </td>
                    <td className="px-5 py-4 font-mono text-sm text-slate-600 dark:text-slate-300">
                      {worker.memory}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {worker.currentJob}
                    </td>
                    <td className="px-5 py-4">
                      <button className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10">
                        <Eye size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-sm text-slate-500">
                    No workers found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER (Search & Filters) */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 bg-slate-50 px-5 py-4 lg:flex-row dark:border-slate-800 dark:bg-[#0f172a]">
          <div className="flex w-full flex-col items-center gap-3 sm:flex-row lg:w-auto">
            
            {/* Status Filter */}
            <div className="relative w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-4 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 sm:w-32 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
              >
                <option value="All">All Status</option>
                <option value="Online">Online</option>
                <option value="Busy">Busy</option>
                <option value="Offline">Offline</option>
              </select>
              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3 top-2.5 text-slate-400"
              />
            </div>

            {/* Queue Filter */}
            <div className="relative w-full sm:w-auto">
              <select
                value={queueFilter}
                onChange={(e) => setQueueFilter(e.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-4 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 sm:w-32 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
              >
                <option value="All">All Queues</option>
                <option value="default">default</option>
                <option value="reports">reports</option>
                <option value="compute">compute</option>
              </select>
              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3 top-2.5 text-slate-400"
              />
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-72">
            <Search
              size={16}
              className="absolute left-3 top-2.5 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search Worker..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
            />
          </div>
        </div>
      </div>

    </div>
  );
}