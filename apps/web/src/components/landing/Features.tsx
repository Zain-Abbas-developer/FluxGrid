import {FEATURES, CARD_BASE, TONES} from './index.ts';
import {ArrowRight} from 'lucide-react';

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

export default Features;