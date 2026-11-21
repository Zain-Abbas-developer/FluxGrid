import React from "react";
import {
  LockKeyhole,
  LogIn,
  Activity,
} from "lucide-react";

export default function SessionExpired(): React.ReactElement {
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
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400">
            <LockKeyhole size={40} strokeWidth={1.5} />
          </div>

          {/* Text */}
          <h1 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">
            Session Expired
          </h1>
          
          <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">
            Your session has expired. Sign in again to continue.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50 px-8 py-6 dark:border-slate-800/50 dark:bg-[#0f172a]">
          <button 
            onClick={() => alert("Redirecting to login...")}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <LogIn size={16} />
            Sign In Again
          </button>
        </div>
      </div>

      {/* FOOTER TEXT */}
      <p className="mt-8 text-xs text-slate-400 dark:text-slate-500">
        For security reasons, you have been automatically logged out.
      </p>

    </div>
  );
}