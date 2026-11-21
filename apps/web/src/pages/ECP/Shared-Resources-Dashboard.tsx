import React, { useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  BarChart3,
  User,
  Shield,
  HelpCircle,
  ExternalLink,
  Eye,
  CheckCircle2,
  Activity,
} from "lucide-react";

// Mock Data
const sharedJobs = [
  {
    id: "job_101",
    status: "Done",
    updated: "2023-10-24",
  },
  {
    id: "job_102",
    status: "Running",
    updated: "2023-10-24",
  },
];

const navigation = [
  {
    group: "SHARED RESOURCES",
    items: [
      { name: "Overview", icon: LayoutDashboard },
      { name: "Shared Jobs", icon: Briefcase },
      { name: "Shared Results", icon: FileText },
      { name: "Shared Reports", icon: BarChart3 },
    ],
  },
  {
    group: "ACCOUNT",
    items: [
      { name: "Profile", icon: User },
      { name: "Security", icon: Shield },
    ],
  },
];

export default function ClientPortal(): React.ReactElement {
  const [activeNav, setActiveNav] = useState("Overview");

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0f172a]">
      
      {/* TOP NAVBAR */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Activity size={18} />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white uppercase">
            FluxGrid Client Portal
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
            <HelpCircle size={16} />
            [Help]
          </button>
          <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
            <User size={16} />
            [Profile]
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="flex flex-1 flex-col md:flex-row">
        
        {/* SIDEBAR */}
        <aside className="w-full border-b border-slate-200 bg-white p-4 md:w-64 md:border-b-0 md:border-r dark:border-slate-800 dark:bg-[#111827]">
          <nav className="space-y-8">
            {navigation.map((section) => (
              <div key={section.group}>
                <h3 className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {section.group}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeNav === item.name;
                    return (
                      <li key={item.name}>
                        <button
                          onClick={() => setActiveNav(item.name)}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                            isActive
                              ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                          }`}
                        >
                          <Icon size={16} className={isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400"} />
                          {item.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="mx-auto max-w-5xl space-y-8">
            
            {/* DASHBOARD HEADER */}
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">
                Shared Dashboard
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Welcome to your shared <span className="font-bold text-blue-600 dark:text-blue-400">FluxGrid</span> resources
              </p>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Shared Jobs
                  </p>
                  <Briefcase size={16} className="text-blue-500" />
                </div>
                <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                  24
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Available Results
                  </p>
                  <FileText size={16} className="text-emerald-500" />
                </div>
                <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                  18
                </p>
              </div>
            </div>

            {/* SHARED JOBS TABLE */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
              <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-[#0f172a]">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Shared Jobs
                </h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white dark:bg-[#111827]">
                    <tr className="border-b border-slate-100 dark:border-slate-800/50">
                      {["Job ID", "Status", "Updated", "Action"].map((heading) => (
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
                    {sharedJobs.map((job) => (
                      <tr
                        key={job.id}
                        className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                      >
                        <td className="px-5 py-4 font-mono text-sm font-semibold text-slate-900 dark:text-white">
                          {job.id}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                              job.status === "Done"
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                : "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                            }`}
                          >
                            {job.status === "Done" ? <CheckCircle2 size={12} /> : <Activity size={12} />}
                            {job.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
                          {job.updated}
                        </td>
                        <td className="px-5 py-4">
                          <button className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10">
                            <Eye size={14} />
                            [View]
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* FOOTER NOTE */}
            <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-3 dark:bg-slate-800/50">
              <Shield size={16} className="text-slate-400" />
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Only resources explicitly shared with you are shown.
              </p>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}