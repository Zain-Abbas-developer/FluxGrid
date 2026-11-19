import React, { useState } from "react";
import {
  Plus,
  Key,
  ShieldAlert,
  Copy,
  Check,
  MoreHorizontal,
  X,
  Loader2,
  Lock,
} from "lucide-react";

// Types
interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  scopes: string;
  lastUsed: string;
  expires: string;
  status: "Active" | "Revoked";
}

// Mock Data
const initialKeys: ApiKey[] = [
  {
    id: "key-1",
    name: "Dev Key",
    prefix: "fg_***",
    scopes: "Jobs Rw",
    lastUsed: "2023-10-24",
    expires: "2024-10-24",
    status: "Active",
  },
  {
    id: "key-2",
    name: "Prod Key",
    prefix: "fg_***",
    scopes: "Read",
    lastUsed: "2023-10-23",
    expires: "Never",
    status: "Active",
  },
];

const availableScopes = [
  "Jobs Read",
  "Jobs Write",
  "Results Read",
  "Other authorized",
];

export default function ApiKeys(): React.ReactElement {
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys);
  
  // UI State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSecret, setGeneratedSecret] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Form State
  const [keyName, setKeyName] = useState("");
  const [selectedScopes, setSelectedScopes] = useState<string[]>(["Jobs Read"]);
  const [expiration, setExpiration] = useState("30 days");

  // Handlers
  const handleToggleScope = (scope: string) => {
    setSelectedScopes((prev) =>
      prev.includes(scope)
        ? prev.filter((s) => s !== scope)
        : [...prev, scope]
    );
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyName.trim() || selectedScopes.length === 0) return;

    setIsGenerating(true);

    // Simulate API Generation
    setTimeout(() => {
      // Generate a mock secret
      const secret = `fg_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
      
      const newKey: ApiKey = {
        id: `key-${Date.now()}`,
        name: keyName,
        prefix: "fg_***",
        scopes: selectedScopes.map(s => s.split(" ")[0]).join(", "), // e.g., "Jobs, Results"
        lastUsed: "Never",
        expires: expiration === "Never" ? "Never" : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // Mock 30 days
        status: "Active",
      };

      setKeys([newKey, ...keys]);
      setGeneratedSecret(secret);
      setIsGenerating(false);
      setIsFormOpen(false);
      
      // Reset Form
      setKeyName("");
      setSelectedScopes(["Jobs Read"]);
      setExpiration("30 days");
    }, 1200);
  };

  const handleCopy = () => {
    if (!generatedSecret) return;
    navigator.clipboard.writeText(generatedSecret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCloseSecret = () => {
    setGeneratedSecret(null);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          API KEYS
        </h1>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
            isFormOpen
              ? "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isFormOpen ? <X size={16} /> : <Plus size={16} />}
          {isFormOpen ? "Cancel Creation" : "CREATE KEY"}
        </button>
      </div>

      {/* ONE-TIME SECRET REVEAL */}
      {generatedSecret && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 shadow-sm dark:border-amber-900/50 dark:bg-amber-500/10">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-amber-100 p-2 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
              <ShieldAlert size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-amber-800 dark:text-amber-400">
                Save your API Key
              </h3>
              <p className="mt-1 text-xs text-amber-700 dark:text-amber-500/80">
                Please copy this key and store it securely. It will <strong>not</strong> be shown again.
              </p>
              
              <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row">
                <code className="w-full flex-1 truncate rounded-lg border border-amber-200 bg-white px-4 py-2 font-mono text-sm text-slate-800 dark:border-amber-800 dark:bg-[#0f172a] dark:text-slate-200">
                  {generatedSecret}
                </code>
                <button
                  onClick={handleCopy}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-600 sm:w-auto"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Copied!" : "Copy Key"}
                </button>
              </div>
            </div>
            <button 
              onClick={handleCloseSecret}
              className="text-amber-500 hover:text-amber-700 dark:hover:text-amber-300"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* TABLE SECTION */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-200 text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/70">
              <tr>
                {[
                  "Key Name",
                  "Prefix",
                  "Scopes",
                  "Last Used",
                  "Expires",
                  "Status",
                  "Actions",
                ].map((heading) => (
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
              {keys.map((key) => (
                <tr
                  key={key.id}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                >
                  <td className="px-5 py-4 text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <Key size={14} className="text-slate-400" />
                    {key.name}
                  </td>
                  <td className="px-5 py-4 font-mono text-sm text-slate-600 dark:text-slate-300">
                    {key.prefix}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {key.scopes}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">
                    {key.lastUsed}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">
                    {key.expires}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                        key.status === "Active"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                      }`}
                    >
                      {key.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE KEY FORM */}
      {isFormOpen && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-[#0f172a] animate-in fade-in slide-in-from-top-4 duration-200">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            <Key size={16} className="text-blue-500" />
            CREATE API KEY
          </h2>
          
          <form onSubmit={handleGenerate} className="space-y-5">
            {/* Key Name */}
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                Key Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g., CI/CD Pipeline Key"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                className="w-full max-w-md rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#111827] dark:text-white"
              />
            </div>

            {/* Scopes */}
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-500 dark:text-slate-400">
                Scopes
              </label>
              <div className="flex flex-wrap gap-2">
                {availableScopes.map((scope) => {
                  const isSelected = selectedScopes.includes(scope);
                  return (
                    <button
                      key={scope}
                      type="button"
                      onClick={() => handleToggleScope(scope)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                        isSelected
                          ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-500/10 dark:text-blue-400"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-400 dark:hover:bg-slate-800"
                      }`}
                    >
                      [{scope}]
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Expiration */}
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                Expiration
              </label>
              <div className="relative w-full max-w-50">
                <select
                  value={expiration}
                  onChange={(e) => setExpiration(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-8 text-sm text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
                >
                  <option value="30 days">30 days</option>
                  <option value="90 days">90 days</option>
                  <option value="1 year">1 year</option>
                  <option value="Never">Never</option>
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-2.5 text-slate-400" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isGenerating || !keyName.trim() || selectedScopes.length === 0}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
              >
                {isGenerating && <Loader2 size={16} className="animate-spin" />}
                {isGenerating ? "Generating..." : "Generate Key"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SECURITY FOOTER */}
      <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-500 dark:border-slate-800 dark:bg-[#111827] dark:text-slate-400">
        <Lock size={16} className="text-emerald-500" />
        <p>
          <strong className="text-slate-700 dark:text-slate-300">SECURITY:</strong> Full secret shown once. Store only a secure hash on backend.
        </p>
      </div>

    </div>
  );
}

// Helper Icon for the select dropdown
function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}