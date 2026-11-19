import React, { useState } from "react";
import {
  Send,
  Copy,
  Save,
  ChevronDown,
  Loader2,
  Check,
  BookOpen,
  Code2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// Types
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiResponse {
  status: number;
  statusText: string;
  body: string;
  headers: string;
  timing: string;
}

export default function APIPlayground(): React.ReactElement {
  // Request State
  const [method, setMethod] = useState<HttpMethod>("POST");
  const [endpoint, setEndpoint] = useState("https://api.example.com/api/v1/jobs");
  const [requestTab, setRequestTab] = useState("Body");
  const [requestBody, setRequestBody] = useState(
    '{\n  "type": "report",\n  "payload": {}\n}'
  );

  // Response State
  const [responseTab, setResponseTab] = useState("Body");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>({
    status: 202,
    statusText: "Accepted",
    body: '{\n  "jobId": "job_abc123",\n  "status": "queued"\n}',
    headers:
      'content-type: application/json\nx-ratelimit-limit: 1000\nx-request-id: req_998877',
    timing: "124ms",
  });

  // UI State
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [jsonError, setJsonError] = useState(false);

  // Method Colors
  const methodColors: Record<HttpMethod, string> = {
    GET: "text-emerald-600 dark:text-emerald-400",
    POST: "text-blue-600 dark:text-blue-400",
    PUT: "text-amber-600 dark:text-amber-400",
    DELETE: "text-red-600 dark:text-red-400",
    PATCH: "text-violet-600 dark:text-violet-400",
  };

  const handleValidateJson = (value: string) => {
    setRequestBody(value);
    if (!value.trim()) {
      setJsonError(false);
      return;
    }
    try {
      JSON.parse(value);
      setJsonError(false);
    } catch {
      setJsonError(true);
    }
  };

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(requestBody);
      setRequestBody(JSON.stringify(parsed, null, 2));
      setJsonError(false);
    } catch {
      setJsonError(true);
    }
  };

  const handleSendRequest = () => {
    if (jsonError) return;
    setIsLoading(true);

    // Simulate API Network Request
    setTimeout(() => {
      setIsLoading(false);
      setResponse({
        status: 202,
        statusText: "Accepted",
        body: `{\n  "jobId": "job_${Math.random().toString(36).substring(7)}",\n  "status": "queued",\n  "timestamp": "${new Date().toISOString()}"\n}`,
        headers:
          'content-type: application/json\nx-ratelimit-limit: 1000\nx-ratelimit-remaining: 999',
        timing: `${Math.floor(Math.random() * 100 + 50)}ms`,
      });
    }, 1200);
  };

  const handleCopyResponse = () => {
    if (!response) return;
    navigator.clipboard.writeText(response.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveRequest = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          API PLAYGROUND
        </h1>
        <button className="flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700 dark:text-blue-400">
          <BookOpen size={16} />
          API Documentation
        </button>
      </div>

      {/* REQUEST SECTION */}
      <div className="space-y-4">
        {/* URL Bar */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative w-full sm:w-32">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as HttpMethod)}
              className={`w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#0f172a] ${methodColors[method]}`}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-3 top-4 text-slate-400" />
          </div>
          
          <input
            type="text"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            className="w-full flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#111827] dark:text-white"
          />
        </div>

        {/* Request Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-200 pt-2 dark:border-slate-800">
          {["Params", "Headers", "Authorization", "Body"].map((tab) => (
            <button
              key={tab}
              onClick={() => setRequestTab(tab)}
              className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                requestTab === tab
                  ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400"
                  : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
              }`}
            >
              [{tab}]
            </button>
          ))}
        </div>

        {/* Request Body Editor */}
        {requestTab === "Body" && (
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-800 dark:bg-[#0f172a]">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <Code2 size={14} /> Request Body (JSON)
              </span>
              <div className="flex items-center gap-3">
                {jsonError && (
                  <span className="flex items-center gap-1 text-xs font-medium text-red-500">
                    <AlertCircle size={12} /> Invalid JSON
                  </span>
                )}
                <button
                  onClick={handleFormatJson}
                  className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  Format JSON
                </button>
              </div>
            </div>
            <textarea
              value={requestBody}
              onChange={(e) => handleValidateJson(e.target.value)}
              spellCheck={false}
              rows={6}
              className="w-full resize-y bg-[#0f172a] p-4 font-mono text-sm text-emerald-400 outline-none"
            />
          </div>
        )}

        {/* Send Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSendRequest}
            disabled={isLoading || jsonError}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Request
                <Send size={16} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* RESPONSE SECTION */}
      {response && (
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pt-4 dark:border-slate-800">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Response
            </h2>
            <div className="flex items-center gap-4">
              <span
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                  response.status >= 200 && response.status < 300
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                }`}
              >
                {response.status >= 200 && response.status < 300 ? (
                  <CheckCircle2 size={14} />
                ) : (
                  <AlertCircle size={14} />
                )}
                HTTP {response.status} {response.statusText}
              </span>
            </div>
          </div>

          {/* Response Tabs */}
          <div className="flex items-center gap-1">
            {["Body", "Headers", "Timing"].map((tab) => (
              <button
                key={tab}
                onClick={() => setResponseTab(tab)}
                className={`rounded-lg px-4 py-1.5 text-sm font-medium transition ${
                  responseTab === tab
                    ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800/50"
                }`}
              >
                [{tab}]
              </button>
            ))}
            <span className="ml-auto text-xs font-mono text-slate-500">
              Time: {response.timing}
            </span>
          </div>

          {/* Response Content */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
            {responseTab === "Body" && (
              <textarea
                readOnly
                value={response.body}
                spellCheck={false}
                rows={6}
                className="w-full resize-y bg-[#0f172a] p-4 font-mono text-sm text-emerald-400 outline-none"
              />
            )}
            {responseTab === "Headers" && (
              <textarea
                readOnly
                value={response.headers}
                spellCheck={false}
                rows={4}
                className="w-full resize-y bg-[#0f172a] p-4 font-mono text-sm text-blue-300 outline-none"
              />
            )}
            {responseTab === "Timing" && (
              <div className="p-4 text-sm text-slate-600 dark:text-slate-300 font-mono">
                <p>DNS Lookup: 12ms</p>
                <p>TCP Connection: 24ms</p>
                <p>TLS Setup: 45ms</p>
                <p>Time to First Byte (TTFB): 110ms</p>
                <p className="mt-2 font-bold text-slate-900 dark:text-white">Total Time: {response.timing}</p>
              </div>
            )}
          </div>

          {/* Response Footer Actions */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            <button
              onClick={handleCopyResponse}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
              {copied ? "Copied!" : "Copy Response"}
            </button>
            <button
              onClick={handleSaveRequest}
              className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              {saved ? <Check size={16} className="text-emerald-500" /> : <Save size={16} />}
              {saved ? "Saved!" : "Save Request"}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}