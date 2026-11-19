import React, { useState } from "react";
import {
  Copy,
  Check,
  Terminal,
  ExternalLink,
  ShieldCheck,
  Code2,
  BookOpen,
  Link as LinkIcon,
} from "lucide-react";

// Mock Data
const endpoints = [
  { method: "POST", path: "/api/v1/jobs", desc: "Submit a job" },
  { method: "GET", path: "/api/v1/jobs/:jobId", desc: "Get job status" },
  { method: "GET", path: "/api/v1/jobs/:jobId/result", desc: "Retrieve authorized result" },
  { method: "POST", path: "/api/v1/jobs/:jobId/cancel", desc: "Request cancellation" },
];

const codeSnippet = `// Example request
fetch('/api/v1/jobs', { method: 'POST' })`;

export default function DeveloperDoc(): React.ReactElement {
  const [activeTab, setActiveTab] = useState("API Reference");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedAuth, setCopiedAuth] = useState(false);

  const tabs = ["API Reference", "SDKs", "Examples", "Error Codes"];

  const handleCopy = (text: string, type: "code" | "auth") => {
    navigator.clipboard.writeText(text);
    if (type === "code") {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedAuth(true);
      setTimeout(() => setCopiedAuth(false), 2000);
    }
  };

  // Helper for HTTP Method colors
  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400";
      case "POST":
        return "text-blue-600 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400";
      case "PUT":
        return "text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400";
      case "DELETE":
        return "text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400";
      default:
        return "text-slate-600 bg-slate-50 dark:bg-slate-800 dark:text-slate-400";
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          <BookOpen size={24} className="text-blue-500" />
          DEVELOPER DOCUMENTATION
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
      {activeTab === "API Reference" && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* AUTHENTICATION SECTION */}
          <section className="space-y-3">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <ShieldCheck size={16} className="text-amber-500" />
              Authentication
            </h2>
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-[#0f172a] p-4 dark:border-slate-700">
              <code className="font-mono text-sm text-slate-300">
                Authorization: <span className="text-amber-400">Bearer</span> <span className="text-emerald-400">YOUR_API_KEY</span>
              </code>
              <button
                onClick={() => handleCopy("Authorization: Bearer YOUR_API_KEY", "auth")}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                title="Copy Authorization Header"
              >
                {copiedAuth ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
              </button>
            </div>
          </section>

          {/* ENDPOINTS SECTION */}
          <section className="space-y-3">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <LinkIcon size={16} className="text-blue-500" />
              Endpoints
            </h2>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
              <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {endpoints.map((ep, index) => {
                  // Split path to highlight parameters like :jobId
                  const pathParts = ep.path.split("/");
                  
                  return (
                    <div
                      key={index}
                      className="flex flex-col gap-2 px-5 py-3 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center sm:gap-6 dark:hover:bg-slate-800/40"
                    >
                      <div className="w-16 shrink-0">
                        <span className={`inline-flex rounded px-2 py-0.5 text-[11px] font-bold tracking-wider ${getMethodColor(ep.method)}`}>
                          {ep.method}
                        </span>
                      </div>
                      
                      <div className="flex-1 font-mono text-sm font-medium text-slate-800 dark:text-slate-200">
                        {pathParts.map((part, i) => {
                          if (!part) return null;
                          const isParam = part.startsWith(":");
                          return (
                            <React.Fragment key={i}>
                              <span className="text-slate-400">/</span>
                              {isParam ? (
                                <span className="text-amber-500">{part}</span>
                              ) : (
                                <span>{part}</span>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>
                      
                      <div className="flex-1 text-sm text-slate-500 dark:text-slate-400">
                        {ep.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CODE EXAMPLE SECTION */}
          <section className="space-y-3">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <Code2 size={16} className="text-violet-500" />
              Code Example
            </h2>
            <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm dark:border-slate-800">
              <div className="flex items-center justify-between bg-slate-50 px-4 py-2 border-b border-slate-200 dark:bg-[#0f172a] dark:border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  JavaScript
                </span>
                <button
                  onClick={() => handleCopy(codeSnippet, "code")}
                  className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  {copiedCode ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  {copiedCode ? "Copied" : "Copy"}
                </button>
              </div>
              <div className="bg-[#0f172a] p-5 overflow-x-auto">
                <pre className="font-mono text-sm">
                  <code>
                    <span className="text-slate-500">{`// Example request\n`}</span>
                    <span className="text-violet-400">fetch</span>
                    <span className="text-slate-300">{`('/api/v1/jobs', { `}</span>
                    <span className="text-blue-400">method</span>
                    <span className="text-slate-300">: </span>
                    <span className="text-emerald-400">'POST'</span>
                    <span className="text-slate-300">{` })`}</span>
                  </code>
                </pre>
              </div>
            </div>
          </section>

          {/* FOOTER ACTIONS */}
          <div className="flex flex-col-reverse items-center justify-end gap-3 pt-4 sm:flex-row border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => handleCopy(codeSnippet, "code")}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:w-auto dark:border-slate-700 dark:bg-[#111827] dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Copy size={16} />
              [Copy Example]
            </button>
            
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto">
              <Terminal size={16} />
              [Open API Playground]
              <ExternalLink size={14} className="ml-1 opacity-70" />
            </button>
          </div>

        </div>
      )}

      {/* Fallback for other tabs */}
      {activeTab !== "API Reference" && (
        <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center dark:border-slate-700 dark:bg-[#111827]">
          <BookOpen size={32} className="mb-3 text-slate-400" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">
            {activeTab} Documentation
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            This section is currently being updated.
          </p>
        </div>
      )}

    </div>
  );
}