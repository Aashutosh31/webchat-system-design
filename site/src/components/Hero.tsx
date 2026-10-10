import { motion } from 'framer-motion'
import {
  HiOutlineArrowUpRight,
  HiOutlineDevicePhoneMobile,
  HiOutlineArrowDown,
  HiOutlineChatBubbleLeftRight,
  HiOutlineSparkles,
  HiOutlineVideoCamera,
} from 'react-icons/hi2'
import { LINKS } from '../data'

const STATS = [
  { value: '10+', label: 'Feature modules' },
  { value: 'Live', label: 'Socket delivery' },
  { value: 'WebRTC', label: 'Voice & video' },
  { value: 'Android', label: 'Native app' },
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-y" />
        <div className="absolute -left-24 top-10 h-[32rem] w-[32rem] animate-aurora rounded-full bg-emerald-500/20 blur-[120px]" />
        <div className="absolute right-0 top-0 h-[28rem] w-[28rem] animate-aurora rounded-full bg-teal-500/20 blur-[120px] [animation-delay:-6s]" />
        <div className="absolute left-1/3 top-40 h-[26rem] w-[26rem] animate-aurora rounded-full bg-cyan-500/20 blur-[120px] [animation-delay:-12s]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-slate-950" />
      </div>

      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Real-time social mesh · now on Android
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-7 text-balance text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          Your whole social world,
          <br className="hidden sm:block" /> <span className="text-gradient text-shadow-glow">in real time.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          Messaging, communities, a social feed, ephemeral stories, live voice &amp; video, and an AI
          composer — unified in one fast, secure platform. Open it in your browser, or install the
          native Android app.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a href={LINKS.live} target="_blank" rel="noreferrer" className="btn-primary w-full px-8 py-4 sm:w-auto">
            Open WebChat <HiOutlineArrowUpRight className="h-5 w-5" />
          </a>
          <a href={LINKS.apk} className="btn-ghost w-full px-8 py-4 sm:w-auto">
            <HiOutlineDevicePhoneMobile className="h-5 w-5 text-emerald-400" /> Download for Android
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500"
        >
          <span>webchat.qzz.io</span>
          <span className="text-slate-700">•</span>
          <span>free to use</span>
          <span className="text-slate-700">•</span>
          <span>v1.0.0 APK</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto mt-16 max-w-6xl px-5 sm:px-8"
      >
        <div className="relative">
          <div className="absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-[2.5rem] bg-gradient-to-r from-emerald-500/25 via-teal-500/20 to-cyan-500/25 blur-3xl" />

          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-2xl shadow-emerald-500/10 backdrop-blur">
            <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-950/80 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-rose-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-400/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <div className="ml-3 flex-1 rounded-md bg-slate-900 px-3 py-1.5 text-center text-xs text-slate-500">
                webchat.qzz.io
              </div>
            </div>
            <img
              src="/shots/feed/homepage.webp"
              alt="WebChat home feed"
              className="aspect-[16/10] w-full object-cover object-top"
              loading="eager"
            />
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-4 top-24 hidden items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-2.5 text-sm text-slate-200 shadow-xl backdrop-blur md:flex"
          >
            <HiOutlineChatBubbleLeftRight className="h-5 w-5 text-emerald-400" />
            <span className="font-medium">Live messages</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute -right-4 top-1/2 hidden items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-2.5 text-sm text-slate-200 shadow-xl backdrop-blur md:flex"
          >
            <HiOutlineVideoCamera className="h-5 w-5 text-cyan-400" />
            <span className="font-medium">Voice room · live</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-5 left-1/4 hidden items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-2.5 text-sm text-slate-200 shadow-xl backdrop-blur md:flex"
          >
            <HiOutlineSparkles className="h-5 w-5 text-fuchsia-400" />
            <span className="font-medium">AI reply suggestions</span>
          </motion.div>
        </div>
      </motion.div>

      <div className="mx-auto mt-14 max-w-5xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/30 p-6 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-extrabold text-white sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center text-slate-600">
          <a href="#features" aria-label="Scroll to features" className="animate-float">
            <HiOutlineArrowDown className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  )
}
