import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Play,
  Pause,
  Download,
  ChevronDown,
  Info,
  AlertTriangle,
  XCircle,
  Terminal,
  Link2,
  Briefcase,
  Server,
  FileWarning,
  CheckCircle2,
  Bug,
} from "lucide-react";

// Types
type LogLevel = "INFO" | "WARNING" | "ERROR" | "DEBUG";
type ServiceType = "API" | "Worker" | "Queue" | "Database";

interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  service: ServiceType;
  message: string;
  correlationId: string;
  jobId: string;
  errorDetails?: string;
  stackTrace?: string;
}

// Initial Mock Data
const initialLogs: LogEntry[] = [
  {
    id: "log-1",
    timestamp: "2023-10-24 10:01:00.124",
    level: "INFO",
    service: "API",
    message: "Job accepted",
    correlationId: "corr-998877-xyz",
    jobId: "job_abc123",
  },
  {
    id: "log-2",
    timestamp: "2023-10-24 10:01:01.450",
    level: "INFO",
    service: "Worker",
    message: "Processing started",
    correlationId: "corr-998877-xyz",
    jobId: "job_abc123",
  },
  {
    id: "log-3",
    timestamp: "2023-10-24 10:01:05.002",
    level: "ERROR",
    service: "Worker",
    message: "Task execution failed",
    correlationId: "corr-998877-xyz",
    jobId: "job_abc123",
    errorDetails: "Task timed out after 5 seconds.",
    stackTrace: "Error: Timeout\n    at Worker.execute (/app/src/worker.js:45:12)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)",
  },
];

