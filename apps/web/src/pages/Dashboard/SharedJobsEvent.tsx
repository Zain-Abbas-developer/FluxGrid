import React, { useState } from "react";
import {
  Search,
  List,
  Info,
  AlertTriangle,
  XCircle,
  Link2,
  Briefcase,
  Server,
  FileWarning,
} from "lucide-react";

// Mock Data based on the blueprint
const mockLogs = [
  {
    id: "log-1",
    time: "10:01:00",
    level: "INFO",
    service: "API",
    message: "Job accepted",
    correlationId: "corr-998877-xyz",
    jobId: "job_abc123",
    errorDetails: null,
  },
  {
    id: "log-2",
    time: "10:01:01",
    level: "INFO",
    service: "Queue",
    message: "Job enqueued",
    correlationId: "corr-998877-xyz",
    jobId: "job_abc123",
    errorDetails: null,
  },
  {
    id: "log-3",
    time: "10:01:02",
    level: "INFO",
    service: "Worker",
    message: "Processing started",
    correlationId: "corr-998877-xyz",
    jobId: "job_abc123",
    errorDetails: null,
  },
  {
    id: "log-4",
    time: "10:01:05",
    level: "ERROR",
    service: "Worker",
    message: "Task timed out",
    correlationId: "corr-998877-xyz",
    jobId: "job_abc123",
    errorDetails: "Job execution exceeded the maximum allowed timeout of 5 seconds.",
  },
];

export default function SharedJobsEvent(): React.ReactElement {
  const [activeFilter, setActiveFilter] = useState("All Events");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<typeof mockLogs[0] | null>(mockLogs[3]); // Default to the error for demo

  const filters = [
    { name: "All Events", icon: List },
    { name: "Info", icon: Info },
    { name: "Warning", icon: AlertTriangle },
    { name: "Error", icon: XCircle },
  ];

  // Filtering Logic
  const filteredLogs = mockLogs.filter((log) => {
    const matchesFilter =
      activeFilter === "All Events" || log.level.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch =
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.time.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  // Badge Colors
  const levelColors: Record<string, string> = {
    INFO: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    WARNING: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    ERROR: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-800",
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
          JOB EVENTS & LOGS
        </h1>
      </div>

      {/* FILTERS & SEARCH */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.name;
            return (
              <button
                key={filter.name}
                onClick={() => setActiveFilter(filter.name)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                <Icon size={16} />
                {filter.name}
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:max-w-xs">
          <Search size={16} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
          />
        </div>
      </div>

      {/* LOGS TABLE */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-175 text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/70">
              <tr>
                {["Time", "Level", "Service", "Event / Message"].map((heading) => (
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
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    onClick={() => setSelectedEvent(log)}
                    className={`cursor-pointer transition-colors ${
                      selectedEvent?.id === log.id
                        ? "bg-blue-50/50 dark:bg-blue-500/5"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    }`}
                  >
                    <td className="px-5 py-3 font-mono text-sm text-slate-500 dark:text-slate-400">
                      {log.time}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          levelColors[log.level]
                        }`}
                      >
                        {log.level}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                      {log.service}
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-900 dark:text-white">
                      {log.message}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-sm text-slate-500">
                    No logs found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SELECTED EVENT DETAILS */}
      {selectedEvent && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Selected Event
          </h3>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-[#0f172a]">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              
              <div className="space-y-1">
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <Link2 size={14} /> Correlation ID
                </span>
                <p className="font-mono text-sm text-slate-900 dark:text-slate-200">
                  {selectedEvent.correlationId}
                </p>
              </div>

              <div className="space-y-1">
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <Briefcase size={14} /> Job ID
                </span>
                <p className="font-mono text-sm text-slate-900 dark:text-slate-200">
                  {selectedEvent.jobId}
                </p>
              </div>

              <div className="space-y-1">
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <Server size={14} /> Service
                </span>
                <p className="text-sm text-slate-900 dark:text-slate-200">
                  {selectedEvent.service}
                </p>
              </div>

              <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <FileWarning size={14} /> Error Details
                </span>
                <p className={`text-sm ${selectedEvent.errorDetails ? "text-red-600 dark:text-red-400" : "text-slate-500 italic"}`}>
                  {selectedEvent.errorDetails || "None"}
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}