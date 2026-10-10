# MOBILE.md

# WebChat Android Application

This document describes the native Android distribution of WebChat: its architecture, build pipeline, authentication hand-off, security model, and release process.

The Android app is a first-class client — it is not a wrapper around a mobile website. It bundles the same React application inside a hardened Capacitor WebView and adds native transport, secure-context guarantees, and a native OAuth hand-off.

---

# Download

<div align="center">

### 📲 Install WebChat for Android

<a href="https://github.com/Aashutosh31/webchat-system-design/releases/download/v1.0.0/webchat.apk">
  <img src="https://img.shields.io/badge/Download-APK-3DDC84?style=for-the-badge&logo=android&logoColor=white" alt="Download APK" />
</a>

**Latest APK:** [`webchat.apk`](https://github.com/Aashutosh31/webchat-system-design/releases/download/v1.0.0/webchat.apk)
**Release page:** [webchat-system-design → Releases → v1.0.0](https://github.com/Aashutosh31/webchat-system-design/releases/tag/v1.0.0)

</div>

| Property | Value |
| --- | --- |
| Package ID | `io.qzz.webchat` |
| Version | `1.0.0` (versionCode `2`) |
| Min Android | API 24 (Android 7.0) |
| Target Android | API 36 |
| Format | Universal release APK (signed) |
| Size | ~1.4 MB |

> The badge/link above always resolves to the newest Android build attached to the GitHub Release. When a new APK is published, upload it to the release and this document will keep pointing at it.

---

# Installation

The APK is distributed directly (sideloaded), not through the Play Store.

```text
1. Open the download link on the Android device.
2. When prompted, allow "Install unknown apps" for the browser.
3. Open the downloaded webchat.apk file.
4. Confirm the install.
5. Launch "WebChat" from the app drawer.
```

Requirements:

```text
Android 7.0 (API 24) or newer
Internet connection
Camera / microphone permission (only when joining voice or video)
```

The APK is signed with the project release keystore, so it can be installed alongside or over previous builds of the same application ID.

---

# Why a Bundled App (Not `server.url`)

The app ships the production web bundle inside the APK (`webDir: 'dist'`) and loads it from Capacitor's local origin.

```text
  Bundled build                     Remote-load build
  -------------                     -----------------
  Origin: https://localhost         Origin: some remote URL
  Assets: inside APK                Assets: over the network
  Secure context: guaranteed        Depends on host
  Offline shell: available          Blank screen if host down
  Allowlist: strict                 Wider attack surface
```

Consequences that shape the rest of the design:

* The WebView origin is always `https://localhost`, so `getUserMedia` (voice / video) and `crypto.subtle` work inside a **secure context** without a certificate on the device.
* Every API request to the production host is a **third-party** request, which is why the cookie strategy below exists.
* Navigation is restricted by an allowlist so injected links cannot load arbitrary remote content in-app.

---

# Application Architecture

```text
┌──────────────────────────────────────────────────────────────┐
│                        Android Device                        │
│                                                              │
│  ┌────────────────────────┐      ┌────────────────────────┐  │
│  │   Native Shell         │      │   WebView              │  │
│  │  (Capacitor Bridge)    │◄────►│  React + Vite bundle   │  │
│  │  · Custom URL scheme   │      │  origin: https://local │  │
│  │  · Cookie jar          │      │  · Zustand stores      │  │
│  │  · LiveKit / media     │      │  · Axios + CSRF        │  │
│  └───────────┬────────────┘      └───────────┬────────────┘  │
│              │                               │               │
└──────────────┼───────────────────────────────┼───────────────┘
               │                               │
        appUrlOpen deep link            HTTPS / WSS
               │                               │
               ▼                               ▼
   io.qzz.webchat://auth/callback    ┌────────────────────────┐
                                     │   Render Backend       │
                                     │  Express + Socket.IO   │
                                     └───────────┬────────────┘
                                                 │
                    ┌────────────────┬───────────┴────────┬──────────────┐
                    ▼                ▼                    ▼              ▼
               MongoDB Atlas      Redis             Cloudinary      LiveKit
```

The app talks to a dedicated backend host (for example, `api.example.com`) because the WebView has no reverse proxy in front of it. See [DEPLOYMENT.md](./DEPLOYMENT.md) for the dual-host topology.

---

# Technology Stack

```text
Capacitor 8           Native bridge (Android)
@capacitor/app        Deep-link / lifecycle events
@capacitor/browser    Custom Tab OAuth (system browser)
React 19 + Vite       Shared application bundle
LiveKit Client        Native WebRTC audio / video
Socket.IO Client      Realtime messaging (websocket transport)
Axios                 HTTPS API + CSRF
Zustand               Client state
```

Build tooling:

```text
@capacitor/cli 8.5.2
Gradle 8.14.3
Android Gradle Plugin 8.13.0
Java 21 (build)
```

---

# Feature Parity

The app exposes the full product surface, not a subset:

```text
✔ Email + Password authentication
✔ Google OAuth (native hand-off)
✔ Direct messaging (send, unsend, react, image, history)
✔ Smart replies + caption suggestions (AI)
✔ Public chat
✔ Communities + text / voice channels
✔ Social feed + stories
✔ Live audio / video rooms (LiveKit)
✔ Notifications (realtime + stored)
✔ Follow / follower social graph
✔ Block / report (Trust & Safety)
✔ Profile management + security settings
```

Mobile-specific UI adaptations:

```text
· Edge-to-edge layout with safe-area insets (status bar / cutout)
· Bottom navigation bar (desktop navbar hidden below lg breakpoint)
· Touch-friendly drawers and modals
· Native share / back-button handling
```

---

# Authentication on Android

## Password login

Standard HTTPS login inside the WebView. The backend sets httpOnly auth cookies; the WebView's cookie jar persists them for subsequent API calls.

## Google OAuth (native hand-off)

Google blocks sign-in inside embedded WebViews (`disallowed_useragent`), so the app cannot perform OAuth inside its own WebView. WebChat solves this with a custom-tab + single-use-code hand-off and **never places a token in a URL**.

```text
App                    System Browser (Custom Tab)         Backend
 │                              │                            │
 │  open /api/auth/google       │                            │
 │  ?target=app ────────────────┼───────────────────────────►│
 │                              │        signed HMAC state   │
 │                              │◄───────────────────────────│
 │                              │  Google consent screen     │
 │                              │  /api/auth/google/callback │
 │                              │───────────────────────────►│
 │                              │   session created, but the │
 │                              │   browser's cookies are    │
 │                              │   useless to the app       │
 │                              │                            │
 │                              │   redirect to custom scheme│
 │                              │◄───────────────────────────│
 │  io.qzz.webchat://auth/callback?code=<single-use>         │
 │◄─────────────────────────────┼────────────────────────────│
 │                                                           │
 │  POST /api/auth/mobile/exchange { code } ────────────────►│
 │◄────────────────────── 200 { user } + Set-Cookie ─────────│
 │  (session now lives in the WebView cookie jar)            │
```

Properties:

```text
· `state` is HMAC-signed (no server-side store) and invalid/expired state is rejected
· `target=app` records that the caller is the native app, not a browser
· The redirect carries only a single-use code, never an access/refresh token
· The code is stored hashed, expires in 2 minutes, and is consumed atomically exactly once
· The exchange runs over HTTPS and sets cookies in the app's own cookie jar
```

## Cookie strategy

Because the bundle runs on `https://localhost` while the API lives on a separate backend host, every API call is cross-site/third-party. Android WebView blocks third-party cookies by default, which would break the httpOnly session cookies. `MainActivity` explicitly opts in, scoped to the app's own WebView:

```java
cookieManager.setAcceptCookie(true);
cookieManager.setAcceptThirdPartyCookies(getBridge().getWebView(), true);
```

---

# Configuration

The mobile build reads `.env.mobile` via `vite build --mode mobile`. Variables must be absolute URLs (no proxy exists on the device).

```env
VITE_API_BASE_URL=https://api.example.com/api
VITE_SOCKET_URL=https://api.example.com
VITE_LIVEKIT_URL=wss://livekit.example.com
```

`capacitor.config.ts` (head):

```ts
{
  appId: 'io.qzz.webchat',
  appName: 'WebChat',
  webDir: 'dist',
  server: { androidScheme: 'https', allowNavigation: ['https://webchat.qzz.io'] }
}
```

---

# Build & Release

## Prerequisites

```text
Node.js >= 20
JDK 21
Android SDK (with API 36 build tools)
```

## Environment

```bash
export JAVA_HOME=/path/to/jdk-21
export ANDROID_HOME=~/Android/Sdk
export PATH="$JAVA_HOME/bin:$PATH"
```

## Commands

```bash
# Sync the web bundle into the native project
npm run build:mobile && npx cap sync android

# Debug APK
npm run android:apk

# Signed release APK
npm run android:release

# Play Store bundle (AAB)
npm run android:aab
```

Output artifacts:

```text
android/app/build/outputs/apk/release/app-release.apk
android/app/build/outputs/bundle/release/app-release.aab
```

## Signing

Release builds are signed with `android/webchat-release.jks`. Credentials are read from `android/keystore.properties` (git-ignored — never committed).

```text
[ ] JAVA_HOME points at JDK 21
[ ] ANDROID_HOME configured
[ ] keystore.properties present (local only)
[ ] versionCode incremented for every Play upload
[ ] VITE_* values are absolute URLs
```

## Publishing the APK

```text
1. Build the signed release APK.
2. Upload app-release.apk to the GitHub Release as `webchat.apk`.
3. The download link in this document resolves to the new build automatically.
4. Bump `versionCode` in android/app/build.gradle before the next upload.
```

---

# Security Model

The native client inherits every backend protection (CSRF, signed OAuth state, socket identity tokens, rate limiting) and adds shell-level hardening:

```text
✔ Bundled assets only — no remote code loaded into the app shell
✔ Navigation allowlist (only https://webchat.qzz.io may open in-app)
✔ Secure context enforced (https scheme) for media and crypto
✔ Third-party cookies scoped only to the app's own WebView
✔ Single-use, hashed, short-lived OAuth exchange codes
✔ No tokens ever appear in a URL
✔ Release builds disable WebView debugging (webContentsDebuggingEnabled: false)
✔ Mixed content disallowed (allowMixedContent: false)
```

---

# Troubleshooting

## Google sign-in opens then returns to the app with an error

```text
· Confirm GOOGLE_CALLBACK_URL matches the backend host exactly
· Confirm `target=app` is present on the initial /api/auth/google request
· Confirm the custom scheme intent-filter is registered (io.qzz.webchat://auth/callback)
```

## Requests return 401 after login

```text
· Third-party cookies are disabled in the WebView
· MainActivity must enable them (see Cookie strategy)
```

## Voice / video does not start

```text
· Microphone / camera permission not granted
· VITE_LIVEKIT_URL missing or wrong
· App not running in a secure context (androidScheme must be 'https')
```

## Socket never connects

```text
· VITE_SOCKET_URL must be an absolute URL (no proxy on device)
· The backend must allow the app origin in socket CORS
```

---

# Mobile Summary

```text
Distribution   → Signed APK via GitHub Releases
Shell          → Capacitor 8 (bundled bundle, local origin)
Auth           → Cookie session + native Google OAuth hand-off
Transport      → HTTPS (Axios) + WSS (Socket.IO) + WebRTC (LiveKit)
Security       → Bundled assets, allowlist, scoped cookies, single-use codes
Realtime       → Full feature parity with the web client
```

WebChat for Android turns the platform into a native, installable product while reusing one shared, TypeScript, production-hardened codebase.
