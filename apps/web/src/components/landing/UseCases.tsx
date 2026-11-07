import {ArrowRight} from 'lucide-react'
import {USE_CASES, CARD_BASE} from './index.ts'

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
export default UseCases;