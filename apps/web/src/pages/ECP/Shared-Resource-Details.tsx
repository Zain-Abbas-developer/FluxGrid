import React, { useState } from "react";
import {
  ArrowLeft,
  Share2,
  Lock,
  CheckCircle2,
  Download,
  FileText,
  Calendar,
  Eye,
  AlertTriangle,
} from "lucide-react";

// Mock Data
const resourceData = {
  id: "job_101",
  name: "Monthly Report",
  sharedBy: "Organization Alpha",
  access: "View Only",
  status: "COMPLETED",
  lastUpdated: "2023-10-24 10:45 AM",
  previewContent: `{
  "reportId": "rep-9988",
  "status": "success",
  "generatedAt": "2023-10-24T10:45:00Z",
  "summary": {
    "totalProcessed": 1542,
    "errors": 0
  }
}`,
};

export default function SharedResourceDetail(): React.ReactElement {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPermissionError, setShowPermissionError] = useState(false);

  const tabs = ["Overview", "Result", "Available files"];

  const handleDownload = () => {
    // Simulate checking permissions
    if (resourceData.access === "View Only") {
      setShowPermissionError(true);
      setTimeout(() => setShowPermissionError(false), 4000);
      return;
    }
    
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert("Download started!");
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
          <Share2 size={24} className="text-blue-500" />
          SHARED RESOURCE: <span className="font-mono text-blue-600 dark:text-blue-400">{resourceData.id}</span>
        </h1>
        
        <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-300 dark:hover:bg-slate-800">
          <ArrowLeft size={16} />
          Back to Shared Jobs
        </button>
      </div>

      {/* METADATA CARD */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Resource Name</p>
            <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-200">
              <FileText size={16} className="text-slate-400" />
              {resourceData.name}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Shared By</p>
            <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-200">
              <Share2 size={16} className="text-slate-400" />
              {resourceData.sharedBy}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Access Level</p>
            <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-400">
              <Lock size={16} />
              {resourceData.access}
            </p>
          </div>
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
          
          {/* STATUS BAR */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 rounded-lg bg-slate-50 p-4 dark:bg-[#0f172a]">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">STATUS:</span>
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                <CheckCircle2 size={14} />
                {resourceData.status}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={16} className="text-slate-400" />
              <span className="text-slate-500 dark:text-slate-400">Last Updated:</span>
              <span className="font-mono font-medium text-slate-900 dark:text-slate-200">
                {resourceData.lastUpdated}
              </span>
            </div>
          </div>

          {/* RESULT PREVIEW */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <Eye size={16} className="text-violet-500" />
              Result Preview
            </h3>
            <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm dark:border-slate-800">
              <div className="flex items-center justify-between bg-slate-50 px-4 py-2 border-b border-slate-200 dark:bg-[#0f172a] dark:border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Authorized Data
                </span>
              </div>
              <pre className="bg-[#0f172a] p-5 overflow-x-auto font-mono text-sm text-emerald-400">
                <code>{resourceData.previewContent}</code>
              </pre>
            </div>
          </div>

          {/* DOWNLOAD ACTION */}
          <div className="flex flex-col border-t border-slate-200 pt-6 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Download size={16} />
                [Download Result*]
              </button>
              
              {showPermissionError && (
                <span className="flex items-center gap-1.5 text-sm font-medium text-red-500 animate-in fade-in slide-in-from-left-2">
                  <AlertTriangle size={16} />
                  Download denied. You only have View Only access.
                </span>
              )}
            </div>
            <p className="mt-2 text-xs italic text-slate-500 dark:text-slate-400">
              *Only if download permission was explicitly granted.
            </p>
          </div>
        </div>
      )}

      {/* Fallback for other tabs */}
      {activeTab !== "Overview" && (
        <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center dark:border-slate-700 dark:bg-[#111827]">
          <FileText size={32} className="mb-3 text-slate-400" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">
            {activeTab} Data
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Content for this tab is not available in the preview.
          </p>
        </div>
      )}

    </div>
  );
}