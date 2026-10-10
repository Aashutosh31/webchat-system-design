import {
  HiOutlineDevicePhoneMobile,
  HiOutlineCheckCircle,
  HiOutlineArrowDownTray,
  HiOutlineArrowUpRight,
  HiOutlineShieldCheck,
  HiOutlineBolt,
  HiOutlineArrowPath,
} from 'react-icons/hi2'
import { LINKS } from '../data'
import { Reveal } from './Reveal'

const POINTS = [
  {
    icon: HiOutlineDevicePhoneMobile,
    title: 'True native shell',
    text: 'Capacitor 8 wraps the full product in a bundled secure shell — no remote code.',
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Native Google sign-in',
    text: 'Custom-tab OAuth handed off to the app via a single-use exchange code.',
  },
  {
    icon: HiOutlineBolt,
    title: 'Full feature parity',
    text: 'Messaging, communities, feed, stories, voice/video, AI, and notifications.',
  },
  {
    icon: HiOutlineArrowPath,
    title: 'Edge-to-edge UI',
    text: 'Safe-area aware layout that respects notches and gesture bars.',
  },
]

const STEPS = [
  'Download the signed APK from the button.',
  'Allow “Install unknown apps” when prompted.',
  'Open the APK and confirm the install.',
  'Launch WebChat and sign in.',
]

export function Mobile() {
  return (
    <section id="mobile" className="relative scroll-mt-20 overflow-hidden border-y border-slate-800/60 bg-slate-900/20 py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-20 top-1/3 -z-10 h-80 w-80 rounded-full bg-emerald-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 -z-10 h-80 w-80 rounded-full bg-cyan-500/15 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-300">
              <HiOutlineDevicePhoneMobile className="h-4 w-4" /> Android application
            </div>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              WebChat, <span className="text-gradient">in your pocket</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400">
              It isn’t a thin mobile website — it’s the real product shipped as an installable
              Android app, signed and distributed straight from GitHub Releases.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {POINTS.map((p) => (
                <div key={p.title} className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                  <p.icon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <div>
                    <div className="text-sm font-semibold text-white">{p.title}</div>
                    <div className="mt-1 text-xs leading-relaxed text-slate-400">{p.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <div className="flex flex-wrap items-center gap-4">
                <img src="/chat.png" alt="WebChat app icon" className="h-14 w-14 rounded-xl" />
                <div className="min-w-[8rem] flex-1">
                  <div className="font-bold text-white">WebChat for Android</div>
                  <div className="text-xs text-slate-400">v1.0.0 · 1.4 MB · Android 7.0+</div>
                </div>
                <a href={LINKS.apk} className="btn-primary">
                  <HiOutlineArrowDownTray className="h-5 w-5" /> Download APK
                </a>
              </div>
              <a
                href={LINKS.release}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300"
              >
                View release page <HiOutlineArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <ol className="mt-8 space-y-3">
              {STEPS.map((s, i) => (
                <li key={s} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-slate-700 bg-slate-900 text-xs font-bold text-emerald-400">
                    {i + 1}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 blur-3xl" />
              <div className="rounded-[2.5rem] border border-slate-800 bg-slate-950 p-3 shadow-2xl">
                <div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900">
                  <div className="flex items-center gap-2 bg-slate-950/80 px-4 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                    <span className="text-xs text-slate-500">WebChat · Android</span>
                  </div>
                  <img
                    src="/shots/feed/homepage.webp"
                    alt="WebChat running on Android"
                    loading="lazy"
                    className="w-full object-cover object-top"
                  />
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/95 px-4 py-3 shadow-xl backdrop-blur">
                <HiOutlineCheckCircle className="h-5 w-5 text-emerald-400" />
                <span className="text-sm font-semibold text-white">Signed release</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
