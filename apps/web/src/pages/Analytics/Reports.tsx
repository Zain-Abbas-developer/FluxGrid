import React, { useState } from "react";
import {
  Plus,
  ChevronDown,
  Eye,
  Download,
  FileText,
  Calendar,
  Loader2,
} from "lucide-react";

// Mock Initial Data
const initialReports = [
  {
    id: "rep-1",
    name: "Weekly Jobs",
    type: "Job Summary",
    period: "7 Days",
    created: "2023-10-24",
    status: "Ready",
  },
  {
    id: "rep-2",
    name: "Failure Report",
    type: "Errors",
    period: "30 Days",
    created: "2023-10-23",
    status: "Ready",
  },
  {
    id: "rep-3",
    name: "Usage Summary",
    type: "Usage",
    period: "Month",
    created: "2023-10-24",
    status: "Queued",
  },
];

export default function Reports(): React.ReactElement {
  const [reports, setReports] = useState(initialReports);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    type: "Job Summary",
    startDate: "",
    endDate: "",
    format: "CSV",
  });
  const [isGenerating, setIsGenerating] = useState(false);

  // Status Badge Colors
  const statusColors: Record<string, string> = {
    Ready: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    Queued: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    Processing: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsGenerating(true);

    // Simulate API call & report generation
    setTimeout(() => {
      const newReport = {
        id: `rep-${Date.now()}`,
        name: formData.name,
        type: formData.type,
        period: formData.startDate && formData.endDate 
          ? `${formData.startDate} to ${formData.endDate}` 
          : "Custom",
        created: new Date().toISOString().split("T")[0],
        status: "Queued",
      };

      setReports([newReport, ...reports]);
      setIsGenerating(false);
      
      // Reset form
      setFormData({
        name: "",
        type: "Job Summary",
        startDate: "",
        endDate: "",
        format: "CSV",
      });
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          REPORTS
        </h1>
        <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
          <Plus size={16} />
          CREATE REPORT
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap items-center gap-3">
        {[
          { label: "Report Type", options: ["All Types", "Job Summary", "Errors", "Usage"] },
          { label: "Date Range", options: ["All Time", "Today", "7 Days", "30 Days", "Month"] },
          { label: "Organization", options: ["All Org", "Org A", "Org B"] },
          { label: "Status", options: ["All Status", "Ready", "Queued"] },
        ].map((filter, idx) => (
          <div key={idx} className="relative min-w-35 flex-1 sm:flex-none">
            <select className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-2 pr-9 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200">
              {filter.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === "All Types" || opt === "All Time" || opt === "All Org" || opt === "All Status" 
                    ? `${filter.label}` 
                    : opt}
                </option>
              ))}
            </select>
            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-3 top-2.5 text-slate-400"
            />
          </div>
        ))}
      </div>

      {/* TABLE SECTION */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-200 text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/70">
              <tr>
                {["Report Name", "Type", "Period", "Created", "Status", "Action"].map((heading) => (
                  <th
                    key={heading}
                    className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {reports.map((report) => (
                <tr
                  key={report.id}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                >
                  <td className="px-5 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                    {report.name}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {report.type}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {report.period}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">
                    {report.created}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${statusColors[report.status] || "bg-slate-100 text-slate-700"}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10">
                      {report.status === "Ready" && report.type === "Errors" ? (
                        <>
                          <Download size={14} /> Download
                        </>
                      ) : (
                        <>
                          <Eye size={14} /> View
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE REPORT FORM */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-[#0f172a]">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          <FileText size={16} className="text-blue-500" />
          CREATE REPORT
        </h2>
        
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Report Name */}
            <div className="lg:col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Q3 Usage Report"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#111827] dark:text-white"
              />
            </div>

            {/* Report Type */}
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                Type
              </label>
              <div className="relative">
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-8 text-sm text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
                >
                  <option value="Job Summary">Job Summary</option>
                  <option value="Errors">Errors</option>
                  <option value="Usage">Usage</option>
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-2.5 text-slate-400" />
              </div>
            </div>

            {/* Format */}
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                Format
              </label>
              <div className="relative">
                <select
                  value={formData.format}
                  onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                  className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-8 text-sm text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
                >
                  <option value="CSV">CSV</option>
                  <option value="JSON">JSON</option>
                  <option value="PDF">PDF</option>
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-2.5 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Period (Dates) */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 min-w-12.5">
              Period:
            </span>
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1 sm:max-w-50">
                <Calendar size={14} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
                />
              </div>
              <span className="text-sm text-slate-500">to</span>
              <div className="relative flex-1 sm:max-w-50">
                <Calendar size={14} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isGenerating || !formData.name.trim()}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Report"
              )}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}