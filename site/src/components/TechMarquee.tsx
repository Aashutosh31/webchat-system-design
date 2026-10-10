const TECH = [
  'React 19',
  'TypeScript',
  'Vite',
  'Tailwind CSS',
  'Framer Motion',
  'Node.js',
  'Express 5',
  'Socket.IO',
  'MongoDB',
  'Redis',
  'LiveKit',
  'WebRTC',
  'Capacitor',
  'Docker',
  'Vercel',
  'Cloudinary',
]

export function TechMarquee() {
  return (
    <section className="relative border-y border-slate-800/60 bg-slate-900/20 py-6">
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-4">
          {[...TECH, ...TECH].map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="whitespace-nowrap rounded-full border border-slate-800 bg-slate-950/60 px-5 py-2 text-sm font-medium text-slate-400"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
