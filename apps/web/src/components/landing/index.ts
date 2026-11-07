export const PRIMARY_BUTTON =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/25 transition-colors duration-200 hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0B1220]";

export const SECONDARY_BUTTON =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-blue-400 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-700 dark:bg-transparent dark:text-slate-200 dark:hover:border-blue-500/60 dark:hover:text-blue-400 dark:focus-visible:ring-offset-[#0B1220]";

 export const CARD_BASE =
  "rounded-2xl border border-slate-300/70 bg-white shadow-sm transition-all duration-300 dark:border-slate-700 dark:bg-[#111827]";


export const TECH_LABELS = ["REST API", "Redis", "BullMQ", "Node.js", "MongoDB"];   


export const TONES = {
  blue: {
    icon: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    label: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  violet: {
    icon: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    label: "text-violet-600 dark:text-violet-400",
    dot: "bg-violet-500",
  },
  emerald: {
    icon: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    label: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
} as const;

import {Layers, Cpu, RefreshCw, BarChart3, Send, ListOrdered, Database, Users, CalendarClock } from 'lucide-react';
export const FEATURES: FeatureData[] = [
  {
    icon: Layers,
    category: "Queue Management",
    title: "Job Queues & Scheduling",
    description:
      "Create, organize and schedule background jobs with reliable queue management.",
    tone: "blue",
  },
  {
    icon: Cpu,
    category: "Horizontal Scaling",
    title: "Distributed Workers",
    description:
      "Scale processing capacity horizontally with multiple distributed workers.",
    tone: "violet",
  },
  {
    icon: RefreshCw,
    category: "Fault Tolerance",
    title: "Retry Policies & Failure Management",
    description:
      "Automatically retry failed jobs with configurable policies and failure handling.",
    tone: "emerald",
  },
  {
    icon: BarChart3,
    category: "Observability",
    title: "Monitoring & Analytics",
    description:
      "Track job execution, worker health, queue performance and system metrics.",
    tone: "blue",
  },
];

export const STEPS: StepData[] = [
  {
    number: "01",
    icon: Send,
    title: "Submit Job",
    description: "Send a job through the REST API with your required payload.",
  },
  {
    number: "02",
    icon: ListOrdered,
    title: "Queue Job",
    description: "Redis and BullMQ manage job scheduling and distribution.",
  },
  {
    number: "03",
    icon: Cpu,
    title: "Process Job",
    description: "Available workers execute jobs independently and reliably.",
  },
  {
    number: "04",
    icon: Database,
    title: "Get Results",
    description: "Store results and monitor execution status through the API.",
  },
];


export const USE_CASES: UseCaseData[] = [
  {
    icon: Users,
    title: "Background Tasks",
    description:
      "Handle time-consuming operations without blocking API requests.",
  },
  {
    icon: Database,
    title: "Data Processing",
    description: "Process large workloads through distributed worker instances.",
  },
  {
    icon: CalendarClock,
    title: "Scheduled Operations",
    description: "Run recurring and delayed tasks automatically.",
  },
];

export const SECURITY_ITEMS = [
  "Role-based Access Control",
  "Scoped API Keys",
  "Secure Job Management",
];

export const DEVELOPER_ITEMS = [
  "Complete API Reference",
  "Quick Start Guide",
  "Integration Examples",
];