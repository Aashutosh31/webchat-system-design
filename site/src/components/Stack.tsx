import { STACK } from '../data'
import { Reveal } from './Reveal'

export function Stack() {
  return (
    <section id="stack" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Built to scale</p>
          <h2 className="section-title">A modern, production-grade stack</h2>
          <p className="mt-4 text-base text-slate-400 sm:text-lg">
            Real-time by default, typed end to end, and containerized for predictable deploys.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STACK.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="card card-hover h-full">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl border border-slate-800 bg-slate-950/80">
                  <s.icon className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-slate-400">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/80" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
