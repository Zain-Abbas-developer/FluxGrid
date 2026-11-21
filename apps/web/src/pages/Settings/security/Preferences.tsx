import React, { useState } from "react";
import {
  Sliders,
  Palette,
  Globe,
  LayoutDashboard,
  Bell,
  ChevronDown,
  Save,
  Loader2,
  Check,
  Monitor,
  Sun,
  Moon,
} from "lucide-react";

export default function Preferences(): React.ReactElement {
  // Form State
  const [theme, setTheme] = useState<"Light" | "Dark" | "System">("System");
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("Asia/Karachi");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  
  // Dashboard State
  const [showRecentJobs, setShowRecentJobs] = useState(true);
  const [showQueueHealth, setShowQueueHealth] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState("30 seconds");

  // Notification State
  const [notifyJobFailures, setNotifyJobFailures] = useState(true);
  const [notifySecurityAlerts, setNotifySecurityAlerts] = useState(true);
  const [notifyProductUpdates, setNotifyProductUpdates] = useState(false);

  // UI State
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000); // Reset after 3s
    }, 1000);
  };

  // Reusable Checkbox Component
  const Checkbox = ({ 
    label, 
    checked, 
    onChange 
  }: { 
    label: string; 
    checked: boolean; 
    onChange: () => void 
  }) => (
    <label className="flex cursor-pointer items-center gap-3 group">
      <div className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
        checked 
          ? "border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-500" 
          : "border-slate-300 bg-white group-hover:border-blue-400 dark:border-slate-600 dark:bg-[#0f172a]"
      }`}>
        {checked && <Check size={14} strokeWidth={3} />}
      </div>
      <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white select-none">
        {label}
      </span>
    </label>
  );

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          <Sliders size={24} className="text-blue-500" />
          PREFERENCES
        </h1>
      </div>

      <div className="space-y-6">
        
        {/* APPEARANCE */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            <Palette size={18} className="text-violet-500" />
            Appearance
          </h2>
          
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 w-24">
              Theme:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "Light", icon: Sun },
                { name: "Dark", icon: Moon },
                { name: "System", icon: Monitor },
              ].map((t) => {
                const Icon = t.icon;
                const isActive = theme === t.name;
                return (
                  <button
                    key={t.name}
                    onClick={() => setTheme(t.name as any)}
                    className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-500/10 dark:text-blue-400"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-[#0f172a] dark:text-slate-400 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Icon size={16} />
                    [{t.name}]
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* LANGUAGE & REGION */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            <Globe size={18} className="text-emerald-500" />
            Language & Region
          </h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                Language
              </label>
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-8 text-sm text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#0f172a] dark:text-slate-200"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="Urdu">Urdu</option>
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-2.5 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                Timezone
              </label>
              <div className="relative">
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-8 text-sm text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#0f172a] dark:text-slate-200"
                >
                  <option value="Asia/Karachi">Asia/Karachi</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="Europe/London">Europe/London</option>
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-2.5 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                Date Format
              </label>
              <div className="relative">
                <select
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-8 text-sm text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#0f172a] dark:text-slate-200"
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-2.5 text-slate-400" />
              </div>
            </div>
          </div>
        </section>

        {/* DASHBOARD */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            <LayoutDashboard size={18} className="text-blue-500" />
            Dashboard
          </h2>
          
          <div className="space-y-4">
            <Checkbox 
              label="Show recent jobs" 
              checked={showRecentJobs} 
              onChange={() => setShowRecentJobs(!showRecentJobs)} 
            />
            <Checkbox 
              label="Show queue health" 
              checked={showQueueHealth} 
              onChange={() => setShowQueueHealth(!showQueueHealth)} 
            />
            <Checkbox 
              label="Auto-refresh dashboard" 
              checked={autoRefresh} 
              onChange={() => setAutoRefresh(!autoRefresh)} 
            />
            
            <div className={`flex flex-col gap-2 pl-8 pt-2 transition-opacity ${autoRefresh ? "opacity-100" : "opacity-50"}`}>
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Refresh Interval
              </label>
              <div className="relative w-48">
                <select
                  value={refreshInterval}
                  onChange={(e) => setRefreshInterval(e.target.value)}
                  disabled={!autoRefresh}
                  className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-1.5 pr-8 text-sm text-slate-700 outline-none transition focus:border-blue-500 disabled:cursor-not-allowed dark:border-slate-700 dark:bg-[#0f172a] dark:text-slate-200"
                >
                  <option value="15 seconds">15 seconds</option>
                  <option value="30 seconds">30 seconds</option>
                  <option value="1 minute">1 minute</option>
                  <option value="5 minutes">5 minutes</option>
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-2 text-slate-400" />
              </div>
            </div>
          </div>
        </section>

        {/* NOTIFICATIONS */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            <Bell size={18} className="text-amber-500" />
            Notifications
          </h2>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-8">
            <Checkbox 
              label="Job failures" 
              checked={notifyJobFailures} 
              onChange={() => setNotifyJobFailures(!notifyJobFailures)} 
            />
            <Checkbox 
              label="Security alerts" 
              checked={notifySecurityAlerts} 
              onChange={() => setNotifySecurityAlerts(!notifySecurityAlerts)} 
            />
            <Checkbox 
              label="Product updates" 
              checked={notifyProductUpdates} 
              onChange={() => setNotifyProductUpdates(!notifyProductUpdates)} 
            />
          </div>
        </section>

      </div>

      {/* FOOTER ACTION */}
      <div className="flex justify-end border-t border-slate-200 pt-6 dark:border-slate-800">
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
              Save Preferences
            </>
          )}
        </button>
      </div>

    </div>
  );
}