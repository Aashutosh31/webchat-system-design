import { HiOutlineArrowUpRight, HiOutlineDevicePhoneMobile } from 'react-icons/hi2'
import { LINKS } from '../data'
import { Reveal } from './Reveal'

export function CTA() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/25 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 p-10 text-center sm:p-16">
            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-emerald-500/20 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-cyan-500/20 blur-[100px]" />
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />

            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                Join the <span className="text-gradient">real-time</span> conversation
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-slate-300 sm:text-lg">
                Open WebChat in your browser or grab the Android app — no setup required.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href={LINKS.live} target="_blank" rel="noreferrer" className="btn-primary w-full px-8 py-4 sm:w-auto">
                  Open WebChat <HiOutlineArrowUpRight className="h-5 w-5" />
                </a>
                <a href={LINKS.apk} className="btn-ghost w-full px-8 py-4 sm:w-auto">
                  <HiOutlineDevicePhoneMobile className="h-5 w-5 text-emerald-400" /> Download for Android
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
