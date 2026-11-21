import React from "react";
import {
  Compass,
  LayoutDashboard,
  ArrowLeft,
  Activity,
} from "lucide-react";

export default function NotFound(): React.ReactElement {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 sm:p-6 dark:bg-[#0f172a]">
      
      {/* MAIN CARD */}
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-[#111827] animate-in fade-in zoom-in-95 duration-300">
        
        {/* HEADER / LOGO */}
        <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-4 dark:border-slate-800/50">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Activity size={18} />
          </div>
          <span className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            FluxGrid
          </span>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col items-center px-8 py-12 text-center">
          
          {/* Icon */}
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400">
            <Compass size={40} strokeWidth={1.5} />
          </div>

          {/* Text */}
          <h1 className="text-6xl font-black tracking-tighter text-slate-900 dark:text-white">
            404
          </h1>
          
          <h2 className="mt-2 text-lg font-semibold uppercase tracking-widest text-slate-700 dark:text-slate-300">
            Page Not Found
          </h2>
          
          <p className="mt-4 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            The requested page could not be found. It may have been moved, deleted, or you might have mistyped the URL.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50 px-8 py-6 sm:flex-row sm:justify-center dark:border-slate-800/50 dark:bg-[#0f172a]">
          <button 
            onClick={() => alert("Navigating to Dashboard...")}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <LayoutDashboard size={16} />
            Go to Dashboard
          </button>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>
      </div>

      {/* FOOTER TEXT */}
      <p className="mt-8 text-xs text-slate-400 dark:text-slate-500">
        Error Code: 404 Not Found
      </p>

    </div>
  );
}