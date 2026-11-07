// import React, from 'react';
import { ArrowRight, Check, Code2, Layers, Cpu, ArrowDown, Database, CheckCircle2, } from 'lucide-react';
import {PRIMARY_BUTTON, SECONDARY_BUTTON, TECH_LABELS, TONES} from './index.ts'

const ARCHITECTURE_NODES: ArchNodeData[] = [
  { icon: Code2, title: "API", description: "Job Submission", tone: "blue" },
  { icon: Layers, title: "Redis / BullMQ", description: "Queue Management", tone: "violet" },
  { icon: Cpu, title: "Workers", description: "Job Processing", tone: "emerald" },
];

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



const Hero = () => {
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
            <a href={'/register'} className={PRIMARY_BUTTON}>
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href={"/docs"} className={SECONDARY_BUTTON}>
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

export default Hero;