export default function LogsEvents(): React.ReactElement {
  // Data State
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [selectedEvent, setSelectedEvent] = useState<LogEntry | null>(initialLogs[2]); // Default to error log
  
  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("All Levels");
  const [serviceFilter, setServiceFilter] = useState("All Services");
  const [activeTab, setActiveTab] = useState("All");

  // UI State
  const [isLiveTail, setIsLiveTail] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Ref to auto-scroll table if Live Tail is on (optional, skipped for simplicity here)

  // Simulate Live Tail
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLiveTail) {
      interval = setInterval(() => {
        const services: ServiceType[] = ["API", "Worker", "Queue", "Database"];
        const levels: LogLevel[] = ["INFO", "INFO", "DEBUG", "WARNING", "ERROR"];
        
        const randomService = services[Math.floor(Math.random() * services.length)];
        const randomLevel = levels[Math.floor(Math.random() * levels.length)];
        
        const newLog: LogEntry = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 23),
          level: randomLevel,
          service: randomService,
          message: `Simulated live event from ${randomService}`,
          correlationId: `corr-${Math.random().toString(36).substring(7)}`,
          jobId: `job_${Math.random().toString(36).substring(7)}`,
        };

        setLogs((prev) => [newLog, ...prev].slice(0, 50)); // Keep last 50 to prevent memory leaks
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isLiveTail]);

  // Filter Logic
  const filteredLogs = logs.filter((log) => {
    // Search
    const matchesSearch =
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.correlationId.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Dropdowns
    const matchesLevel = levelFilter === "All Levels" || log.level === levelFilter;
    const matchesService = serviceFilter === "All Services" || log.service === serviceFilter;

    // Tabs
    let matchesTab = true;
    if (activeTab === "API") matchesTab = log.service === "API";
    else if (activeTab === "Workers") matchesTab = log.service === "Worker";
    else if (activeTab === "Queue Events") matchesTab = log.service === "Queue";
    else if (activeTab === "Errors") matchesTab = log.level === "ERROR";

    return matchesSearch && matchesLevel && matchesService && matchesTab;
  });

  // Styling Helpers
  const getLevelIcon = (level: LogLevel) => {
    switch (level) {
      case "INFO": return <Info size={14} className="text-blue-500" />;
      case "WARNING": return <AlertTriangle size={14} className="text-amber-500" />;
      case "ERROR": return <XCircle size={14} className="text-red-500" />;
      case "DEBUG": return <Bug size={14} className="text-slate-500" />;
    }
  };

  const getLevelBadge = (level: LogLevel) => {
    switch (level) {
      case "INFO": return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";
      case "WARNING": return "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400";
      case "ERROR": return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400";
      case "DEBUG": return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400";
    }
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 1500);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-4 p-4 sm:p-6 lg:p-8 flex flex-col h-[calc(100vh-2rem)]">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center dark:border-slate-800 shrink-0">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          LOGS & EVENTS
        </h1>
        
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Live Tail:
          </span>
          <button
            onClick={() => setIsLiveTail(!isLiveTail)}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-bold uppercase tracking-wider transition ${
              isLiveTail
                ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-500/10 dark:text-emerald-400"
                : "border-slate-200 bg-slate-100 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
            }`}
          >
            {isLiveTail ? <Play size={14} className="fill-current" /> : <Pause size={14} />}
            {isLiveTail ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      {/* FILTERS & TABS CONTAINER */}
      <div className="space-y-4 shrink-0">
        
        {/* Search & Dropdowns */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search logs, Job ID, Correlation ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {/* Level Filter */}
            <div className="relative w-full sm:w-auto">
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm text-slate-700 outline-none sm:w-32 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
              >
                <option value="All Levels">Level: All</option>
                <option value="INFO">INFO</option>
                <option value="WARNING">WARNING</option>
                <option value="ERROR">ERROR</option>
                <option value="DEBUG">DEBUG</option>
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-2.5 text-slate-400" />
            </div>

            {/* Service Filter */}
            <div className="relative w-full sm:w-auto">
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm text-slate-700 outline-none sm:w-36 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
              >
                <option value="All Services">Service: All</option>
                <option value="API">API</option>
                <option value="Worker">Worker</option>
                <option value="Queue">Queue</option>
                <option value="Database">Database</option>
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-2.5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
          {["All", "API", "Workers", "Queue Events", "Errors"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-white"
              }`}
            >
              [{tab}]
            </button>
          ))}
        </div>
      </div>

      {/* TABLE SECTION (Scrollable) */}
      <div className="flex-1 overflow-hidden flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827] min-h-75">
        <div className="flex-1 overflow-auto">
          <table className="w-full min-w-200 text-left relative">
            <thead className="bg-slate-50 dark:bg-slate-900/90 sticky top-0 z-10 backdrop-blur-sm">
              <tr>
                {["Timestamp", "Level", "Service", "Message"].map((heading) => (
                  <th
                    key={heading}
                    className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 shadow-sm"
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
                        ? "bg-blue-50/60 dark:bg-blue-500/10"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    }`}
                  >
                    <td className="px-5 py-2 font-mono text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="px-5 py-2">
                      <span className={`inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getLevelBadge(log.level)}`}>
                        {getLevelIcon(log.level)}
                        {log.level}
                      </span>
                    </td>
                    <td className="px-5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                      {log.service}
                    </td>
                    <td className="px-5 py-2 text-sm text-slate-900 dark:text-white font-mono">
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

      {/* SELECTED EVENT PANEL */}
      {selectedEvent && (
        <div className="shrink-0 rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-800 dark:bg-[#0f172a] animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Selected Event
            </h3>
            <span className="font-mono text-xs text-slate-500">
              {selectedEvent.timestamp}
            </span>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                <Link2 size={12} /> Correlation ID
              </span>
              <p className="font-mono text-xs text-slate-900 dark:text-slate-200 truncate">
                {selectedEvent.correlationId}
              </p>
            </div>
            <div>
              <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                <Briefcase size={12} /> Job ID
              </span>
              <p className="font-mono text-xs text-slate-900 dark:text-slate-200 truncate">
                {selectedEvent.jobId}
              </p>
            </div>
            <div>
              <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                <Server size={12} /> Service
              </span>
              <p className="text-xs text-slate-900 dark:text-slate-200">
                {selectedEvent.service}
              </p>
            </div>
            <div>
              <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                <FileWarning size={12} /> Error Details
              </span>
              <p className={`text-xs ${selectedEvent.errorDetails ? "text-red-600 dark:text-red-400" : "text-slate-500 italic"}`}>
                {selectedEvent.errorDetails || "None"}
              </p>
            </div>
          </div>

          {/* Stack Trace */}
          {selectedEvent.stackTrace && (
            <div className="mt-4">
              <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                <Terminal size={12} /> Stack Trace
              </span>
              <pre className="max-h-32 overflow-y-auto rounded-lg bg-slate-900 p-3 font-mono text-[11px] text-red-300">
                <code>{selectedEvent.stackTrace}</code>
              </pre>
            </div>
          )}
        </div>
      )}

      {/* FOOTER */}
      <div className="shrink-0 flex items-center justify-end pt-2">
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Download size={15} className={isExporting ? "animate-bounce" : ""} />
          {isExporting ? "Exporting..." : "Export Logs*"}
        </button>
      </div>

    </div>
  );
}