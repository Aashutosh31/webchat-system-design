import { useEffect, useState } from 'react'
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineArrowUpRight,
  HiOutlineDevicePhoneMobile,
  HiOutlineBars3,
  HiOutlineXMark,
} from 'react-icons/hi2'
import { LINKS } from '../data'

const NAV = [
  { href: '#features', label: 'Features' },
  { href: '#screenshots', label: 'Screenshots' },
  { href: '#mobile', label: 'Android' },
  { href: '#stack', label: 'Stack' },
  { href: '#security', label: 'Security' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30">
            <HiOutlineChatBubbleLeftRight className="h-5 w-5 text-white" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-white">
            Web<span className="text-gradient">Chat</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={LINKS.live} target="_blank" rel="noreferrer" className="btn-ghost !px-5 !py-2.5">
            Live App <HiOutlineArrowUpRight className="h-4 w-4" />
          </a>
          <a href={LINKS.apk} className="btn-primary !px-5 !py-2.5">
            <HiOutlineDevicePhoneMobile className="h-4 w-4" /> Get Android
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-slate-800 bg-slate-900/60 text-slate-200 lg:hidden"
        >
          {open ? <HiOutlineXMark className="h-5 w-5" /> : <HiOutlineBars3 className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-800/70 bg-slate-950/95 px-5 pb-6 pt-3 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-300 hover:bg-slate-900"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <a href={LINKS.live} target="_blank" rel="noreferrer" className="btn-ghost">
              Live App
            </a>
            <a href={LINKS.apk} className="btn-primary">
              Get Android
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
