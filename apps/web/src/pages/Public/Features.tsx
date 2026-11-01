/**
 * FluxGrid — Features Page
 * ---------------------------------------------------------------------------
 * A single-file, production-quality implementation of the FluxGrid features
 * page. Matches the exact design language, layout patterns, and theme logic
 * of the Landing Page.
 * ---------------------------------------------------------------------------
 */

import { useCallback, useEffect, useState } from "react";
import type { ReactElement } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Briefcase,
  Check,
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  ListOrdered,
  Menu,
  Moon,
  ShieldCheck,
  Sun,
  X,
  Zap,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext.tsx";

/* -------------------------------------------------------------------------- */
/*  Configuration                                                             */
/* -------------------------------------------------------------------------- */

const ROUTES = {
  login: "/login",
  register: "/register",
  docs: "/docs",
  security: "/security",
  features: "/features",
  home: "/",
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

interface PageFeatureData {
  icon: LucideIcon;
  title: string;
  items: string[];
  tone: Tone;
}

/* -------------------------------------------------------------------------- */
/*  Static content                                                            */
/* -------------------------------------------------------------------------- */

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: ROUTES.home },
  { label: "Features", href: ROUTES.features },
  { label: "Documentation", href: ROUTES.docs },
];

// Data mapped exactly from the ASCII Blueprint
const PAGE_FEATURES: PageFeatureData[] = [
  {
    icon: Briefcase,
    title: "Job Management",
    items: ["Submit / Cancel", "Status / Results"],
    tone: "blue",
  },
  {
    icon: ListOrdered,
    title: "Queue Processing",
    items: ["Retry / Backoff", "Delayed Jobs"],
    tone: "violet",
  },
  {
    icon: Cpu,
    title: "Worker Scaling",
    items: ["Concurrency", "Worker Monitoring"],
    tone: "emerald",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    items: ["Throughput", "Latency / Failures"],
    tone: "blue",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    items: ["Roles & Permissions", "API Key Management"],
    tone: "violet",
  },
  {
    icon: Code2,
    title: "Developer Tools",
    items: ["API Playground", "Logs & Events"],
    tone: "emerald",
  },
];

/* -------------------------------------------------------------------------- */
/*  Shared class strings                                                      */
/* -------------------------------------------------------------------------- */

const CARD_BASE =
  "rounded-2xl border border-slate-300/70 bg-white shadow-sm transition-all duration-300 dark:border-slate-700 dark:bg-[#111827]";

/* -------------------------------------------------------------------------- */
/*  Brand                                                                     */
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
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

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
        <a href={ROUTES.home} className="flex items-center gap-2.5 rounded-lg">
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

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
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
/*  Features Page Components                                                  */
/* -------------------------------------------------------------------------- */

function FeaturesHero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-105 w-180 -translate-x-1/2 rounded-full bg-blue-400/20 blur-[120px] dark:bg-blue-600/15" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600 backdrop-blur dark:border-slate-700 dark:bg-white/5 dark:text-slate-300">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          Platform Capabilities
        </span>
        <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-slate-100">
          Powerful <span className="bg-linear-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">Features</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
          Explore the complete infrastructure designed to manage asynchronous workloads, scale your processing capacity, and maintain absolute reliability.
        </p>
      </div>
    </section>
  );
}

function FeatureDetailCard({ icon: Icon, title, items, tone }: PageFeatureData) {
  return (
    <article
      className={`group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:border-blue-500/40 ${CARD_BASE}`}
    >
      <div className="flex items-center gap-4">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${TONES[tone].icon}`}
        >
          <Icon className="h-6 w-6" />
        </span>
        <h3 className="text-lg font-semibold leading-snug text-slate-900 dark:text-slate-100">
          {title}
        </h3>
      </div>

      <div className="mt-6 flex-1 space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300"
          >
            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800`}>
              <Check className={`h-3 w-3 ${TONES[tone].label}`} strokeWidth={3} />
            </span>
            {item}
          </div>
        ))}
      </div>
    </article>
  );
}

function FeaturesGrid() {
  return (
    <section id="features-grid" className="scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PAGE_FEATURES.map((feature) => (
            <FeatureDetailCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 via-blue-500 to-violet-600 px-6 py-14 text-center shadow-xl shadow-blue-500/20 sm:px-12 sm:py-16">
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
              Start Building
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
/*  Footer                                                                    */
/* -------------------------------------------------------------------------- */

const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "Features", href: ROUTES.features },
      { label: "Documentation", href: ROUTES.docs },
      { label: "Security", href: ROUTES.security },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "API Reference", href: ROUTES.docs },
      { label: "Quick Start", href: ROUTES.docs },
      { label: "About", href: ROUTES.home },
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
          <div>
            <a href={ROUTES.home} className="flex items-center gap-2.5">
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

export default function FeaturesPage(): ReactElement {
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
        <FeaturesHero />
        <FeaturesGrid />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}