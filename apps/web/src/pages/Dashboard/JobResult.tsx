import React, { useState } from "react";
import {
  Download,
  ChevronDown,
  Copy,
  ArrowLeft,
  CheckCircle2,
  FileJson,
  Code2,
  Database,
  Check,
} from "lucide-react";

export default function JobResult(): React.ReactElement {
  const [activeTab, setActiveTab] = useState("Formatted JSON");
  const [copied, setCopied] = useState(false);

  // Mock Data
  const jobResult = {
    jobId: "job_abc123",
    status: "COMPLETED",
    completedAt: "2023-10-24 10:45 AM",
    duration: "2.8 sec",
    formattedJson: `{
  "success": true,
  "result": {
    "reportId": "rep-998877",
    "generatedAt": "2023-10-24T10:45:00Z",
    "itemsProcessed": 1542,
    "errors": []
  }
}`,
    rawOutput: `{"success":true,"result":{"reportId":"rep-998877","generatedAt":"2023-10-24T10:45:00Z","itemsProcessed":1542,"errors":[]}}`,
    metadata: `{
  "workerNode": "worker-02",
  "memoryUsed": "124MB",
  "cpuTime": "1.2s",
  "retries": 0
}`,
  };

  const tabs = [
    { name: "Formatted JSON", icon: FileJson },
    { name: "Raw Output", icon: Code2 },
    { name: "Metadata", icon: Database },
  ];

  // Get current content based on tab
  const getCurrentContent = () => {
    switch (activeTab) {
      case "Formatted JSON":
        return jobResult.formattedJson;
      case "Raw Output":
        return jobResult.rawOutput;
      case "Metadata":
        return jobResult.metadata;
      default:
        return "";
    }
  };

  // Copy to clipboard handler
  const handleCopy = () => {
    navigator.clipboard.writeText(getCurrentContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download handler
  const handleDownload = () => {
    const blob = new Blob([getCurrentContent()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${jobResult.jobId}-result.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          JOB RESULT
        </h1>
        <button 
          onClick={handleDownload}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Download Result
          <ChevronDown size={16} />
        </button>
      </div>

      {/* META INFO */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2 dark:border-slate-800 dark:bg-[#111827]">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 sm:border-none sm:pb-0 dark:border-slate-800/50">
          <span className="text-sm text-slate-500 dark:text-slate-400">Job ID</span>
          <span className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-200">
            {jobResult.jobId}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 sm:border-none sm:pb-0 dark:border-slate-800/50">
          <span className="text-sm text-slate-500 dark:text-slate-400">Status</span>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
            <CheckCircle2 size={14} />
            {jobResult.status}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 sm:border-none sm:pb-0 dark:border-slate-800/50">
          <span className="text-sm text-slate-500 dark:text-slate-400">Completed At</span>
          <span className="font-mono text-sm text-slate-900 dark:text-slate-200">
            {jobResult.completedAt}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500 dark:text-slate-400">Duration</span>
          <span className="font-mono text-sm text-slate-900 dark:text-slate-200">
            {jobResult.duration}
          </span>
        </div>
      </div>

      {/* TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.name;
          return (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400"
                  : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
              }`}
            >
              <Icon size={16} />
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* CODE BLOCK */}
      <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm dark:border-slate-800">
        <div className="flex items-center justify-between bg-slate-50 px-4 py-2 border-b border-slate-200 dark:bg-[#0f172a] dark:border-slate-800">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {activeTab}
          </span>
        </div>
        <div className="bg-[#0f172a] p-5 overflow-x-auto">
          <pre className="text-sm font-mono text-emerald-400">
            <code>{getCurrentContent()}</code>
          </pre>
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex flex-col-reverse justify-between gap-4 pt-4 sm:flex-row sm:items-center">
        <button 
          className="flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Job
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
            {copied ? "Copied!" : "Copy Output"}
          </button>
          
          <button
            onClick={handleDownload}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Download size={16} />
            Download JSON
          </button>
        </div>
      </div>
    </div>
  );
}