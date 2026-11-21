import React, { useState } from "react";
import {
  ServerCrash,
  RefreshCw,
  Activity,
  ExternalLink,
  Loader2,
} from "lucide-react";

export default function ServiceUnavailable(): React.ReactElement {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    // Simulate network request
    setTimeout(() => {
      setIsRetrying(false);
      // In a real app, you would reload data or check a health endpoint here
    }, 2000);
  };

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
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-rose-50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-400">
            <ServerCrash size={40} strokeWidth={1.5} />
          </div>

          {/* Text */}
          <h1 className="mb-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase sm:text-2xl">
            Service Unavailable State
          </h1>
          
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            System Temporarily Unavailable
          </h2>
          
          <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">
            We couldn't connect to the service. Please try again shortly. Our engineering team has been notified.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50 px-8 py-6 sm:flex-row sm:justify-center dark:border-slate-800/50 dark:bg-[#0f172a]">
          <button 
            onClick={handleRetry}
            disabled={isRetrying}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-70 sm:w-auto"
          >
            {isRetrying ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Retrying...
              </>
            ) : (
              <>
                <RefreshCw size={16} />
                Retry
              </>
            )}
          </button>
          
          <button 
            onClick={() => alert("Navigating to System Status page...")}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-300 dark:hover:bg-slate-800 sm:w-auto"
          >
            <ExternalLink size={16} />
            View System Status
          </button>
        </div>
      </div>

      {/* FOOTER TEXT */}
      <p className="mt-8 text-xs text-slate-400 dark:text-slate-500">
        Error Code: 503 Service Unavailable
      </p>

    </div>
  );
}