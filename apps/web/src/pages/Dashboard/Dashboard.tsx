
import React, { useState } from "react";
import {
  RefreshCw,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Briefcase,
  CheckCircle2,
  XCircle,
  Activity,
  Clock,
  Cpu,
  Layers,
  Eye,
} from "lucide-react";

interface Metric {
  label: string;
  value: string;
  trend: string;
  isUp: boolean;
  icon: React.ElementType;
}

const metrics: Metric[] = [
  {
    label: "Total Jobs",
    value: "124,592",
    trend: "+12.5%",
    isUp: true,
    icon: Briefcase,
  },
  {
    label: "Completed",
    value: "121,840",
    trend: "+8.2%",
    isUp: true,
    icon: CheckCircle2,
  },
  {
    label: "Failed",
    value: "1,248",
    trend: "-2.4%",
    isUp: true,
    icon: XCircle,
  },
  {
    label: "Active",
    value: "1,504",
    trend: "+5.7%",
    isUp: true,
    icon: Activity,
  },
];

const jobs = [
  {
    id: "JOB-8291",
    type: "Image Processing",
    status: "Completed",
    created: "10:42 AM",
    duration: "2.4s",
  },
  {
    id: "JOB-8290",
    type: "Data Analysis",
    status: "Running",
    created: "10:39 AM",
    duration: "12.8s",
  },
  {
    id: "JOB-8289",
    type: "Email Processing",
    status: "Failed",
    created: "10:35 AM",
    duration: "0.8s",
  },
  {
    id: "JOB-8288",
    type: "PDF Generation",
    status: "Completed",
    created: "10:30 AM",
    duration: "4.2s",
  },
  {
    id: "JOB-8287",
    type: "Image Processing",
    status: "Queued",
    created: "10:25 AM",
    duration: "--",
  },
];

const throughputData = [
  35, 48, 40, 65, 52, 72, 58, 82, 68, 90, 75, 96,
];

