import React from "react";
import type { ReactElement } from "react";

import { useTheme } from "../../context/ThemeContext.tsx";
import Navbar from "../../components/common/Navbar.tsx";
import Footer from "../../components/common/Footer.tsx";

interface ProcessStep {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  capabilities: string[];
}

const steps: ProcessStep[] = [
  {
    id: "app",
    step: "01",
    title: "Your Application",
    description:
      "Your application sends a job request to FluxGrid through our secure and robust API.",
    icon: "💻",
    color: "blue",
    capabilities: [
      "Submit jobs via REST API",
      "Any language or framework",
      "Secure authentication",
    ],
  },
  {
    id: "api",
    step: "02",
    title: "FluxGrid API",
    description:
      "The API validates, authenticates, and prepares the job before pushing it into the queue.",
    icon: "🚪",
    color: "purple",
    capabilities: [
      "Request validation",
      "Rate limiting & Security",
      "Job payload structuring",
    ],
  },
  {
    id: "queue",
    step: "03",
    title: "Redis / Queue",
    description:
      "Jobs are safely stored in a highly available Redis queue, waiting to be picked up by workers.",
    icon: "🗄️",
    color: "red",
    capabilities: [
      "High-throughput queuing",
      "Job persistence",
      "Priority & Delayed jobs",
    ],
  },
  {
    id: "workers",
    step: "04",
    title: "Node.js Workers",
    description:
      "Our scalable Node.js workers continuously pull jobs from the queue and orchestrate their execution.",
    icon: "⚙️",
    color: "emerald",
    capabilities: [
      "Horizontal auto-scaling",
      "Concurrency management",
      "Intelligent retries",
    ],
  },
  {
    id: "compute",
    step: "05",
    title: "Python Compute",
    description:
      "For heavy computation or specific tasks, workers can optionally offload processing to Python environments.",
    icon: "🐍",
    color: "cyan",
    capabilities: [
      "Optional heavy lifting",
      "Machine learning tasks",
      "Data processing pipelines",
    ],
  },
  {
    id: "db",
    step: "06",
    title: "MongoDB Records",
    description:
      "Job states, results, and metadata are safely persisted in MongoDB for tracking and history.",
    icon: "🗃️",
    color: "orange",
    capabilities: [
      "Real-time status tracking",
      "Historical job data",
      "Result storage",
    ],
  },
];

const colorStyles: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  purple:
    "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  red: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  emerald:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  cyan: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  orange:
    "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
};

