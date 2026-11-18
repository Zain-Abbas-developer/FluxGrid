import React, { useState } from "react";
import {
  Activity,
  CheckCircle2,
  Clock,
  Download,
  ChevronDown,
  BarChart3,
  PieChart,
  LineChart,
  Layers,
  Filter,
} from "lucide-react";

export default function Analytics(): React.ReactElement {
  const [timeRange, setTimeRange] = useState("7 Days");
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 1200);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          ANALYTICS
        </h1>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-4 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <ChevronDown size={15} className="pointer-events-none absolute right-3 top-2.5 text-slate-400" />
          </div>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <Download size={15} className={isExporting ? "animate-bounce" : ""} />
            {isExporting ? "Exporting..." : "Export"}
          </button>
        </div>
      </div>

      {/* SUMMARY METRICS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Jobs Processed
            </p>
            <BarChart3 size={16} className="text-blue-500" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
            124,592
          </p>
          <p className="mt-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            +12.5% vs prev period
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Success Rate
            </p>
            <CheckCircle2 size={16} className="text-emerald-500" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
            98.2%
          </p>
          <p className="mt-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            +0.4% vs prev period
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Avg Execution Time
            </p>
            <Clock size={16} className="text-violet-500" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
            2.4s
          </p>
          <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
            -0.2s vs prev period
          </p>
        </div>
      </div>

      {/* CHARTS GRID (2x2) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        
        {/* THROUGHPUT OVER TIME */}
        <div className="flex h-80 flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <div className="mb-6 flex items-center gap-2">
            <Activity size={18} className="text-blue-500" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Throughput Over Time
            </h3>
          </div>
          <div className="flex flex-1 items-end justify-between gap-1 sm:gap-2">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((height, i) => (
              <div key={i} className="group relative flex h-full w-full flex-col justify-end">
                <div 
                  className="w-full rounded-t-sm bg-blue-100 transition-all group-hover:bg-blue-500 dark:bg-blue-500/20 dark:group-hover:bg-blue-400" 
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between text-[10px] text-slate-400">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* SUCCESS VS FAILURE */}
        <div className="flex h-80 flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <div className="mb-6 flex items-center gap-2">
            <PieChart size={18} className="text-emerald-500" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Success vs Failure
            </h3>
          </div>
          <div className="flex flex-1 items-center justify-center gap-8">
            {/* Donut Chart */}
            <div 
              className="relative flex h-36 w-36 items-center justify-center rounded-full"
              style={{ background: "conic-gradient(#10B981 0% 98%, #EF4444 98% 100%)" }}
            >
              <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white dark:bg-[#111827]">
                <span className="text-xl font-bold text-slate-900 dark:text-white">98%</span>
                <span className="text-[10px] text-slate-500">Success</span>
              </div>
            </div>
            
            {/* Legend */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Success</p>
                  <p className="text-xs text-slate-500">121,840</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Failed</p>
                  <p className="text-xs text-slate-500">2,752</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LATENCY p50/p95/p99 */}
        <div className="flex h-80 flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LineChart size={18} className="text-amber-500" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Latency (p50 / p95 / p99)
              </h3>
            </div>
            <div className="flex gap-2 text-[10px]">
              <span className="flex items-center gap-1 text-emerald-500"><span className="h-2 w-2 rounded-full bg-emerald-500"/>p50</span>
              <span className="flex items-center gap-1 text-amber-500"><span className="h-2 w-2 rounded-full bg-amber-500"/>p95</span>
              <span className="flex items-center gap-1 text-red-500"><span className="h-2 w-2 rounded-full bg-red-500"/>p99</span>
            </div>
          </div>
          <div className="relative flex-1">
            <svg viewBox="0 0 100 40" className="h-full w-full overflow-visible" preserveAspectRatio="none">
              {/* p50 Line */}
              <path d="M 0 30 L 20 28 L 40 25 L 60 26 L 80 24 L 100 22" fill="none" stroke="#10B981" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              {/* p95 Line */}
              <path d="M 0 20 L 20 18 L 40 15 L 60 16 L 80 12 L 100 10" fill="none" stroke="#F59E0B" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              {/* p99 Line */}
              <path d="M 0 10 L 20 12 L 40 8 L 60 5 L 80 7 L 100 3" fill="none" stroke="#EF4444" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="mt-3 flex justify-between text-[10px] text-slate-400">
            <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
          </div>
        </div>

        {/* JOB TYPE BREAKDOWN */}
        <div className="flex h-80 flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <div className="mb-6 flex items-center gap-2">
            <Layers size={18} className="text-violet-500" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Job Type Breakdown
            </h3>
          </div>
          <div className="flex flex-1 flex-col justify-center space-y-4">
            {[
              { label: "Image Processing", value: 45, color: "bg-blue-500" },
              { label: "Data Analysis", value: 30, color: "bg-violet-500" },
              { label: "Email Processing", value: 15, color: "bg-amber-500" },
              { label: "PDF Generation", value: 10, color: "bg-emerald-500" },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                  <span className="text-slate-500">{item.value}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* FILTERS FOOTER */}
      <div className="flex flex-col items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm lg:flex-row lg:items-center dark:border-slate-800 dark:bg-[#0f172a]">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <Filter size={16} />
          Filters:
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {["Organization", "Queue", "Job Type", "Status", "Time Range"].map((filter) => (
            <button
              key={filter}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {filter}
              <ChevronDown size={12} className="text-slate-400" />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}