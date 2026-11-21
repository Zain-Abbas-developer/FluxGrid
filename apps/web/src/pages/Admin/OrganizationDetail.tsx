import React, { useState } from "react";
import {
  Building2,
  Edit,
  Pause,
  Play,
  Users,
  Briefcase,
  Activity,
  ShieldAlert,
  Clock,
} from "lucide-react";

// Mock Data
const orgInfo = {
  name: "Alpha",
  created: "2023-01-15",
  status: "Active",
  plan: "Enterprise",
  limits: "1M API Calls / 50GB Storage",
};

const recentActivity = [
  {
    id: "act-1",
    timestamp: "10:45 AM",
    user: "admin@alpha.com",
    action: "Created Job",
    resource: "job_abc123",
  },
  {
    id: "act-2",
    timestamp: "10:30 AM",
    user: "dev@alpha.com",
    action: "Generated API Key",
    resource: "key_prod_1",
  },
  {
    id: "act-3",
    timestamp: "09:15 AM",
    user: "system",
    action: "Billing Updated",
    resource: "invoice_992",
  },
  {
    id: "act-4",
    timestamp: "Yesterday",
    user: "admin@alpha.com",
    action: "Added Member",
    resource: "user_9988",
  },
];

export default function OrganizationDetail(): React.ReactElement {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isSuspended, setIsSuspended] = useState(false);

  const tabs = ["Overview", "Members", "Jobs", "Usage", "API Keys", "Settings"];

  // Dynamic Status based on Suspend toggle
  const currentStatus = isSuspended ? "Suspended" : "Active";

  const toggleSuspend = () => {
    setIsSuspended(!isSuspended);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 size={24} className="text-blue-500" />
            ORGANIZATION: <span className="text-blue-600 dark:text-blue-400">{orgInfo.name}</span>
          </h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-300 dark:hover:bg-slate-800">
            <Edit size={16} />
            Edit
          </button>
          
          <button
            onClick={toggleSuspend}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
              isSuspended
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-900/50 dark:hover:bg-emerald-500/20"
                : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-900/50 dark:hover:bg-amber-500/20"
            }`}
          >
            {isSuspended ? <Play size={16} /> : <Pause size={16} />}
            {isSuspended ? "Resume*" : "Suspend*"}
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
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* SUMMARY METRICS */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Members
                </p>
                <Users size={16} className="text-blue-500" />
              </div>
              <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                124
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Jobs
                </p>
                <Briefcase size={16} className="text-violet-500" />
              </div>
              <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                8,492
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Monthly Usage
                </p>
                <Activity size={16} className="text-emerald-500" />
              </div>
              <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                45.2 GB
              </p>
            </div>
          </div>

          {/* ORGANIZATION INFORMATION */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <ShieldAlert size={16} className="text-amber-500" />
              Organization Information
            </h3>
            
            <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-5">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Name</p>
                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-200">{orgInfo.name}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Created</p>
                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-200">{orgInfo.created}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Status</p>
                <span
                  className={`mt-1 inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                    currentStatus === "Active"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                      : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                  }`}
                >
                  {currentStatus}
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Plan</p>
                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-200">{orgInfo.plan}</p>
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Limits</p>
                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-200">{orgInfo.limits}</p>
              </div>
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-3 dark:border-slate-800 dark:bg-[#0f172a]">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                <Clock size={16} className="text-slate-400" />
                Recent Activity
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white dark:bg-[#111827]">
                  <tr className="border-b border-slate-100 dark:border-slate-800/50">
                    {["Timestamp", "User", "Action", "Resource"].map((heading) => (
                      <th
                        key={heading}
                        className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {recentActivity.map((activity) => (
                    <tr
                      key={activity.id}
                      className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    >
                      <td className="px-5 py-3 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {activity.timestamp}
                      </td>
                      <td className="px-5 py-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                        {activity.user}
                      </td>
                      <td className="px-5 py-3 text-sm text-slate-900 dark:text-white">
                        {activity.action}
                      </td>
                      <td className="px-5 py-3 font-mono text-xs text-blue-600 dark:text-blue-400">
                        {activity.resource}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* Fallback for other tabs */}
      {activeTab !== "Overview" && (
        <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center dark:border-slate-700 dark:bg-[#111827]">
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">
            {activeTab} Section
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            This data table is currently under construction.
          </p>
        </div>
      )}

    </div>
  );
}