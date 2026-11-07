import { BookOpen, Clock, Zap } from "lucide-react";


const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Use Cases", href: "#use-cases" },
      { label: "Security", href: "/security" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/docs" },
      { label: "Quick Start", href: "/docs" },
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
                href={"/github"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="FluxGrid on GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 transition-colors hover:text-blue-600 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-300 dark:hover:text-blue-400"
              >
                <GitHubIcon className="h-4 w-4" />
              </a>
              <a
                href={"/docs"}
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

export default Footer;