import React, { useState } from "react";
import {
  Clock,
  User,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  FileText,
  ArrowRight,
  Play,
} from "lucide-react";

// Mock data based on the blueprint
const mockAttempts = [
  {
    id: 1,
    status: "FAILED",
    worker: "worker-01",
    duration: "4.2 sec",
    error: "Timeout",
    startedAt: "2023-10-24 10:30 AM",
    finishedAt: "2023-10-24 10:30 AM",
  },
  {
    id: 2,
    status: "COMPLETED",
    worker: "worker-02",
    duration: "2.8 sec",
    startedAt: "2023-10-24 10:42 AM",
    finishedAt: "2023-10-24 10:42 AM",
  },
];

export default function JobAttempts(): React.ReactElement {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    // Simulate API call
    setTimeout(() => {
      setIsRetrying(false);
      alert("Job retry initiated!");
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
          JOB ATTEMPTS: <span className="font-mono text-slate-600 dark:text-slate-300">job_abc123</span>
        </h1>
      </div>

      {/* ATTEMPTS LIST */}
      <div className="flex flex-col items-center">
        {mockAttempts.map((attempt, index) => {
          const isFailed = attempt.status === "FAILED";
          
          return (
            <React.Fragment key={attempt.id}>
              {/* ATTEMPT CARD */}
              <div className="w-full rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
                
                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800/50">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                    ATTEMPT #{attempt.id}
                  </h2>
                  <span
                    className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                      isFailed
                        ? "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                        : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                    }`}
                  >
                    {isFailed ? <AlertCircle size={12} /> : <CheckCircle2 size={12} />}
                    [{attempt.status}]
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <User size={15} className="text-slate-400" />
                      <span>
                        Worker: <span className="font-medium text-slate-900 dark:text-white">{attempt.worker}</span>
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <Clock size={15} className="text-slate-400" />
                      <span>
                        Duration: <span className="font-medium text-slate-900 dark:text-white">{attempt.duration}</span>
                      </span>
                    </div>

                    {isFailed && (
                      <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                        <AlertCircle size={15} />
                        <span>
                          Error: <span className="font-medium">{attempt.error}</span>
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>Started: {attempt.startedAt}</span>
                    <span>Finished: {attempt.finishedAt}</span>
                  </div>
                </div>

                {/* Card Footer (Action Button) */}
                <div className="border-t border-slate-100 bg-slate-50 px-5 py-3 dark:border-slate-800/50 dark:bg-[#0f172a] rounded-b-xl">
                  <button className="flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    {isFailed ? (
                      <>
                        <FileText size={15} />
                        [View Error Details]
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={15} />
                        [View Result]
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* TIMELINE CONNECTOR (Don't show after the last item) */}
              {index < mockAttempts.length - 1 && (
                <div className="flex flex-col items-center py-2">
                  <div className="h-6 w-px bg-slate-300 dark:bg-slate-700" />
                  <div className="text-slate-400 dark:text-slate-600">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M19 12l-7 7-7-7"/>
                    </svg>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* FOOTER ACTION */}
      <div className="flex flex-col items-center justify-center pt-6">
        <button
          onClick={handleRetry}
          disabled={isRetrying}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-70"
        >
          <RefreshCw size={16} className={isRetrying ? "animate-spin" : ""} />
          {isRetrying ? "Retrying..." : "Retry Job*"}
        </button>
        <p className="mt-2 text-xs italic text-slate-500 dark:text-slate-400">
          *Only show when permitted and valid for current job status.
        </p>
      </div>

    </div>
  );
}