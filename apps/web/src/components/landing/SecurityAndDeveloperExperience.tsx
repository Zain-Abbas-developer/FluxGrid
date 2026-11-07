import { ArrowRight, Code2, ShieldCheck, Check } from 'lucide-react'
import {SECURITY_ITEMS, DEVELOPER_ITEMS} from './index.ts'


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
            href={"/security"}
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
            href={"/docs"}
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

export default SecurityAndDeveloperExperience;