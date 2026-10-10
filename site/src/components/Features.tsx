import { FEATURES } from '../data'
import { Reveal } from './Reveal'

export function Features() {
  return (
    <section id="features" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Everything in one place</p>
          <h2 className="section-title">A full social platform, not a single feature</h2>
          <p className="mt-4 text-base text-slate-400 sm:text-lg">
            Ten interconnected modules share the same real-time backbone — identity, presence,
            notifications, and security work everywhere.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.08}>
              <div className="card card-hover h-full">
                <div
                  className={`mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${f.accent} shadow-lg`}
                >
                  <f.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
