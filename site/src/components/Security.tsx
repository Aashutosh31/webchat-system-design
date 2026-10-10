import { HiOutlineShieldCheck } from 'react-icons/hi2'
import { SECURITY, LINKS } from '../data'
import { Reveal } from './Reveal'

export function Security() {
  return (
    <section
      id="security"
      className="relative scroll-mt-20 overflow-hidden border-y border-slate-800/60 bg-slate-900/20 py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="section-eyebrow">Security first</p>
            <h2 className="section-title">Engineered to be trusted</h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-400">
              Identity, sessions, and real-time channels are protected in depth — from rotating
              tokens and CSRF to signed OAuth state and scoped socket events.
            </p>

            <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-5">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30">
                <HiOutlineShieldCheck className="h-7 w-7 text-white" />
              </span>
              <div>
                <div className="font-bold text-white">Defense in depth</div>
                <div className="text-sm text-slate-400">
                  Layered controls on every request and socket event.
                </div>
              </div>
            </div>

            <a
              href={LINKS.docs.security}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block text-sm font-semibold text-emerald-400 hover:text-emerald-300"
            >
              Read the security model →
            </a>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {SECURITY.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="card card-hover h-full !p-5">
                  <s.icon className="h-6 w-6 text-emerald-400" />
                  <h3 className="mt-4 font-bold text-white">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
