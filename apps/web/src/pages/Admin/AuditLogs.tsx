import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ScrollText,
  Download,
  Eye,
  Loader2,
  ShieldAlert,
} from "lucide-react";

// Types
interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  resource: string;
  organization: string;
  result: "Success" | "Denied";
}

// Mock Data
const initialLogs: AuditLog[] = [
  {
    id: "log-1",
    timestamp: "2023-10-24 10:45:12",
    actor: "Admin",
    action: "Role changed",
    resource: "User",
    organization: "Alpha",
    result: "Success",
  },
  {
    id: "log-2",
    timestamp: "2023-10-24 09:30:00",
    actor: "Admin",
    action: "Key revoked",
    resource: "API Key",
    organization: "Beta",
    result: "Success",
  },
  {
    id: "log-3",
    timestamp: "2023-10-24 08:15:30",
    actor: "User",
    action: "Login failed",
    resource: "Account",
    organization: "Alpha",
    result: "Denied",
  },
  {
    id: "log-4",
    timestamp: "2023-10-23 16:20:00",
    actor: "Admin",
    action: "Login failed",
    resource: "Account",
    organization: "Beta",
    result: "Denied",
  },
];

export default function AuditLogs(): React.ReactElement {
  // Data & Selection State
  const [logs] = useState<AuditLog[]>(initialLogs);
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);

  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [actorFilter, setActorFilter] = useState("All");
  const [actionFilter, setActionFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  
  // UI State
  const [isExporting, setIsExporting] = useState(false);

  // Filter Logic
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.timestamp.includes(searchQuery) ||
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.organization.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesActor = actorFilter === "All" || log.actor === actorFilter;
    const matchesAction = actionFilter === "All" || log.action === actionFilter;
    
    // Mock date filter logic (just checking the date string prefix for this example)
    let matchesDate = true;
    if (dateFilter === "Today") matchesDate = log.timestamp.startsWith("2023-10-24");
    else if (dateFilter === "Yesterday") matchesDate = log.timestamp.startsWith("2023-10-23");

    return matchesSearch && matchesActor && matchesAction && matchesDate;
  });

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 1500);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          <ScrollText size={24} className="text-blue-500" />
          AUDIT LOGS
        </h1>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Actor Filter */}
          <div className="relative w-full sm:w-auto">
            <select
              value={actorFilter}
              onChange={(e) => setActorFilter(e.target.value)}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-4 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 sm:w-36 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
            >
              <option value="All">Actor: All</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
            <ChevronDown size={15} className="pointer-events-none absolute right-3 top-2.5 text-slate-400" />
          </div>

          {/* Action Filter */}
          <div className="relative w-full sm:w-auto">
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-4 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 sm:w-44 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
            >
              <option value="All">Action: All</option>
              <option value="Role changed">Role changed</option>
              <option value="Key revoked">Key revoked</option>
              <option value="Login failed">Login failed</option>
            </select>
            <ChevronDown size={15} className="pointer-events-none absolute right-3 top-2.5 text-slate-400" />
          </div>

          {/* Date Range Filter */}
          <div className="relative w-full sm:w-auto">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-4 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 sm:w-36 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
            >
              <option value="All">Date: All</option>
              <option value="Today">Today</option>
              <option value="Yesterday">Yesterday</option>
            </select>
            <ChevronDown size={15} className="pointer-events-none absolute right-3 top-2.5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-225 text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/70">
              <tr>
                {[
                  "Timestamp",
                  "Actor",
                  "Action",
                  "Resource",
                  "Organization",
                  "Result",
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
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    onClick={() => setSelectedLogId(log.id)}
                    className={`cursor-pointer transition-colors ${
                      selectedLogId === log.id
                        ? "bg-blue-50/60 dark:bg-blue-500/10"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    }`}
                  >
                    <td className="px-5 py-4 font-mono text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                      {log.actor}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-700 dark:text-slate-300">
                      {log.action}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {log.resource}
                    </td>
                    <td className="px-5 py-4 text-sm font-medium text-blue-600 dark:text-blue-400">
                      {log.organization}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                          log.result === "Success"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                        }`}
                      >
                        {log.result === "Success" ? null : <ShieldAlert size={12} />}
                        {log.result}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-sm text-slate-500">
                    No audit logs found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex flex-col items-center justify-between gap-4 pt-2 sm:flex-row">
        <button
          disabled={!selectedLogId}
          onClick={() => alert(`Viewing details for log: ${selectedLogId}`)}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto dark:border-slate-700 dark:bg-[#111827] dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Eye size={16} />
          [View Event Details]
        </button>

        <button
          onClick={handleExport}
          disabled={isExporting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-70 sm:w-auto dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
        >
          {isExporting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Download size={16} />
          )}
          {isExporting ? "Exporting..." : "[Export, if authorized]"}
        </button>
      </div>

    </div>
  );
}