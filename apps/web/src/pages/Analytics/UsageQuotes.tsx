import React, { useState } from "react";
import {
  Briefcase,
  Activity,
  HardDrive,
  ChevronDown,
  Clock,
  Gauge,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from "lucide-react";

// Mock Data
const summaryData = [
  {
    title: "JOBS SUBMITTED",
    used: 12450,
    limit: 50000,
    icon: Briefcase,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-500/10",
  },
  {
    title: "API REQUESTS",
    used: 850000,
    limit: 1000000,
    icon: Activity,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
  },
  {
    title: "STORAGE USED",
    used: 45,
    limit: 100,
    suffix: "GB",
    icon: HardDrive,
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-500/10",
  },
];

const detailedMetrics = [
  { label: "API Requests", used: 850000, limit: 1000000, unit: "" },
  { label: "Job Submissions", used: 12450, limit: 50000, unit: "" },
  { label: "Compute Time", used: 320, limit: 1000, unit: "hrs" },
  { label: "Storage", used: 45, limit: 100, unit: "GB" },
];

export default function UsageQuotas(): React.ReactElement {
  const [month, setMonth] = useState("Current Month");
  const [isRequesting, setIsRequesting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const handleRequestIncrease = () => {
    setIsRequesting(true);
    setTimeout(() => {
      setIsRequesting(false);
      setRequestSent(true);
      setTimeout(() => setRequestSent(false), 5000);
    }, 1500);
  };

  // Helper to calculate percentage and colors
  const getProgressData = (used: number, limit: number) => {
    const percentage = Math.min((used / limit) * 100, 100);
    let colorClass = "bg-emerald-500";
    if (percentage >= 90) colorClass = "bg-red-500";
    else if (percentage >= 75) colorClass = "bg-amber-500";
    
    return { percentage, colorClass };
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          USAGE & QUOTAS
        </h1>
        
        <div className="relative">
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-4 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
          >
            <option value="Current Month">Current Month</option>
            <option value="Last Month">Last Month</option>
            <option value="Last 3 Months">Last 3 Months</option>
          </select>
          <ChevronDown size={15} className="pointer-events-none absolute right-3 top-2.5 text-slate-400" />
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {summaryData.map((item) => {
          const Icon = item.icon;
          const { percentage } = getProgressData(item.used, item.limit);
          
          return (
            <div
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {item.title}
                </p>
                <div className={`rounded-lg p-1.5 ${item.bg} ${item.color}`}>
                  <Icon size={16} />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                  {item.used.toLocaleString()}
                </span>
                <span className="text-sm font-medium text-slate-500">
                  / {item.limit.toLocaleString()} {item.suffix}
                </span>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className={`h-full rounded-full ${getProgressData(item.used, item.limit).colorClass}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* DETAILED PROGRESS BARS */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
        <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <Gauge size={16} className="text-blue-500" />
          Resource Utilization
        </h3>
        
        <div className="space-y-6">
          {detailedMetrics.map((metric) => {
            const { percentage, colorClass } = getProgressData(metric.used, metric.limit);
            
            return (
              <div key={metric.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {metric.label}
                  </span>
                  <span className="text-slate-500 font-mono text-xs">
                    {metric.used.toLocaleString()} {metric.unit} / {metric.limit.toLocaleString()} {metric.unit} 
                    <span className="ml-2 font-bold text-slate-900 dark:text-white">
                      ({Math.round(percentage)}%)
                    </span>
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LIMITS FOOTER */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-[#0f172a]">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-amber-500" />
            <span className="text-slate-500 dark:text-slate-400">Rate Limits:</span>
            <span className="font-semibold text-slate-900 dark:text-white">1,000 req/min</span>
          </div>
          <div className="flex items-center gap-2">
            <ArrowUpRight size={16} className="text-blue-500" />
            <span className="text-slate-500 dark:text-slate-400">Max Payload:</span>
            <span className="font-semibold text-slate-900 dark:text-white">10 MB</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-emerald-500" />
            <span className="text-slate-500 dark:text-slate-400">Concurrent Jobs:</span>
            <span className="font-semibold text-slate-900 dark:text-white">50</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-violet-500" />
            <span className="text-slate-500 dark:text-slate-400">Retention:</span>
            <span className="font-semibold text-slate-900 dark:text-white">30 days</span>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200 dark:hover:bg-slate-800">
            <ShieldCheck size={16} />
            View Plan
          </button>
          
          <button
            onClick={handleRequestIncrease}
            disabled={isRequesting || requestSent}
            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition ${
              requestSent 
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                : "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
            }`}
          >
            {requestSent ? (
              <>
                <CheckCircle2 size={16} />
                Request Sent
              </>
            ) : (
              <>
                <ArrowUpRight size={16} />
                {isRequesting ? "Requesting..." : "Request Limit Increase*"}
              </>
            )}
          </button>
        </div>

        <p className="text-xs italic text-slate-500 dark:text-slate-400">
          *Limit increase requests are subject to plan upgrade approval.
        </p>
      </div>

    </div>
  );
}