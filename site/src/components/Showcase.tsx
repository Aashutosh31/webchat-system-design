import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineMagnifyingGlassPlus } from 'react-icons/hi2'
import { GALLERIES } from '../data'
import { Reveal } from './Reveal'
import { Lightbox } from './Lightbox'

export function Showcase() {
  const [active, setActive] = useState(GALLERIES[0].id)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const gallery = GALLERIES.find((g) => g.id === active) ?? GALLERIES[0]

  return (
    <section id="screenshots" className="relative scroll-mt-20 border-y border-slate-800/60 bg-slate-900/20 py-24 sm:py-32">
      <div className="pointer-events-none absolute right-1/4 top-10 -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">See it in action</p>
          <h2 className="section-title">Explore every section of WebChat</h2>
          <p className="mt-4 text-base text-slate-400 sm:text-lg">
            Real screenshots from the product. Pick a section, then click any shot to open it full
            size.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <div className="flex snap-x gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {GALLERIES.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setActive(g.id)}
                className={`shrink-0 snap-start rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  active === g.id
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'border border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-600 hover:text-white'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>

          <p className="mt-5 text-sm text-slate-400">{gallery.blurb}</p>
        </Reveal>

        <motion.div
          key={gallery.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 grid gap-5 sm:grid-cols-2"
        >
          {gallery.shots.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60 text-left transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10 ${
                i === 0 ? 'sm:col-span-2' : ''
              }`}
            >
              <img
                src={s.src}
                alt={s.caption}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent opacity-90" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                <span className="text-sm font-semibold text-white drop-shadow">{s.caption}</span>
                <span className="grid h-8 w-8 place-items-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100">
                  <HiOutlineMagnifyingGlassPlus className="h-4 w-4" />
                </span>
              </div>
            </button>
          ))}
        </motion.div>
      </div>

      <Lightbox shots={gallery.shots} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />
    </section>
  )
}