export default function DashboardPage(): React.ReactElement {
  const [timeRange, setTimeRange] = useState("Last 24 Hours");
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("Just now");

  const handleRefresh = () => {
    setRefreshing(true);
    setLastUpdated("Just now");
    setTimeout(() => setRefreshing(false), 700);
  };

  const statusColors: Record<string, string> = {
    Completed:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    Running:
      "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
    Failed:
      "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
    Queued:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Overview
            </h1>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              LIVE
            </span>
          </div>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Monitor your platform performance and job processing activity.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none rounded-lg border border-slate-200 bg-white px-4 py-2.5 pr-9 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
            >
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-3 top-3 text-slate-400"
            />
          </div>

          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <RefreshCw
              size={15}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.label}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {metric.label}
                </p>

                <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <Icon size={18} />
                </div>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {metric.value}
                </h2>

                <span className={`flex items-center gap-1 text-xs font-semibold ${
                  metric.isUp
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400"
                }`}>
                  {metric.isUp ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowDownRight size={14} />
                  )}
                  {metric.trend}
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Compared to previous period
              </p>
            </div>
          );
        })}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* JOB THROUGHPUT */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Job Throughput
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Jobs processed over time
              </p>
            </div>

            <Activity size={19} className="text-blue-500" />
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                8,492
              </span>
              <span className="text-xs font-medium text-emerald-500">
                +18.4%
              </span>
            </div>

            <div className="relative h-52 w-full">
              <div className="absolute inset-0 flex flex-col justify-between">
                {[100, 75, 50, 25, 0].map((value) => (
                  <div
                    key={value}
                    className="flex w-full items-center border-t border-dashed border-slate-200 dark:border-slate-700"
                  >
                    <span className="absolute -left-1 -translate-y-3 text-[10px] text-slate-400">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <svg
                viewBox="0 0 600 180"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full overflow-visible"
              >
                <defs>
                  <linearGradient id="throughputGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <path
                  d="M 0 125 L 55 105 L 110 118 L 165 75 L 220 95 L 275 55 L 330 80 L 385 40 L 440 65 L 495 25 L 550 48 L 600 12 L 600 180 L 0 180 Z"
                  fill="url(#throughputGradient)"
                />

                <path
                  d="M 0 125 L 55 105 L 110 118 L 165 75 L 220 95 L 275 55 L 330 80 L 385 40 L 440 65 L 495 25 L 550 48 L 600 12"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />

                {throughputData.map((point, index) => (
                  <circle
                    key={index}
                    cx={index * (600 / 11)}
                    cy={180 - point * 1.68}
                    r="3"
                    fill="#3B82F6"
                    stroke="white"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>
            </div>

            <div className="mt-3 flex justify-between text-[10px] text-slate-400">
              {["12 AM", "4 AM", "8 AM", "12 PM", "4 PM", "8 PM"].map(
                (time) => <span key={time}>{time}</span>
              )}
            </div>
          </div>
        </div>

        {/* JOB STATUS DISTRIBUTION */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Job Status Distribution
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Breakdown of all processed jobs
              </p>
            </div>

            <Layers size={19} className="text-violet-500" />
          </div>

          <div className="flex flex-col items-center justify-center gap-8 py-8 sm:flex-row">
            <div
              className="relative flex h-44 w-44 shrink-0 items-center justify-center rounded-full"
              style={{
                background:
                  "conic-gradient(#10B981 0% 78%, #3B82F6 78% 91%, #EF4444 91% 96%, #F59E0B 96% 100%)",
              }}
            >
              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white dark:bg-[#111827]">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                  124K
                </span>
                <span className="text-[10px] text-slate-500">
                  Total Jobs
                </span>
              </div>
            </div>

            <div className="w-full space-y-4 sm:w-auto">
              {[
                { label: "Completed", value: "78%", color: "bg-emerald-500" },
                { label: "Running", value: "13%", color: "bg-blue-500" },
                { label: "Failed", value: "5%", color: "bg-red-500" },
                { label: "Queued", value: "4%", color: "bg-amber-500" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-8">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* QUEUE + WORKER HEALTH */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* QUEUE HEALTH */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-violet-50 p-2 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
              <Layers size={19} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Queue Health
              </h2>
              <p className="text-xs text-slate-500">
                Current queue workload
              </p>
            </div>

            <span className="ml-auto rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              Healthy
            </span>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { label: "Waiting", value: "248", color: "text-amber-500" },
              { label: "Active", value: "86", color: "text-blue-500" },
              { label: "Failed", value: "12", color: "text-red-500" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900">
                <p className="text-xs text-slate-500">{item.label}</p>
                <p className={`mt-2 text-xl font-bold ${item.color}`}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
            <span>Queue processing capacity</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              72%
            </span>
          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div className="h-full w-[72%] rounded-full bg-violet-500" />
          </div>
        </div>

        {/* WORKER HEALTH */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <Cpu size={19} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Worker Health
              </h2>
              <p className="text-xs text-slate-500">
                Worker availability and utilization
              </p>
            </div>

            <span className="ml-auto rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              Operational
            </span>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { label: "Online", value: "18", color: "text-emerald-500" },
              { label: "Busy", value: "5", color: "text-blue-500" },
              { label: "Offline", value: "1", color: "text-red-500" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900">
                <p className="text-xs text-slate-500">{item.label}</p>
                <p className={`mt-2 text-xl font-bold ${item.color}`}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
            <span>Worker utilization</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              83%
            </span>
          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div className="h-full w-[83%] rounded-full bg-blue-500" />
          </div>
        </div>
      </div>

      {/* RECENT JOBS */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center dark:border-slate-800">
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Recent Jobs
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Latest job execution activity
            </p>
          </div>

          <button className="flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700 dark:text-blue-400">
            View All
            <ArrowUpRight size={15} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-162.5 text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/70">
              <tr>
                {["Job ID", "Type", "Status", "Created", "Duration", "Action"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500"
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                >
                  <td className="px-5 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                    {job.id}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {job.type}
                  </td>

                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusColors[job.status]}`}>
                      {job.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {job.created}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {job.duration}
                  </td>

                  <td className="px-5 py-4">
                    <button
                      title="Inspect job"
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                    >
                      <Eye size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 px-5 py-3 dark:border-slate-800">
          <p className="text-xs text-slate-500">
            Showing 5 recent jobs
          </p>
          <p className="flex items-center gap-1 text-xs text-slate-400">
            <Clock size={13} />
            Last updated: {lastUpdated}
          </p>
        </div>
      </div>

    </div>
  );
}
