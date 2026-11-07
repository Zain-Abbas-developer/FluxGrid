import {ArrowRight} from 'lucide-react';
import {STEPS, CARD_BASE} from './index.ts'

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

export default HowItWorks;