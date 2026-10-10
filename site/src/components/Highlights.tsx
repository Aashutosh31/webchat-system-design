import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineVideoCamera,
  HiOutlineSparkles,
  HiOutlineCheckCircle,
  HiOutlineArrowUpRight,
} from 'react-icons/hi2'
import type { IconType } from 'react-icons'
import { LINKS } from '../data'
import { Reveal } from './Reveal'

interface Highlight {
  icon: IconType
  eyebrow: string
  title: string
  body: string
  bullets: string[]
  image: string
  reverse?: boolean
  cta?: { label: string; href: string }
}

const HIGHLIGHTS: Highlight[] = [
  {
    icon: HiOutlineChatBubbleLeftRight,
    eyebrow: 'Messaging',
    title: 'Conversations that feel instant',
    body: 'Every message is pushed over Socket.IO with Redis-backed presence, so delivery, typing states, and read receipts update live — no refresh, no polling.',
    bullets: [
      'Direct and group conversations with reactions',
      'Online presence with typing and read receipts',
      'Rich media sharing via Cloudinary pipelines',
      'Self-healing error boundaries keep chats resilient',
    ],
    image: '/shots/messages/dm-section.webp',
    cta: { label: 'Try messaging', href: LINKS.live },
  },
  {
    icon: HiOutlineVideoCamera,
    eyebrow: 'Live rooms',
    title: 'Go live with voice & video',
    body: 'Spin up multi-party WebRTC rooms powered by LiveKit. Secure, server-issued tokens grant exactly the publish and subscribe rights each participant needs.',
    bullets: [
      'Multi-party audio & video rooms',
      'Community voice channels with participant state',
      'Go-live stages and broadcasts',
      'Per-user token authentication — no shared secrets',
    ],
    image: '/shots/voicechat/voiceroom.webp',
    reverse: true,
    cta: { label: 'Open a room', href: LINKS.live },
  },
  {
    icon: HiOutlineSparkles,
    eyebrow: 'AI composer',
    title: 'An assistant inside the composer',
    body: 'Generate context-aware smart replies and tone-matched captions on demand. A strict JSON contract and per-user rate budgets keep generation bounded and safe.',
    bullets: [
      'Smart replies from the latest message + history',
      'Three caption options for posts and stories',
      'Fail-closed parsing — never throws on bad output',
      'No tools, no memory, no runaway cost',
    ],
    image: '/shots/feed/create-post.webp',
    cta: { label: 'See it live', href: LINKS.live },
  },
]

export function Highlights() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl space-y-24 px-5 sm:px-8 sm:space-y-32">
        {HIGHLIGHTS.map((h) => (
          <div
            key={h.title}
            className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
              h.reverse ? 'lg:[&>*:first-child]:order-2' : ''
            }`}
          >
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-400">
                <h.icon className="h-4 w-4" /> {h.eyebrow}
              </div>
              <h3 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {h.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-slate-400">{h.body}</p>
              <ul className="mt-6 space-y-3">
                {h.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-slate-300">
                    <HiOutlineCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              {h.cta && (
                <a
                  href={h.cta.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
                >
                  {h.cta.label} <HiOutlineArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </Reveal>

            <Reveal delay={0.1}>
              <div className="group relative">
                <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-cyan-500/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-2xl">
                  <img
                    src={h.image}
                    alt={h.title}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  )
}
