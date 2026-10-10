import type { IconType } from 'react-icons'
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
  HiOutlinePhoto,
  HiOutlineMagnifyingGlass,
  HiOutlineVideoCamera,
  HiOutlineSparkles,
  HiOutlineGlobeAlt,
  HiOutlineShieldCheck,
  HiOutlineBellAlert,
  HiOutlineLockClosed,
  HiOutlineBolt,
  HiOutlineComputerDesktop,
  HiOutlineDevicePhoneMobile,
  HiOutlineCircleStack,
  HiOutlineCloud,
  HiOutlineCodeBracket,
} from 'react-icons/hi2'

export const LINKS = {
  live: 'https://webchat.qzz.io',
  apk: 'https://github.com/Aashutosh31/webchat-system-design/releases/download/v1.0.0/webchat.apk',
  release: 'https://github.com/Aashutosh31/webchat-system-design/releases/tag/v1.0.0',
  repo: 'https://github.com/Aashutosh31/webchat-system-design',
  author: 'https://github.com/Aashutosh31',
  arc: 'https://arcaiproject.qzz.io/',
  docs: {
    overview: 'https://github.com/Aashutosh31/webchat-system-design/blob/main/README.md',
    mobile: 'https://github.com/Aashutosh31/webchat-system-design/blob/main/MOBILE.md',
    api: 'https://github.com/Aashutosh31/webchat-system-design/blob/main/API.md',
    architecture: 'https://github.com/Aashutosh31/webchat-system-design/blob/main/ARCHITECTURE.md',
    database: 'https://github.com/Aashutosh31/webchat-system-design/blob/main/DATABASE.md',
    deployment: 'https://github.com/Aashutosh31/webchat-system-design/blob/main/DEPLOYMENT.md',
    security: 'https://github.com/Aashutosh31/webchat-system-design/blob/main/SECURITY.md',
  },
}

export interface Feature {
  icon: IconType
  title: string
  description: string
  accent: string
}

export const FEATURES: Feature[] = [
  {
    icon: HiOutlineChatBubbleLeftRight,
    title: 'Real-Time Messaging',
    description:
      'Direct and group conversations over sockets — instant delivery with typing indicators, presence, read receipts, reactions, and rich media attachments.',
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    icon: HiOutlineUserGroup,
    title: 'Communities',
    description:
      'Structured spaces with discussion threads, posts, member roles, and moderation — a home for every interest.',
    accent: 'from-teal-500 to-cyan-500',
  },
  {
    icon: HiOutlinePhoto,
    title: 'Feed & Stories',
    description:
      'A social feed of posts, comments, and reactions plus ephemeral 24-hour stories that disappear when the moment passes.',
    accent: 'from-cyan-500 to-blue-500',
  },
  {
    icon: HiOutlineMagnifyingGlass,
    title: 'Discover',
    description:
      'Trending memes, public posts, and creators surfaced in a discovery stream built to keep you scrolling.',
    accent: 'from-indigo-500 to-purple-500',
  },
  {
    icon: HiOutlineVideoCamera,
    title: 'Live Voice & Video',
    description:
      'Multi-party WebRTC rooms via LiveKit — join voice channels, go live, and stream audio/video with secure per-user tokens.',
    accent: 'from-purple-500 to-fuchsia-500',
  },
  {
    icon: HiOutlineSparkles,
    title: 'AI Composer',
    description:
      'Context-aware smart replies and tone-matched caption suggestions generated on demand — with strict, fail-closed JSON contracts.',
    accent: 'from-fuchsia-500 to-pink-500',
  },
  {
    icon: HiOutlineGlobeAlt,
    title: 'Public & Anonymous Chat',
    description:
      'Open public rooms and anonymous chat lobbies for spontaneous conversation with no strings attached.',
    accent: 'from-emerald-500 to-cyan-500',
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Trust & Safety',
    description:
      'Bidirectional blocking, structured reporting, and an admin moderation queue keep the network healthy.',
    accent: 'from-rose-500 to-orange-500',
  },
  {
    icon: HiOutlineBellAlert,
    title: 'Live Notifications',
    description:
      'Real-time in-app and push-style alerts for mentions, messages, and reactions — never miss the moment.',
    accent: 'from-amber-500 to-yellow-500',
  },
  {
    icon: HiOutlineLockClosed,
    title: 'Hardened Security',
    description:
      'JWT with refresh-token rotation, global CSRF protection, signed OAuth state, audit logging, and privacy controls.',
    accent: 'from-sky-500 to-blue-600',
  },
]

export interface Shot {
  src: string
  caption: string
}

export interface Gallery {
  id: string
  label: string
  blurb: string
  shots: Shot[]
}

const shot = (path: string, caption: string): Shot => ({ src: `/shots/${path}.webp`, caption })

