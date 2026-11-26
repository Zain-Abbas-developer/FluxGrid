import React, { useState, useEffect } from "react";
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Clock,
  Database,
  Server,
  Cpu,
  ShieldAlert,
} from "lucide-react";

// Types
type StatusType = "Healthy" | "Degraded" | "Down" | "Not Configured";

interface ServiceStatus {
  name: string;
  status: StatusType;
  icon: React.ElementType;
}

// Mock Data
const initialServices: ServiceStatus[] = [
  { name: "API SERVICE", status: "Healthy", icon: Server },
  { name: "REDIS", status: "Healthy", icon: Database },
  { name: "MONGODB", status: "Healthy", icon: Database },
  { name: "WORKER FLEET", status: "Degraded", icon: Cpu },
  { name: "PYTHON COMPUTE", status: "Down", icon: Activity },
];

const activeIncidents = [
  { id: "INC-001", service: "WORKER FLEET", severity: "Medium", startedAt: "10 mins ago", status: "Investigating" },
  { id: "INC-002", service: "PYTHON COMPUTE", severity: "High", startedAt: "2 mins ago", status: "Identified" },
];

const lastChecks = [
  { component: "API SERVICE", lastCheck: "Just now", result: "Passed", details: "200 OK" },
  { component: "REDIS", lastCheck: "1 min ago", result: "Passed", details: "Ping 2ms" },
  { component: "MONGODB", lastCheck: "1 min ago", result: "Passed", details: "Connection established" },
  { component: "WORKER FLEET", lastCheck: "Just now", result: "Warning", details: "High memory usage on worker-02" },
  { component: "PYTHON COMPUTE", lastCheck: "30 sec ago", result: "Failed", details: "Connection refused" },
];