export default function HowItWorksPage(): ReactElement {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#E2EBF0] text-slate-900 antialiased selection:bg-blue-500/20 dark:bg-[#0B1220] dark:text-slate-100">
      {/* Navbar */}
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main>
        {/* Hero Section */}
        <section className="relative px-6 pb-16 pt-24 sm:pt-32">
          <div className="mx-auto max-w-7xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
              Architecture Overview
            </span>

            <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl">
              How FluxGrid Works
              <span className="block bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Under the Hood
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
              A seamless, highly scalable pipeline designed to handle your
              background jobs from submission to completion with complete
              reliability.
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
                View Documentation
              </a>
            </div>
          </div>
        </section>

        {/* Visual Flowchart Section */}
        <section className="px-6 py-10">
          <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white/50 p-8 dark:border-slate-800 dark:bg-[#111827] sm:p-12">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold sm:text-3xl">
                The Processing Pipeline
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Follow the journey of a job through our system.
              </p>
            </div>

            {/* Desktop Flowchart (Hidden on Mobile) */}
            <div className="hidden lg:flex flex-col items-center justify-center space-y-8">
              {/* Row 1 */}
              <div className="flex items-center gap-6">
                <FlowBox title="Your App" icon="💻" color="blue" />
                <Arrow direction="right" />
                <FlowBox title="FluxGrid API" icon="🚪" color="purple" />
                <Arrow direction="right" />
                <FlowBox title="Redis / Queue" icon="🗄️" color="red" />
              </div>

              <Arrow direction="down" />

              {/* Row 2 */}
              <div className="flex items-center gap-6">
                <FlowBox title="Node.js Workers" icon="⚙️" color="emerald" />
              </div>

              <div className="flex gap-32">
                <Arrow direction="down-left" />
                <Arrow direction="down-right" />
              </div>

              {/* Row 3 */}
              <div className="flex items-center gap-24">
                <div className="flex flex-col items-center gap-2">
                  <FlowBox title="Python Compute" icon="🐍" color="cyan" />
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                    Optional
                  </span>
                </div>

                <FlowBox title="MongoDB" icon="🗃️" color="orange" />
              </div>
            </div>

            {/* Mobile Flowchart (Hidden on Desktop) */}
            <div className="flex lg:hidden flex-col items-center space-y-4">
              <FlowBox title="Your App" icon="💻" color="blue" />
              <Arrow direction="down" />
              <FlowBox title="FluxGrid API" icon="🚪" color="purple" />
              <Arrow direction="down" />
              <FlowBox title="Redis / Queue" icon="🗄️" color="red" />
              <Arrow direction="down" />
              <FlowBox title="Node.js Workers" icon="⚙️" color="emerald" />
              <div className="flex gap-12 pt-4">
                <div className="flex flex-col items-center gap-4">
                  <Arrow direction="down" />
                  <FlowBox title="Python Compute" icon="🐍" color="cyan" />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <Arrow direction="down" />
                  <FlowBox title="MongoDB" icon="🗃️" color="orange" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Steps Section */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                  Step by Step
                </span>
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                  Inside the Engine
                </h2>
              </div>
              <p className="max-w-md leading-7 text-slate-600 dark:text-slate-400">
                Every component is designed to be fast, resilient, and
                infinitely scalable.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {steps.map((step) => (
                <article
                  key={step.id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/70 p-7 transition duration-300 hover:-translate-y-2 hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/5 dark:border-slate-800 dark:bg-[#111827] dark:hover:border-blue-500/40"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-xl text-2xl ${colorStyles[step.color]}`}
                    >
                      {step.icon}
                    </div>
                    <span className="font-mono text-sm font-semibold text-slate-400 dark:text-slate-600">
                      {step.step}
                    </span>
                  </div>

                  {/* Card Content */}
                  <h3 className="mt-7 text-xl font-bold">{step.title}</h3>

                  <p className="mt-3 min-h-20 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {step.description}
                  </p>

                  {/* Capabilities */}
                  <div className="mt-6 space-y-3 border-t border-slate-200 pt-5 dark:border-slate-800">
                    {step.capabilities.map((item) => (
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
                Ready to Experience the Power?
              </h2>

              <p className="mx-auto mt-5 max-w-xl leading-7 text-blue-100">
                Start building scalable background job processing workflows
                with FluxGrid.
              </p>

              <a
                href="/get-started"
                className="mt-9 inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-bold text-blue-700 transition hover:-translate-y-1 hover:bg-blue-50"
              >
                Create Account
                <span>→</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

/* --- Helper Components for the Flowchart --- */

function FlowBox({
  title,
  icon,
  color,
}: {
  title: string;
  icon: string;
  color: string;
}) {
  const styles: Record<string, string> = {
    blue: "border-blue-500/30 bg-blue-500/5 text-blue-600 dark:text-blue-400",
    purple:
      "border-purple-500/30 bg-purple-500/5 text-purple-600 dark:text-purple-400",
    red: "border-red-500/30 bg-red-500/5 text-red-600 dark:text-red-400",
    emerald:
      "border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400",
    cyan: "border-cyan-500/30 bg-cyan-500/5 text-cyan-600 dark:text-cyan-400",
    orange:
      "border-orange-500/30 bg-orange-500/5 text-orange-600 dark:text-orange-400",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 w-40 h-24 shadow-sm dark:bg-opacity-20 backdrop-blur-sm transition-transform hover:scale-105 ${styles[color]}`}
    >
      <span className="text-2xl mb-1">{icon}</span>
      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
        {title}
      </span>
    </div>
  );
}

function Arrow({
  direction,
}: {
  direction: "right" | "down" | "down-left" | "down-right";
}) {
  const rotations = {
    right: "rotate-0",
    down: "rotate-90",
    "down-left": "rotate-45",
    "down-right": "rotate-[135deg]",
  };

  return (
    <div className="flex items-center justify-center text-slate-400 dark:text-slate-600">
      <svg
        className={`w-8 h-8 ${rotations[direction]}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </div>
  );
}