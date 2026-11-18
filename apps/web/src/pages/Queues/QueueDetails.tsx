import React, { useState } from "react";
import {
  Pause,
  Play,
  Settings,
  Clock,
  Activity,
  AlertCircle,
  BarChart3,
  LineChart,
} from "lucide-react";

export default function QueueDetails(): React.ReactElement {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isPaused, setIsPaused] = useState(false);

  const queue = {
    name: "default",
    waiting: 14,
    active: 3,
    failed: 0,
    delayed: 2,
    completed: 1542,
  };

  const tabs = ["Overview", "Waiting", "Active", "Failed", "Delayed", "Completed"];

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            QUEUE: <span className="font-mono text-blue-600 dark:text-blue-400">{queue.name}</span>
          </h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {isPaused ? (
            <button 
              onClick={() => setIsPaused(false)}
              className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-900/50 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20"
            >
              <Play size={16} />
              Resume*
            </button>
          ) : (
            <button 
              onClick={() => setIsPaused(true)}
              className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-100 dark:border-amber-900/50 dark:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-500/20"
            >
              <Pause size={16} />
              Pause*
            </button>
          )}
          
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-300 dark:hover:bg-slate-800">
            <Settings size={16} />
            Settings
          </button>
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
          
          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Waiting
                </p>
                <Clock size={16} className="text-amber-500" />
              </div>
              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {queue.waiting}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Active
                </p>
                <Activity size={16} className="text-blue-500" />
              </div>
              <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
                {queue.active}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Failed
                </p>
                <AlertCircle size={16} className="text-red-500" />
              </div>
              <p className="mt-2 text-3xl font-bold text-red-600 dark:text-red-400">
                {queue.failed}
              </p>
            </div>
          </div>

          {/* CHARTS SECTION */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            
            {/* Throughput Chart (Placeholder) */}
            <div className="flex h-72 flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
              <div className="mb-4 flex items-center gap-2">
                <BarChart3 size={18} className="text-violet-500" />
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                  Queue Throughput
                </h3>
              </div>
              <div className="flex flex-1 items-end justify-between gap-2">
                {[40, 70, 45, 90, 65, 80, 50, 95, 60, 85].map((height, i) => (
                  <div key={i} className="w-full rounded-t-sm bg-violet-100 dark:bg-violet-500/20 relative group">
                    <div 
                      className="absolute bottom-0 w-full rounded-t-sm bg-violet-500 transition-all group-hover:bg-violet-600" 
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-between text-[10px] text-slate-400">
                <span>10:00</span>
                <span>10:30</span>
                <span>11:00</span>
                <span>11:30</span>
              </div>
            </div>

            {/* Latency Chart (Placeholder) */}
            <div className="flex h-72 flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
              <div className="mb-4 flex items-center gap-2">
                <LineChart size={18} className="text-emerald-500" />
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                  Queue Latency
                </h3>
              </div>
              <div className="relative flex flex-1 items-center justify-center">
                {/* Decorative SVG line for chart */}
                <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <path 
                    d="M 0 25 L 20 20 L 40 22 L 60 10 L 80 15 L 100 5" 
                    fill="none" 
                    stroke="#10B981" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle cx="100" cy="5" r="3" fill="#10B981" />
                </svg>
              </div>
              <div className="mt-3 flex justify-between text-[10px] text-slate-400">
                <span>10:00</span>
                <span>10:30</span>
                <span>11:00</span>
                <span>11:30</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* CONFIGURATION FOOTER */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-[#0f172a]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Configuration
        </h3>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400">Concurrency:</span>
            <span className="font-medium text-slate-900 dark:text-slate-200">10</span>
          </div>
          <div className="hidden h-4 w-px bg-slate-300 dark:bg-slate-700 sm:block" />
          
          <div className="flex items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400">Retry:</span>
            <span className="font-medium text-slate-900 dark:text-slate-200">3</span>
          </div>
          <div className="hidden h-4 w-px bg-slate-300 dark:bg-slate-700 sm:block" />
          
          <div className="flex items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400">Backoff:</span>
            <span className="font-medium text-slate-900 dark:text-slate-200">Exponential</span>
          </div>
          <div className="hidden h-4 w-px bg-slate-300 dark:bg-slate-700 sm:block" />
          
          <div className="flex items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400">Rate Limit:</span>
            <span className="font-medium text-slate-900 dark:text-slate-200">100/s</span>
          </div>
          <div className="hidden h-4 w-px bg-slate-300 dark:bg-slate-700 sm:block" />
          
          <div className="flex items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400">Retention:</span>
            <span className="font-medium text-slate-900 dark:text-slate-200">7 days</span>
          </div>
        </div>
      </div>

    </div>
  );
}