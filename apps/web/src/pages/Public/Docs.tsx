import React, { useState } from "react";
import type { ReactElement } from "react";

import { useTheme } from "../../context/ThemeContext.tsx";
import Navbar from "../../components/common/Navbar.tsx";
import Footer from "../../components/common/Footer.tsx";

// Sidebar Navigation Data
const sidebarData = [
  {
    title: "GETTING STARTED",
    links: ["Introduction", "Quick Start", "Authentication", "First Job"],
  },
  {
    title: "API REFERENCE",
    links: ["Create Job", "Get Job", "Cancel Job", "Get Result"],
  },
  {
    title: "WORKERS & QUEUES",
    links: ["Worker setup", "Retry Policies", "Error Codes"],
  },
];

// Quick Start Steps Data
const quickStartSteps = [
  "Create an account",
  "Generate an API key",
  "Submit a job",
  "Check job status",
  "Retrieve results",
];

export default function DocsPage(): ReactElement {
  const { theme, toggleTheme } = useTheme();
  const [activeLink, setActiveLink] = useState("Quick Start"); // Default active link

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#E2EBF0] text-slate-900 antialiased selection:bg-blue-500/20 dark:bg-[#0B1220] dark:text-slate-100">
      {/* Navbar */}
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        
        {/* Docs Header & Search */}
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-slate-300 pb-8 dark:border-slate-800 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              FluxGrid Docs
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Everything you need to integrate and scale with FluxGrid.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <svg
                className="h-5 w-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full rounded-xl border border-slate-300 bg-white/70 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-[#111827] dark:focus:border-blue-500"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <span className="rounded border border-slate-300 bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                ⌘K
              </span>
            </div>
          </div>
        </div>

        {/* Main Layout: Sidebar & Content */}
        <div className="flex flex-col gap-12 lg:flex-row">
          
          {/* Sidebar */}
          <aside className="w-full shrink-0 lg:w-64">
            <nav className="sticky top-24 space-y-8">
              {sidebarData.map((section, idx) => (
                <div key={idx}>
                  <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {section.title}
                  </h3>
                  <ul className="space-y-2 border-l border-slate-300 dark:border-slate-800">
                    {section.links.map((link) => (
                      <li key={link}>
                        <button
                          onClick={() => setActiveLink(link)}
                          className={`block w-full border-l-2 py-1.5 pl-4 text-left text-sm transition-colors ${
                            activeLink === link
                              ? "border-blue-600 font-semibold text-blue-600 dark:border-blue-400 dark:text-blue-400"
                              : "border-transparent text-slate-600 hover:border-slate-400 hover:text-slate-900 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-200"
                          }`}
                        >
                          {link}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Content Area */}
          <article className="min-w-0 flex-1">
            {/* Breadcrumb / Section Title */}
            <div className="mb-8">
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                GETTING STARTED
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                Quick Start
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                Get up and running with FluxGrid in a few minutes. Follow these
                steps to submit your first background job.
              </p>
            </div>

            {/* Ordered List */}
            <div className="mb-12 rounded-2xl border border-slate-200 bg-white/50 p-6 dark:border-slate-800 dark:bg-[#111827] sm:p-8">
              <ol className="space-y-4">
                {quickStartSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Request Example Block */}
            <div className="mb-12">
              <h3 className="mb-4 text-xl font-bold">Request Example</h3>
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-[#1E293B] shadow-sm dark:border-slate-800">
                {/* Code Block Header */}
                <div className="flex items-center justify-between border-b border-slate-700/50 bg-[#0F172A] px-4 py-2">
                  <span className="text-xs font-medium text-slate-400">
                    HTTP
                  </span>
                  <button className="text-xs font-medium text-slate-400 transition hover:text-white">
                    Copy
                  </button>
                </div>
                {/* Code Block Content */}
                <div className="overflow-x-auto p-4 sm:p-6">
                  <pre className="text-sm leading-relaxed text-blue-300">
                    <code>
                      <span className="text-emerald-400 font-bold">POST</span>{" "}
                      <span className="text-slate-300">/api/v1/jobs</span>
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Pagination (Previous / Next) */}
            <div className="mt-16 flex items-center justify-between border-t border-slate-200 pt-8 dark:border-slate-800">
              <button className="group flex flex-col items-start gap-1">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Previous
                </span>
                <span className="flex items-center gap-2 text-sm font-semibold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  <span>←</span> Introduction
                </span>
              </button>

              <button className="group flex flex-col items-end gap-1">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Next
                </span>
                <span className="flex items-center gap-2 text-sm font-semibold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Authentication <span>→</span>
                </span>
              </button>
            </div>
          </article>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}