export const GALLERIES: Gallery[] = [
  {
    id: 'feed',
    label: 'Feed & Stories',
    blurb: 'Scroll the social feed, react, comment, and share ephemeral stories.',
    shots: [
      shot('feed/homepage', 'Home feed with posts and reactions'),
      shot('feed/story', 'Ephemeral 24-hour stories viewer'),
      shot('feed/comments', 'Nested comments and reactions'),
      shot('feed/create-post', 'Rich post composer'),
    ],
  },
  {
    id: 'messaging',
    label: 'Messaging',
    blurb: 'Persistent, low-latency conversations with presence and receipts.',
    shots: [
      shot('messages/dm-section', 'Direct messaging inbox'),
      shot('messages/direct-message', 'One-to-one conversation'),
      shot('messages/messages', 'Live message timeline'),
    ],
  },
  {
    id: 'communities',
    label: 'Communities',
    blurb: 'Organized spaces with discussions, posts, and membership.',
    shots: [
      shot('communities/communties', 'Browse communities'),
      shot('communities/community-section', 'Community home and channels'),
      shot('communities/discussions', 'Discussion threads'),
      shot('communities/create-post', 'Create a community post'),
    ],
  },
  {
    id: 'voice',
    label: 'Voice & Live',
    blurb: 'Real-time WebRTC rooms, live audio/video, and go-live stages.',
    shots: [
      shot('voicechat/voiceroom', 'Live voice room'),
      shot('voicechat/go-live-room', 'Go-live broadcast room'),
      shot('special-features/create-voice-chat', 'Create a voice channel'),
      shot('special-features/voicechat-golive', 'Join a live session'),
    ],
  },
  {
    id: 'discover',
    label: 'Discover',
    blurb: 'A discovery stream of memes, public posts, and trending creators.',
    shots: [
      shot('discover/discover', 'Discovery feed'),
      shot('discover/meme-view', 'Meme viewer'),
      shot('discover/meme-share', 'Share to your feed'),
    ],
  },
  {
    id: 'special',
    label: 'Public & Anonymous',
    blurb: 'Open public rooms and anonymous chat for spontaneous talk.',
    shots: [
      shot('special-features/public-chat', 'Public chat room'),
      shot('special-features/anonymous-public-chat', 'Anonymous public chat'),
      shot('special-features/go-live', 'Go live to the network'),
    ],
  },
  {
    id: 'profile',
    label: 'Profile & Alerts',
    blurb: 'Your identity, public profile, and real-time notifications.',
    shots: [
      shot('profile/profile', 'Your profile'),
      shot('profile/public-profile', 'Public profile view'),
      shot('notifications/notification-page', 'Notification center'),
    ],
  },
  {
    id: 'auth',
    label: 'Auth',
    blurb: 'Secure sign-in with email and Google OAuth 2.0.',
    shots: [
      shot('auth/login', 'Sign in'),
      shot('auth/signup', 'Create an account'),
      shot('auth/google-login', 'Continue with Google'),
      shot('auth/googleOauth', 'Google OAuth consent'),
    ],
  },
]

export interface StackItem {
  icon: IconType
  title: string
  items: string[]
}

export const STACK: StackItem[] = [
  {
    icon: HiOutlineComputerDesktop,
    title: 'Frontend',
    items: [
      'React 19 + Vite + TypeScript',
      'Tailwind CSS & Framer Motion',
      'Zustand stores & React Query',
      'Socket.IO client + LiveKit WebRTC',
    ],
  },
  {
    icon: HiOutlineCodeBracket,
    title: 'Backend',
    items: [
      'Node.js & Express 5 REST API',
      'Socket.IO clusters over Redis',
      'MongoDB Atlas + Mongoose',
      'Passport.js Google OAuth 2.0',
    ],
  },
  {
    icon: HiOutlineDevicePhoneMobile,
    title: 'Mobile',
    items: [
      'Capacitor 8 native shell',
      'Bundled secure WebView (https origin)',
      'Native Google OAuth hand-off',
      'Signed release APK / AAB',
    ],
  },
  {
    icon: HiOutlineCloud,
    title: 'Infrastructure',
    items: [
      'Vercel edge frontend + proxy',
      'Render backend services',
      'Redis distributed cache & presence',
      'Cloudinary media + LiveKit SFU',
    ],
  },
]

export interface SecurityItem {
  icon: IconType
  title: string
  description: string
}

export const SECURITY: SecurityItem[] = [
  {
    icon: HiOutlineLockClosed,
    title: 'Token Rotation',
    description: 'Short-lived JWT access tokens paired with rotating refresh tokens.',
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Global CSRF Protection',
    description: 'Signed double-submit tokens verified on every mutating API request.',
  },
  {
    icon: HiOutlineBolt,
    title: 'Signed OAuth State',
    description: 'HMAC-signed state prevents CSRF and replay across the OAuth handshake.',
  },
  {
    icon: HiOutlineCircleStack,
    title: 'Single-Use Codes',
    description: 'Native sign-in exchanges an atomic, single-use code — never tokens in URLs.',
  },
  {
    icon: HiOutlineGlobeAlt,
    title: 'Socket Identity Binding',
    description: 'Every socket event is scoped to the authenticated session identity.',
  },
  {
    icon: HiOutlineSparkles,
    title: 'Input Hardening',
    description: 'Escaped search regex (ReDoS-safe) and strict schema validation with Zod.',
  },
]
