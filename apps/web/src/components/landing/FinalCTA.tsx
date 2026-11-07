import { ArrowRight } from "lucide-react";


function FinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 via-blue-500 to-violet-600 px-6 py-14 text-center shadow-xl shadow-blue-500/20 sm:px-12 sm:py-16">
        {/* Decorative elements */}
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
              href={"/register"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-sm transition-colors duration-200 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 sm:w-auto"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={"/docs"}
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


export default FinalCTA;