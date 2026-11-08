
import React from "react";
import type { ReactElement } from "react";


interface Feature {
  number: string;
  icon: string;
  title: string;
  description: string;
  capabilities: string[];
  color: string;
}

const features: Feature[] = [
  {
    number: "01",
    icon: "⚡",
    title: "Job Management",
    description:
      "Create, submit, manage, and track background jobs through a powerful and reliable job management system.",
    capabilities: [
      "Submit and cancel jobs",
      "Real-time job status",
      "Job results and history",
    ],
    color: "blue",
  },
  {
    number: "02",
    icon: "📦",
    title: "Queue Processing",
    description:
      "Process thousands of background jobs with reliable queues and intelligent retry mechanisms.",
    capabilities: [
      "Automatic retry mechanism",
      "Exponential backoff",
      "Delayed and scheduled jobs",
    ],
    color: "purple",
  },
  {
    number: "03",
    icon: "🚀",
    title: "Worker Scaling",
    description:
      "Scale your background processing infrastructure based on workload and concurrency requirements.",
    capabilities: [
      "Horizontal worker scaling",
      "Concurrency management",
      "Worker health monitoring",
    ],
    color: "cyan",
  },
  {
    number: "04",
    icon: "📊",
    title: "Analytics",
    description:
      "Monitor system performance and understand how your jobs are processed through detailed analytics.",
    capabilities: [
      "Job throughput metrics",
      "Processing latency",
      "Failure rate monitoring",
    ],
    color: "emerald",
  },
  {
    number: "05",
    icon: "🛡️",
    title: "Security",
    description:
      "Protect your infrastructure with role-based access control and secure API authentication.",
    capabilities: [
      "Role-based permissions",
      "API key management",
      "Secure authentication",
    ],
    color: "orange",
  },
  {
    number: "06",
    icon: "⌘",
    title: "Developer Tools",
    description:
      "Everything developers need to integrate, debug, and manage background processing workflows.",
    capabilities: [
      "Developer-friendly APIs",
      "Logs and event tracking",
      "Integration playground",
    ],
    color: "pink",
  },
];

const colorStyles: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  cyan: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  orange: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  pink: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
};

export default function FeaturesPage(): ReactElement {


  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#E2EBF0] text-slate-900 antialiased selection:bg-blue-500/20 dark:bg-[#0B1220] dark:text-slate-100">

      <main>
        {/* Hero Section */}
        <section className="relative px-6 pb-16 pt-24 sm:pt-32">
          <div className="mx-auto max-w-7xl text-center">

            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
              Powerful Features
            </span>

            <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl">
              Everything You Need
              <span className="block bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                To Scale Your Jobs
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
              FluxGrid provides a powerful infrastructure for managing,
              processing, and scaling background jobs with reliability,
              performance, and complete control.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <a
                href="/get-started"
                className="rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-1 hover:bg-blue-700"
              >
                Get Started →
              </a>

              <a
                href="/docs"
                className="rounded-xl border border-slate-300 bg-white/50 px-7 py-3.5 font-semibold transition hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900/50 dark:hover:text-blue-400"
              >
                Explore Documentation
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl">

            <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                  What We Offer
                </span>

                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                  Built for Modern Workflows
                </h2>
              </div>

              <p className="max-w-md leading-7 text-slate-600 dark:text-slate-400">
                Explore the tools and capabilities that make FluxGrid
                a reliable job processing platform.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.number}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/70 p-7 transition duration-300 hover:-translate-y-2 hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/5 dark:border-slate-800 dark:bg-[#111827] dark:hover:border-blue-500/40"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-xl text-2xl ${colorStyles[feature.color]}`}
                    >
                      {feature.icon}
                    </div>

                    <span className="font-mono text-sm font-semibold text-slate-400 dark:text-slate-600">
                      {feature.number}
                    </span>
                  </div>

                  {/* Card Content */}
                  <h3 className="mt-7 text-xl font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 min-h-20 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>

                  {/* Capabilities */}
                  <div className="mt-6 space-y-3 border-t border-slate-200 pt-5 dark:border-slate-800">
                    {feature.capabilities.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/10 text-xs font-bold text-blue-600 dark:text-blue-400">
                          ✓
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Bottom Decoration */}
                  <div className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-blue-500/5 blur-2xl transition group-hover:bg-blue-500/15" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 to-purple-700 px-7 py-16 text-center text-white sm:px-16">

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
            <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-white/10" />

            <div className="relative z-10">
              <span className="text-sm font-semibold uppercase tracking-widest text-blue-100">
                Start Building Today
              </span>

              <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-extrabold sm:text-5xl">
                Ready to Build Something Powerful?
              </h2>

              <p className="mx-auto mt-5 max-w-xl leading-7 text-blue-100">
                Start building scalable background job processing
                workflows with FluxGrid.
              </p>

              <a
                href="/get-started"
                className="mt-9 inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-bold text-blue-700 transition hover:-translate-y-1 hover:bg-blue-50"
              >
                Start Building
                <span>→</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
