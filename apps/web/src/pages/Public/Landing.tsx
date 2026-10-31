/**
 * FluxGrid — Landing Page
 * ---------------------------------------------------------------------------
 * A single-file, production-quality implementation of the FluxGrid marketing
 * landing page. Follows the supplied ASCII blueprint for structure and the
 * professional UI reference for visual language.
 *
 * Notes:
 *  - Theme is applied through a `dark` class on <html>, so Tailwind must be
 *    configured with `darkMode: "class"`.
 *  - Route paths live in the ROUTES constant so they can be pointed at the
 *    real application routes without touching the markup.
 * ---------------------------------------------------------------------------
 */

import { useCallback, useEffect, useState } from "react";
import type { ReactElement } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarClock,
  Check,
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  Database,
  Layers,
  ListOrdered,
  Menu,
  Moon,
  RefreshCw,
  Send,
  ShieldCheck,
  Sun,
  Users,
  X,
  Zap,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Configuration                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Centralised destinations. Adjust these to match the real router paths
 * if they differ in this project.
 */
const ROUTES = {
  login: "/login",
  register: "/register",
  docs: "/docs",
  security: "/security",
  github: "https://github.com",
} as const;

const THEME_STORAGE_KEY = "fluxgrid-theme";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

type Theme = "light" | "dark";

interface NavLink {
  label: string;
  href: string;
}

