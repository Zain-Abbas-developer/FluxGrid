import React from "react";
import type { ReactElement } from "react";
import { PlusCircle, Briefcase } from "lucide-react";

// Components import
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import Footer from "../../components/layout/Footer";

export default function DashboardPage(): ReactElement {
  
  // Mock data for metrics
  const metrics = [
    { label: "Total Jobs", value: "124,592", trend: "+12.5%", isUp: true },
    { label: "Success Rate", value: "99.8%", trend: "+0.2%", isUp: true },
    { label: "Active Workers", value: "24", trend: "-2", isUp: false },
  ];

  return (
    // Full screen wrapper
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#E2EBF0] text-slate-900 antialiased selection:bg-blue-500/20 dark:bg-[#0B1220] dark:text-slate-100">
      
      {/* 1. Navbar (Full Width) */}
      <Navbar />

      {/* 2. Middle Section (Sidebar + Main Content) */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mx-auto max-w-7xl space-y-6 pb-10">
            
            {/* Breadcrumbs */}
            <nav className="flex text-sm font-medium text-slate-500 dark:text-slate-400">
              <span className="hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">Workspace</span>
              <span className="mx-2 text-slate-300 dark:text-slate-600">/</span>
              <span className="text-slate-900 dark:text-white">Overview</span>
            </nav>

            {/* Page Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Overview
                </h1>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Monitor your background job processing performance.
                </p>
              </div>
              <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-700">
                <PlusCircle size={18} />
                Create Job
              </button>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {metrics.map((metric, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {metric.label}
                  </p>
                  <div className="mt-2 flex items-baseline justify-between">
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                      {metric.value}
                    </h3>
                    <span className={`inline-flex items-center text-sm font-semibold ${
                      metric.isUp ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                    }`}>
                      {metric.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content Table Area */}
            <div className="rounded-2xl border border-slate-200 bg-white/70 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Jobs</h2>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                  View All
                </button>
              </div>
              <div className="p-6">
                {/* Fake Table / List to represent content */}
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((row) => (
                    <div key={row} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                          <Briefcase size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">Job #8291-{row}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Process Image Data</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">
                          Completed
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">2 mins ago</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* 3. Footer (Full Width) */}
      <Footer/>
      
    </div>
  );
}