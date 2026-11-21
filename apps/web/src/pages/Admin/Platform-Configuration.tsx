import React, { useState } from "react";
import {
  Settings,
  Save,
  Loader2,
  Check,
  ChevronDown,
  Sliders,
  ShieldAlert,
  Database,
} from "lucide-react";

export default function PlatformConfiguration(): React.ReactElement {
  const [activeTab, setActiveTab] = useState("General");
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    defaultQueue: "default",
    defaultPriority: "Normal",
    defaultAttempts: 3,
    requestsPerMinute: 1000,
    maxPayloadSize: 10,
    completedRetention: 30,
    failedRetention: 7,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsSaved(false); // Reset saved state on change
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API Call
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1000);
  };

  const tabs = ["General", "Job Defaults", "Rate Limits", "Retention", "Integrations"];

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          <Settings size={24} className="text-blue-500" />
          PLATFORM CONFIGURATION
        </h1>
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

      {/* MAIN CONTENT AREA */}
      {activeTab === "General" && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* DEFAULT JOB SETTINGS */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
            <h2 className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <Sliders size={18} className="text-blue-500" />
              Default Job Settings
            </h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                  Default Queue
                </label>
                <input
                  type="text"
                  name="defaultQueue"
                  value={formData.defaultQueue}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#0f172a] dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                  Default Priority
                </label>
                <div className="relative">
                  <select
                    name="defaultPriority"
                    value={formData.defaultPriority}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-8 text-sm text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#0f172a] dark:text-slate-200"
                  >
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-3 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                  Default Attempts
                </label>
                <input
                  type="number"
                  name="defaultAttempts"
                  min="1"
                  max="10"
                  value={formData.defaultAttempts}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#0f172a] dark:text-white"
                />
              </div>
            </div>
          </section>

          {/* RATE LIMITS */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
            <h2 className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <ShieldAlert size={18} className="text-amber-500" />
              Rate Limits
            </h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                  Requests per minute
                </label>
                <input
                  type="number"
                  name="requestsPerMinute"
                  value={formData.requestsPerMinute}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#0f172a] dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                  Max Payload Size (MB)
                </label>
                <input
                  type="number"
                  name="maxPayloadSize"
                  value={formData.maxPayloadSize}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#0f172a] dark:text-white"
                />
              </div>
            </div>
          </section>

          {/* DATA RETENTION */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
            <h2 className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <Database size={18} className="text-violet-500" />
              Data Retention
            </h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                  Completed Job Retention (Days)
                </label>
                <input
                  type="number"
                  name="completedRetention"
                  value={formData.completedRetention}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#0f172a] dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                  Failed Job Retention (Days)
                </label>
                <input
                  type="number"
                  name="failedRetention"
                  value={formData.failedRetention}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#0f172a] dark:text-white"
                />
              </div>
            </div>
          </section>

        </div>
      )}

      {/* Fallback for other tabs */}
      {activeTab !== "General" && (
        <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center dark:border-slate-700 dark:bg-[#111827]">
          <Settings size={32} className="mb-3 text-slate-400" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">
            {activeTab} Configuration
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            This section is currently under construction.
          </p>
        </div>
      )}

      {/* FOOTER ACTION */}
      <div className="flex items-center justify-end border-t border-slate-200 pt-6 dark:border-slate-800">
        <button
          onClick={handleSave}
          disabled={isSaving || isSaved}
          className={`flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium text-white transition ${
            isSaved
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
          }`}
        >
          {isSaving ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Saving...
            </>
          ) : isSaved ? (
            <>
              <Check size={16} />
              Saved!
            </>
          ) : (
            <>
              <Save size={16} />
              Save Configuration
            </>
          )}
        </button>
      </div>

    </div>
  );
}