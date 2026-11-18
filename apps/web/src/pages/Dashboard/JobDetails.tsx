import React, { useState } from "react";
import {
  ArrowLeft,
  RefreshCw,
  XCircle,
  RotateCcw,
  Clock,
  Server,
  Hash,
  Activity,
  CheckCircle2,
} from "lucide-react";

export default function JobDetails(): React.ReactElement {
  // Mock job data based on the blueprint
  const [job, setJob] = useState({
    id: "job_abc123",
    status: "Processing", // Processing, Completed, Failed, Queued
    type: "report",
    queue: "default",
    worker: "worker-02",
    attempts: "1 / 3",
    queuedAt: "2023-10-24 10:42 AM",
    startedAt: "2023-10-24 10:43 AM",
    duration: "2m 14s",
    completedAt: "—",
    progress: 55,
    latestEvent: "Job picked up by worker-02",
  });

  const [activeTab, setActiveTab] = useState("Overview");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const tabs = ["Overview", "Input", "Result", "Attempts", "Events", "Logs"];

  // Determine button visibility based on status
  const canCancel = ["Queued", "Processing"].includes(job.status);
  const canRetry = ["Failed", "Cancelled"].includes(job.status);

  // Status Badge Color mapping
  const statusColors: Record<string, string> = {
    Processing: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    Completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    Failed: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-800",
    Queued: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    Cancelled: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700",
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <div className="flex items-center gap-4">
          <button className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                JOB DETAILS:
              </h1>
              <span className="font-mono text-lg font-semibold text-slate-600 dark:text-slate-300">
                {job.id}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            STATUS:
          </span>
          <span
            className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${
              statusColors[job.status]
            }`}
          >
            {job.status}
          </span>
        </div>
      </div>

      {/* TABS */}
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 dark:border-slate-800">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400"
                : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
            }`}
          >
            [{tab}]
          </button>
        ))}
      </div>

      {/* MAIN CONTENT (Only rendering Overview for now as per blueprint) */}
      {activeTab === "Overview" && (
        <div className="space-y-6">
          {/* INFO CARDS GRID */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            
            {/* JOB INFORMATION */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                <Hash size={16} className="text-blue-500" />
                Job Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Type</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-200">{job.type}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Queue</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-200">{job.queue}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Worker</span>
                  <span className="flex items-center gap-1.5 text-sm font-medium text-slate-900 dark:text-slate-200">
                    <Server size={14} className="text-slate-400" />
                    {job.worker}
                  </span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Attempts</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-200">{job.attempts}</span>
                </div>
              </div>
            </div>

            {/* EXECUTION */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                <Clock size={16} className="text-violet-500" />
                Execution
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Queued At</span>
                  <span className="font-mono text-sm text-slate-700 dark:text-slate-300">{job.queuedAt}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Started At</span>
                  <span className="font-mono text-sm text-slate-700 dark:text-slate-300">{job.startedAt}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Duration</span>
                  <span className="font-mono text-sm text-slate-700 dark:text-slate-300">{job.duration}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Completed At</span>
                  <span className="font-mono text-sm text-slate-700 dark:text-slate-300">{job.completedAt}</span>
                </div>
              </div>
            </div>
          </div>

          {/* PROGRESS SECTION */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">PROGRESS</span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{job.progress}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-500 ease-in-out"
                style={{ width: `${job.progress}%` }}
              />
            </div>

            {/* LATEST EVENT */}
            <div className="mt-6 rounded-lg bg-slate-50 p-4 dark:bg-slate-900/50">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Latest Event
              </p>
              <p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200">
                <Activity size={14} className="text-emerald-500" />
                {job.latestEvent}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER ACTIONS */}
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-[#111827]">
        <div className="flex flex-wrap items-center gap-3">
          {canCancel && (
            <button className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 dark:border-red-900/50 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20">
              <XCircle size={16} />
              Cancel Job*
            </button>
          )}
          
          {canRetry && (
            <button className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-600 transition hover:bg-amber-100 dark:border-amber-900/50 dark:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-500/20">
              <RotateCcw size={16} />
              Retry Job*
            </button>
          )}

          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-[#0f172a] dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        <p className="text-xs italic text-slate-500 dark:text-slate-400">
          *Only show when permitted and valid for current job status.
        </p>
      </div>
    </div>
  );
}