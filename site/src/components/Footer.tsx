import { HiOutlineChatBubbleLeftRight, HiOutlineArrowUpRight } from 'react-icons/hi2'
import { LINKS } from '../data'

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Screenshots', href: '#screenshots' },
      { label: 'Android app', href: '#mobile' },
      { label: 'Security', href: '#security' },
    ],
  },
  {
    title: 'Documentation',
    links: [
      { label: 'Overview', href: LINKS.docs.overview },
      { label: 'Mobile guide', href: LINKS.docs.mobile },
      { label: 'API reference', href: LINKS.docs.api },
      { label: 'Architecture', href: LINKS.docs.architecture },
      { label: 'Database', href: LINKS.docs.database },
      { label: 'Deployment', href: LINKS.docs.deployment },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Live app', href: LINKS.live },
      { label: 'Download APK', href: LINKS.apk },
      { label: 'Releases', href: LINKS.release },
      { label: 'ARC AI', href: LINKS.arc },
      { label: 'GitHub', href: LINKS.repo },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-slate-800/70 bg-slate-950">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30">
                <HiOutlineChatBubbleLeftRight className="h-5 w-5 text-white" />
              </span>
              <span className="text-lg font-extrabold tracking-tight text-white">
                Web<span className="text-gradient">Chat</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              A real-time social mesh uniting messaging, communities, feed, stories, and live voice
              — on the web and Android.
            </p>
            <a
              href={LINKS.live}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 text-xs font-medium text-slate-300 transition hover:border-slate-600"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> webchat.qzz.io
            </a>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => {
                  const external = l.href.startsWith('http')
                  return (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                        className="inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-white"
                      >
                        {l.label}
                        {external && <HiOutlineArrowUpRight className="h-3.5 w-3.5 opacity-60" />}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-800/70 pt-8 text-sm text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} WebChat · Built by{' '}
            <a href={LINKS.author} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white">
              Aashutosh Bairagi
            </a>
          </p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> v1.0.0 · Real-time social mesh
          </p>
        </div>
      </div>
    </footer>
  )
}