export default function SystemHealth(): React.ReactElement {
  const [services] = useState(initialServices);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  
  // Simulated real-time chart data
  const [latencyData, setLatencyData] = useState([40, 35, 50, 45, 60, 55, 70, 65, 80, 75, 90, 85]);
  const [errorData, setErrorData] = useState([2, 1, 3, 2, 4, 1, 5, 2, 3, 1, 2, 1]);

  // Simulated "Real-time" polling
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Update last updated time
      setLastUpdated(new Date().toLocaleTimeString());

      // 2. Slightly fluctuate chart data to make it look "live"
      setLatencyData(prev => prev.map(val => Math.max(20, Math.min(100, val + (Math.random() * 20 - 10)))));
      setErrorData(prev => prev.map(val => Math.max(0, Math.min(10, val + (Math.random() * 2 - 1)))));

      // 3. Randomly flip Worker Fleet status to simulate a real environment
      // (Uncomment the lines below to see the overall status change automatically)
      /*
      setServices(prev => prev.map(svc => {
        if (svc.name === "WORKER FLEET") {
           return { ...svc, status: Math.random() > 0.8 ? "Healthy" : "Degraded" };
        }
        return svc;
      }));
      */

    }, 3000); // Updates every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  // Calculate Overall Status
  const getOverallStatus = (): StatusType => {
    if (services.some(s => s.status === "Down")) return "Down";
    if (services.some(s => s.status === "Degraded")) return "Degraded";
    return "Healthy";
  };

  const overallStatus = getOverallStatus();

  // Status Styling Helpers
  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case "Healthy": return "text-emerald-700 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
      case "Degraded": return "text-amber-700 bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-800";
      case "Down": return "text-red-700 bg-red-100 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-800";
      default: return "text-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700";
    }
  };

  const getStatusIcon = (status: StatusType) => {
    switch (status) {
      case "Healthy": return <CheckCircle2 size={16} />;
      case "Degraded": return <AlertTriangle size={16} />;
      case "Down": return <XCircle size={16} />;
      default: return <ShieldAlert size={16} />;
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            SYSTEM HEALTH
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live Monitoring Active (Last updated: {lastUpdated})
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 disabled:opacity-60 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <RefreshCw size={18} className={isRefreshing ? "animate-spin" : ""} />
          </button>

          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 dark:border-slate-700 dark:bg-[#111827]">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">OVERALL:</span>
            <span className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${getStatusColor(overallStatus)}`}>
              {getStatusIcon(overallStatus)}
              {overallStatus}
            </span>
          </div>
        </div>
      </div>

      {/* SERVICES LIST */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
        <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.name} className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-slate-50 p-1.5 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    <Icon size={16} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {service.name}
                  </span>
                </div>
                <span className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${getStatusColor(service.status)}`}>
                  {service.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        
        {/* REQUEST LATENCY */}
        <div className="flex h-64 flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Activity size={16} className="text-blue-500" />
              Request Latency
            </h3>
            <span className="text-xs font-mono text-slate-500">{latencyData[latencyData.length - 1]}ms</span>
          </div>
          <div className="relative flex-1 mt-4">
            <svg viewBox="0 0 100 40" className="h-full w-full overflow-visible" preserveAspectRatio="none">
              {/* Gradient Fill */}
              <defs>
                <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Dynamic Line Path (Simplified mapping) */}
              <polyline
                points={latencyData.map((val, i) => `${(i / (latencyData.length - 1)) * 100},${40 - (val / 100) * 35}`).join(" ")}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                className="transition-all duration-500 ease-in-out"
              />
              <polygon
                points={`0,40 ${latencyData.map((val, i) => `${(i / (latencyData.length - 1)) * 100},${40 - (val / 100) * 35}`).join(" ")} 100,40`}
                fill="url(#latencyGradient)"
                className="transition-all duration-500 ease-in-out"
              />
            </svg>
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-slate-400">
            <span>-60s</span><span>-30s</span><span>Now</span>
          </div>
        </div>

        {/* ERROR RATE */}
        <div className="flex h-64 flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-500" />
              Error Rate
            </h3>
            <span className="text-xs font-mono text-red-500">{errorData[errorData.length - 1]}%</span>
          </div>
          <div className="flex flex-1 items-end gap-1.5 mt-4">
            {errorData.map((val, i) => (
              <div key={i} className="group relative w-full rounded-t-sm bg-red-100 dark:bg-red-500/20 transition-all duration-500 ease-in-out" style={{ height: `${(val / 10) * 100}%` }}>
                <div className="absolute bottom-0 w-full rounded-t-sm bg-red-500 transition-all group-hover:bg-red-400" style={{ height: '100%' }} />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-slate-400">
            <span>-60s</span><span>-30s</span><span>Now</span>
          </div>
        </div>

      </div>

      {/* DATA TABLES */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        
        {/* ACTIVE INCIDENTS */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <div className="border-b border-slate-200 bg-slate-50 px-5 py-3 dark:border-slate-800 dark:bg-[#0f172a]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Active Incidents
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white dark:bg-[#111827]">
                <tr className="border-b border-slate-100 dark:border-slate-800/50">
                  <th className="px-5 py-3 font-medium text-slate-500">Service</th>
                  <th className="px-5 py-3 font-medium text-slate-500">Severity</th>
                  <th className="px-5 py-3 font-medium text-slate-500">Started</th>
                  <th className="px-5 py-3 font-medium text-slate-500">Status</th>
                  <th className="px-5 py-3 font-medium text-slate-500">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {activeIncidents.map((incident) => (
                  <tr key={incident.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="px-5 py-3 font-semibold text-slate-700 dark:text-slate-300">{incident.service}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        incident.severity === "High" ? "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400" : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                      }`}>
                        {incident.severity}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-500">{incident.startedAt}</td>
                    <td className="px-5 py-3 text-slate-700 dark:text-slate-300">{incident.status}</td>
                    <td className="px-5 py-3">
                      <button className="text-blue-600 hover:underline dark:text-blue-400">Details</button>
                    </td>
                  </tr>
                ))}
                {activeIncidents.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-6 text-center text-slate-500">No active incidents. System is stable.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* LAST CHECKS */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <div className="border-b border-slate-200 bg-slate-50 px-5 py-3 dark:border-slate-800 dark:bg-[#0f172a]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Last Checks
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white dark:bg-[#111827]">
                <tr className="border-b border-slate-100 dark:border-slate-800/50">
                  <th className="px-5 py-3 font-medium text-slate-500">Component</th>
                  <th className="px-5 py-3 font-medium text-slate-500">Last Check</th>
                  <th className="px-5 py-3 font-medium text-slate-500">Result</th>
                  <th className="px-5 py-3 font-medium text-slate-500">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {lastChecks.map((check, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="px-5 py-3 font-semibold text-slate-700 dark:text-slate-300">{check.component}</td>
                    <td className="px-5 py-3 text-slate-500 flex items-center gap-1"><Clock size={12} /> {check.lastCheck}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        check.result === "Passed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" :
                        check.result === "Warning" ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400" :
                        "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                      }`}>
                        {check.result}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-500 font-mono text-xs">{check.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}