const TONES = {
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

type Tone = keyof typeof TONES;

interface ArchNodeData {
  icon: LucideIcon;
  title: string;
  description: string;
  tone: Tone;
}

interface FeatureData {
  icon: LucideIcon;
  category: string;
  title: string;
  description: string;
  tone: Tone;
}

interface StepData {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

interface UseCaseData {
  icon: LucideIcon;
  title: string;
  description: string;
}

/* -------------------------------------------------------------------------- */
/*  Static content                                                            */
/* -------------------------------------------------------------------------- */

const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Documentation", href: ROUTES.docs },
];

const ARCHITECTURE_NODES: ArchNodeData[] = [
  { icon: Code2, title: "API", description: "Job Submission", tone: "blue" },
  { icon: Layers, title: "Redis / BullMQ", description: "Queue Management", tone: "violet" },
  { icon: Cpu, title: "Workers", description: "Job Processing", tone: "emerald" },
];

const TECH_LABELS = ["REST API", "Redis", "BullMQ", "Node.js", "MongoDB"];

const FEATURES: FeatureData[] = [
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

const STEPS: StepData[] = [
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

const USE_CASES: UseCaseData[] = [
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

const SECURITY_ITEMS = [
  "Role-based Access Control",
  "Scoped API Keys",
  "Secure Job Management",
];

const DEVELOPER_ITEMS = [
  "Complete API Reference",
  "Quick Start Guide",
  "Integration Examples",
];

/* -------------------------------------------------------------------------- */
/*  Shared class strings                                                      */
/* -------------------------------------------------------------------------- */

const PRIMARY_BUTTON =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/25 transition-colors duration-200 hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0B1220]";

const SECONDARY_BUTTON =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-blue-400 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-700 dark:bg-transparent dark:text-slate-200 dark:hover:border-blue-500/60 dark:hover:text-blue-400 dark:focus-visible:ring-offset-[#0B1220]";

const CARD_BASE =
  "rounded-2xl border border-slate-300/70 bg-white shadow-sm transition-all duration-300 dark:border-slate-700 dark:bg-[#111827]";

/* -------------------------------------------------------------------------- */
/*  Theme hook                                                                */
/* -------------------------------------------------------------------------- */

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* localStorage can be unavailable (private mode) — fall through */
  }

  // Some embedded browsers do not expose matchMedia; default safely to light.
  return typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function useTheme(): { theme: Theme; toggleTheme: () => void } {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* ignore write failures */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggleTheme };
}

/* -------------------------------------------------------------------------- */
/*  Brand                                                                    */
/* -------------------------------------------------------------------------- */

function FluxGridMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-violet-500 shadow-sm shadow-blue-500/30 ${className}`}
    >
      <Zap className="h-5 w-5 text-white" strokeWidth={2.5} fill="currentColor" />
    </span>
  );
}

function GitHubIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                     */
/* -------------------------------------------------------------------------- */

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function CheckListItem({ children }: { children: string }) {
  return (
    <li className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-200">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
      {children}
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/*  1. Navigation                                                             */
/* -------------------------------------------------------------------------- */

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Close the menu with Escape.
  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  // Close the menu when resizing up to desktop.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const handleChange = () => {
      if (query.matches) setMobileOpen(false);
    };

    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-300/60 bg-[#E2EBF0]/80 backdrop-blur-xl dark:border-slate-700/60 dark:bg-[#0B1220]/80">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        {/* Brand */}
        <a href="#top" className="flex items-center gap-2.5 rounded-lg">
          <FluxGridMark />
          <span className="flex flex-col leading-none">
            <span className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">
              FluxGrid
            </span>
            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Job Processing Platform
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={
              theme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 transition-colors duration-200 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-300 dark:hover:text-blue-400"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <a
            href={ROUTES.login}
            className="hidden text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-blue-600 sm:inline dark:text-slate-300 dark:hover:text-blue-400"
          >
            Login
          </a>

          <a
            href={ROUTES.register}
            className="hidden items-center gap-1.5 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/25 transition-colors duration-200 hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:inline-flex dark:focus-visible:ring-offset-[#0B1220]"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:hidden dark:border-slate-700 dark:bg-[#111827] dark:text-slate-300"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        id="mobile-navigation"
        className={`overflow-hidden border-t border-slate-300/60 bg-white/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden dark:border-slate-700/60 dark:bg-[#0B1220]/95 ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="space-y-1 px-4 py-4 sm:px-6">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={closeMobile}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="flex items-center gap-3 pt-2">
            <a
              href={ROUTES.login}
              onClick={closeMobile}
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
            >
              Login
            </a>
            <a
              href={ROUTES.register}
              onClick={closeMobile}
              className="flex-1 rounded-lg bg-blue-500 px-3 py-2 text-center text-sm font-semibold text-white"
            >
              Get Started
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  3. Architecture preview                                                   */
/* -------------------------------------------------------------------------- */

function ArchNode({ icon: Icon, title, description, tone }: ArchNodeData) {
  return (
    <div className="flex-1 rounded-xl border border-slate-200 bg-white px-2 py-3 text-center dark:border-slate-700 dark:bg-[#1E293B]">
      <span
        className={`mx-auto flex h-9 w-9 items-center justify-center rounded-lg ${TONES[tone].icon}`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <p className="mt-2 text-xs font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </p>
      <p className="mt-0.5 text-[11px] leading-tight text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}

function FlowConnector() {
  return (
    <div
      aria-hidden="true"
      className="flex shrink-0 items-center justify-center text-slate-400 dark:text-slate-500"
    >
      <ArrowDown className="h-4 w-4 md:hidden" />
      <ArrowRight className="hidden h-4 w-4 md:block" />
    </div>
  );
}

function ArchitecturePreview() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-4 -z-10 rounded-[28px] bg-linear-to-br from-blue-400/15 via-transparent to-violet-400/15 blur-2xl dark:from-blue-500/10 dark:to-violet-500/10"
      />

      <div className="rounded-2xl border border-slate-300/70 bg-white p-4 shadow-xl shadow-slate-900/5 sm:p-5 dark:border-slate-700 dark:bg-[#111827]">
        {/* Window chrome */}
        <div aria-hidden="true" className="flex items-center gap-1.5 pb-4">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
              System Architecture
            </p>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm dark:text-slate-300">
              A simple workflow. Powerful infrastructure.
            </p>
          </div>
          <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 sm:inline-flex dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Architecture Overview
          </span>
        </div>

        {/* Flow */}
        <div className="mt-5 flex flex-col items-stretch gap-2 md:flex-row md:items-center">
          {ARCHITECTURE_NODES.map((node, index) => (
            <div key={node.title} className="contents">
              {index > 0 ? <FlowConnector /> : null}
              <ArchNode {...node} />
            </div>
          ))}
        </div>

        {/* Result row */}
        <div aria-hidden="true" className="flex justify-center py-2">
          <ArrowDown className="h-4 w-4 text-slate-400 dark:text-slate-500" />
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/70 px-3 py-2.5 dark:border-emerald-500/25 dark:bg-emerald-500/10">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm dark:bg-[#1E293B] dark:text-emerald-400">
            <Database className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
              Results / Database
            </p>
            <p className="truncate text-[11px] text-slate-600 dark:text-slate-300">
              Job Results &amp; Execution Status
            </p>
          </div>
          <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
        </div>

        {/* Tech labels */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {TECH_LABELS.map((label) => (
            <span
              key={label}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-600 dark:border-slate-700 dark:bg-[#1E293B] dark:text-slate-300"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  2. Hero                                                                   */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-105 w-180 -translate-x-1/2 rounded-full bg-blue-400/20 blur-[120px] dark:bg-blue-600/15" />
        <div className="absolute -right-24 top-24 h-80 w-[320px] rounded-full bg-violet-400/20 blur-[100px] dark:bg-violet-600/15" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:pb-24 lg:pt-20 xl:gap-20">
        {/* Copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600 backdrop-blur dark:border-slate-700 dark:bg-white/5 dark:text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Built for scalable background processing
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-slate-100">
            Background Jobs.
            <br />
            <span className="bg-linear-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              Built for Scale.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            Submit, process, and monitor background jobs from one powerful
            platform. Build reliable workflows with distributed workers,
            intelligent queues, and real-time monitoring.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href={ROUTES.register} className={PRIMARY_BUTTON}>
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href={ROUTES.docs} className={SECONDARY_BUTTON}>
              <Code2 className="h-4 w-4" />
              Explore Documentation
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <li className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-blue-500" />
              Developer-friendly APIs
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-blue-500" />
              Distributed processing
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-blue-500" />
              Built for reliability
            </li>
          </ul>
        </div>

        {/* Architecture preview */}
        <ArchitecturePreview />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  4. Features                                                               */
/* -------------------------------------------------------------------------- */

function FeatureCard({
  icon: Icon,
  category,
  title,
  description,
  tone,
}: FeatureData) {
  return (
    <article
      className={`group flex h-full flex-col p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:border-blue-500/40 ${CARD_BASE}`}
    >
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${TONES[tone].icon}`}
      >
        <Icon className="h-5 w-5" />
      </span>

      <p
        className={`mt-4 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] ${TONES[tone].label}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${TONES[tone].dot}`} />
        {category}
      </p>

      <h3 className="mt-2 text-base font-semibold leading-snug text-slate-900 dark:text-slate-100">
        {title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {description}
      </p>

      <ArrowRight className="mt-4 h-4 w-4 text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-500 dark:text-slate-500" />
    </article>
  );
}

function Features() {
  return (
    <section id="features" className="scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="Powerful Features"
          title="Everything you need to process jobs"
          description="A complete infrastructure for managing asynchronous workloads, scaling processing capacity, and maintaining reliability."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  5. How it works                                                           */
/* -------------------------------------------------------------------------- */

function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="How It Works"
          title="From submission to execution"
          description="A straightforward pipeline that handles the complexity of background processing behind the scenes."
        />

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {STEPS.map((step, index) => (
            <li key={step.number} className="relative">
              <div className={`h-full p-5 ${CARD_BASE}`}>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <step.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-bold tabular-nums text-slate-400 dark:text-slate-500">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {step.description}
                </p>
              </div>

              {index < STEPS.length - 1 ? (
                <ArrowRight
                  aria-hidden="true"
                  className="absolute -right-5.5 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-slate-400 lg:block dark:text-slate-500"
                />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  6. Use cases                                                              */
/* -------------------------------------------------------------------------- */

function UseCases() {
  return (
    <section id="use-cases" className="scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="Use Cases"
          title="Designed for real-world workloads"
          description="Power your applications with dependable asynchronous processing."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3 lg:gap-5">
          {USE_CASES.map((useCase) => (
            <article
              key={useCase.title}
              className={`group flex items-start gap-4 p-5 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:border-blue-500/40 ${CARD_BASE}`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <useCase.icon className="h-5 w-5" />
              </span>

              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {useCase.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {useCase.description}
                </p>
              </div>

              <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-500 dark:text-slate-500" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  7. Security & developer experience                                        */
/* -------------------------------------------------------------------------- */

function SecurityAndDeveloperExperience() {
  return (
    <section className="scroll-mt-24">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        {/* Security */}
        <article className="rounded-3xl border border-blue-200/80 bg-linear-to-br from-white via-white to-blue-50 p-6 shadow-sm sm:p-8 dark:border-slate-700 dark:from-[#111827] dark:via-[#111827] dark:to-[#0F172A]">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <ShieldCheck className="h-5 w-5" />
          </span>

          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
            Security First
          </p>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
            Your workloads. Your control.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Protect your processing infrastructure with controlled access,
            scoped API keys and secure resource management.
          </p>

          <ul className="mt-6 space-y-3">
            {SECURITY_ITEMS.map((item) => (
              <CheckListItem key={item}>{item}</CheckListItem>
            ))}
          </ul>

          <a
            href={ROUTES.security}
            className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Explore Security
            <ArrowRight className="h-4 w-4" />
          </a>
        </article>

        {/* Developer experience */}
        <article className="rounded-3xl border border-violet-200/80 bg-linear-to-br from-white via-white to-violet-50 p-6 shadow-sm sm:p-8 dark:border-slate-700 dark:from-[#111827] dark:via-[#111827] dark:to-[#0F172A]">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
            <Code2 className="h-5 w-5" />
          </span>

          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-violet-600 dark:text-violet-400">
            Developer Experience
          </p>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
            Everything starts with an API.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Get started quickly with clear documentation, API references, and
            practical integration guides.
          </p>

          <ul className="mt-6 space-y-3">
            {DEVELOPER_ITEMS.map((item) => (
              <CheckListItem key={item}>{item}</CheckListItem>
            ))}
          </ul>

          <a
            href={ROUTES.docs}
            className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 transition-colors hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
          >
            Read Documentation
            <ArrowRight className="h-4 w-4" />
          </a>
        </article>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  8. Final CTA                                                              */
/* -------------------------------------------------------------------------- */

function FinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 via-blue-500 to-violet-600 px-6 py-14 text-center shadow-xl shadow-blue-500/20 sm:px-12 sm:py-16">
        {/* Decorative elements */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-white/10 blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -right-16 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent"
        />

        <div className="relative">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
            Ready to get started?
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Build better. Process smarter.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
            Start managing your background jobs with a platform built for
            reliability, scalability and developer productivity.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={ROUTES.register}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-sm transition-colors duration-200 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 sm:w-auto"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={ROUTES.docs}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 sm:w-auto"
            >
              Explore Docs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  9. Footer                                                                 */
/* -------------------------------------------------------------------------- */

const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Use Cases", href: "#use-cases" },
      { label: "Security", href: ROUTES.security },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: ROUTES.docs },
      { label: "API Reference", href: ROUTES.docs },
      { label: "Quick Start", href: ROUTES.docs },
      { label: "About", href: "#top" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-300/70 bg-white/60 dark:border-slate-800 dark:bg-[#0B1220]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <FluxGridMark className="h-8 w-8" />
              <span className="flex flex-col leading-none">
                <span className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  FluxGrid
                </span>
                <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Job Processing Platform
                </span>
              </span>
            </a>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              A modern background job processing platform built for scalable
              applications.
            </p>

            <div className="mt-5 flex items-center gap-2">
              <a
                href={ROUTES.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="FluxGrid on GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 transition-colors hover:text-blue-600 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-300 dark:hover:text-blue-400"
              >
                <GitHubIcon className="h-4 w-4" />
              </a>
              <a
                href={ROUTES.docs}
                aria-label="FluxGrid documentation"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 transition-colors hover:text-blue-600 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-300 dark:hover:text-blue-400"
              >
                <BookOpen className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-600 transition-colors duration-200 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-300/70 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Clock className="h-3.5 w-3.5" />© {year} FluxGrid. All rights
            reserved.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Built for developers. Designed for scale.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function LandingPage(): ReactElement {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen scroll-smooth overflow-x-clip bg-[#E2EBF0] text-slate-900 antialiased selection:bg-blue-500/20 dark:bg-[#0B1220] dark:text-slate-100">
      <a
        href="#main-content"
        className="sr-only z-60 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main id="main-content">
        <Hero />
        <Features />
        <HowItWorks />
        <UseCases />
        <SecurityAndDeveloperExperience />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}