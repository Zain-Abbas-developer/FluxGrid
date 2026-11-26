import React, { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  FileJson,
  Play,
  Settings,
} from "lucide-react";

export default function CreateJob(): React.ReactElement {
  // Form State
  const [jobName, setJobName] = useState("");
  const [jobType, setJobType] = useState("");
  const [queue, setQueue] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [maxAttempts, setMaxAttempts] = useState("3");
  const [payload, setPayload] = useState('{\n  "task": "generate-report"\n}');
  
  // UI State
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [jsonSuccess, setJsonSuccess] = useState(false);

  // JSON Handlers
  const handleValidateJson = () => {
    try {
      JSON.parse(payload);
      setJsonError(null);
      setJsonSuccess(true);
      setTimeout(() => setJsonSuccess(false), 3000);
    } catch {
      setJsonSuccess(false);
      setJsonError("Invalid JSON format. Please check your syntax.");
    }
  };

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(payload);
      setPayload(JSON.stringify(parsed, null, 2));
      setJsonError(null);
      setJsonSuccess(true);
      setTimeout(() => setJsonSuccess(false), 3000);
    } catch {
      setJsonSuccess(false);
      setJsonError("Cannot format invalid JSON.");
    }
  };

  // Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobName.trim()) {
      alert("Job Name is required.");
      return;
    }
    // Simulate API call
    console.log("Submitting Job:", {
      jobName,
      jobType,
      queue,
      priority,
      maxAttempts,
      payload: JSON.parse(payload),
    });
    alert("Job submitted successfully!");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            CREATE JOB
          </h1>
        </div>
        <button 
          type="button"
          className="flex items-center gap-2 rounded-lg text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Jobs
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* MAIN DETAILS CARD */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          
          {/* Job Name */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Job Name
            </label>
            <input
              type="text"
              required
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              placeholder="e.g. Daily Report Generation"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#0f172a] dark:text-white"
            />
          </div>

          {/* Row: Type & Queue */}
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Job Type
              </label>
              <div className="relative">
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#0f172a] dark:text-slate-200"
                >
                  <option value="">Select job type</option>
                  <option value="report">Report</option>
                  <option value="compute">Compute</option>
                  <option value="export">Export</option>
                  <option value="sync">Sync</option>
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-3 top-3 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Queue
              </label>
              <div className="relative">
                <select
                  value={queue}
                  onChange={(e) => setQueue(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#0f172a] dark:text-slate-200"
                >
                  <option value="">Select queue</option>
                  <option value="default">Default</option>
                  <option value="high-priority">High Priority</option>
                  <option value="background">Background</option>
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-3 top-3 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Row: Priority & Max Attempts */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Priority
              </label>
              <div className="relative">
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#0f172a] dark:text-slate-200"
                >
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-3 top-3 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Max Attempts
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={maxAttempts}
                onChange={(e) => setMaxAttempts(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#0f172a] dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* JSON PAYLOAD CARD */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <div className="mb-3 flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <FileJson size={16} className="text-blue-500" />
              Input Payload (JSON)
            </label>
            
            {/* Validation Message */}
            {jsonError && (
              <span className="flex items-center gap-1 text-xs font-medium text-red-500">
                <AlertCircle size={14} /> {jsonError}
              </span>
            )}
            {jsonSuccess && (
              <span className="flex items-center gap-1 text-xs font-medium text-emerald-500">
                <CheckCircle2 size={14} /> Valid JSON
              </span>
            )}
          </div>

          <textarea
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            spellCheck={false}
            rows={8}
            className="w-full resize-y rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#0f172a] dark:text-slate-200"
          />

          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={handleValidateJson}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-[#0f172a] dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Validate JSON
            </button>
            <button
              type="button"
              onClick={handleFormatJson}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-[#0f172a] dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Format JSON
            </button>
          </div>
        </div>

        {/* ADVANCED OPTIONS */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex w-full items-center justify-between px-6 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50 rounded-t-xl"
          >
            <span className="flex items-center gap-2">
              <Settings size={16} />
              ADVANCED OPTIONS
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              {showAdvanced ? "Collapse" : "Expand"}
              {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </span>
          </button>

          {showAdvanced && (
            <div className="border-t border-slate-200 p-6 dark:border-slate-800">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "Timeout",
                  "Schedule Time",
                  "Idempotency Key",
                  "Retry Policy",
                ].map((option) => (
                  <div key={option} className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-center text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400">
                    {option}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <button
            type="button"
            className="rounded-lg border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Submit Job
            <Play size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}