import React, { useState } from "react";
import {
  Server,
  Activity,
  ArrowRight,
  Power,
  RefreshCw,
  Cpu,
  HardDrive,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function WorkerDetails(): React.ReactElement {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isDraining, setIsDraining] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);

  // Mock Data
  const worker = {
    id: "worker-02",
    status: "ONLINE",
    version: "v1.4.2",
    lastHeartbeat: "Just now (2s ago)",
    queue: "reports",
    concurrency: 5,
    currentJob: "job_abc123",
    cpuUsage: 45,
    memoryUsage: 68,
  };

  const tabs = ["Overview", "Current Job", "Processed Jobs", "Logs"];

  const handleDrain = () => {
    setIsDraining(true);
    setTimeout(() => setIsDraining(false), 1500);
  };

  const handleRestart = () => {
    setIsRestarting(true);
    setTimeout(() => setIsRestarting(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            WORKER: <span className="font-mono text-blue-600 dark:text-blue-400">{worker.id}</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            STATUS:
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
            <CheckCircle2 size={14} />
            {worker.status}
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

      {/* MAIN CONTENT (Overview Tab) */}
      {activeTab === "Overview" && (
        <div className="space-y-6">
          
          {/* METADATA SECTION */}
          <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4 dark:border-slate-800 dark:bg-[#111827]">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Worker Version</p>
              <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-200">{worker.version}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Clock size={12} /> Last Heartbeat
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-200">{worker.lastHeartbeat}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Queue</p>
              <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-200">{worker.queue}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Concurrency</p>
              <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-200">{worker.concurrency}</p>
            </div>
          </div>

          {/* CHARTS SECTION */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            
            {/* CPU Utilization */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  <Cpu size={16} className="text-blue-500" />
                  CPU Utilization
                </h3>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{worker.cpuUsage}%</span>
              </div>
              
              {/* Simple Bar Chart Representation */}
              <div className="flex h-32 items-end gap-1.5">
                {[30, 45, 60, 40, 55, 75, 50, 65, 80, 45, 60, 40].map((height, i) => (
                  <div key={i} className="group relative w-full rounded-t-sm bg-slate-100 dark:bg-slate-800">
                    <div 
                      className="absolute bottom-0 w-full rounded-t-sm bg-blue-500 transition-all group-hover:bg-blue-400" 
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-slate-400">
                <span>-60s</span>
                <span>-30s</span>
                <span>Now</span>
              </div>
            </div>

            {/* Memory Utilization */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  <HardDrive size={16} className="text-violet-500" />
                  Memory Utilization
                </h3>
                <span className="text-lg font-bold text-violet-600 dark:text-violet-400">{worker.memoryUsage}%</span>
              </div>
              
              {/* Simple Line Chart Representation */}
              <div className="relative h-32 w-full">
                <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <path 
                    d="M 0 20 L 15 25 L 30 15 L 45 30 L 60 20 L 75 35 L 90 25 L 100 30" 
                    fill="none" 
                    stroke="#8B5CF6" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle cx="100" cy="30" r="2.5" fill="#8B5CF6" />
                </svg>
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-slate-400">
                <span>-60s</span>
                <span>-30s</span>
                <span>Now</span>
              </div>
            </div>

          </div>

          {/* CURRENT JOB BANNER */}
          <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-blue-200 bg-blue-50 p-5 shadow-sm sm:flex-row sm:items-center dark:border-blue-900/50 dark:bg-blue-500/10">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                <Activity size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Current Job
                </p>
                <p className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                  {worker.currentJob}
                </p>
              </div>
            </div>
            
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto">
              Open Job
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      )}

      {/* FOOTER ACTIONS */}
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-[#111827]">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleDrain}
            disabled={isDraining || isRestarting}
            className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-100 disabled:opacity-50 dark:border-amber-900/50 dark:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-500/20"
          >
            <Power size={16} className={isDraining ? "animate-pulse" : ""} />
            {isDraining ? "Draining..." : "Drain Worker*"}
          </button>
          
          <button
            onClick={handleRestart}
            disabled={isDraining || isRestarting}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-[#0f172a] dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <RefreshCw size={16} className={isRestarting ? "animate-spin" : ""} />
            {isRestarting ? "Restarting..." : "Restart Worker*"}
          </button>
        </div>

        <p className="text-xs italic text-slate-500 dark:text-slate-400">
          *Only show when permitted and valid for current worker status.
        </p>
      </div>

    </div>
  );
}