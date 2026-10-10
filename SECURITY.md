# SECURITY.md

# WebChat Security Architecture

This document describes the security mechanisms implemented within WebChat.

Security is treated as a first-class concern throughout authentication, authorization, session management, API protection, and real-time communication.

---

# Security Principles

WebChat follows several core principles:

```text
Least Privilege
Defense In Depth
Secure Defaults
Token Rotation
Session Isolation
Input Validation
```

---

# Authentication Security

## Authentication Methods

Supported authentication methods:

```text
Email + Password
Google OAuth 2.0
```

---

## Password Security

Passwords are never stored in plaintext.

Authentication flow:

```text
User Password
      │
      ▼
Hash Function
      │
      ▼
Database Storage
```

Only password hashes are stored.

---

# JWT Architecture

WebChat uses a dual-token architecture.

---

## Access Token

Purpose:

```text
API Authorization
Authenticated Requests
User Identity Verification
```

Characteristics:

```text
Short Lifetime
Stateless
HTTP Only Cookie
```

---

## Refresh Token

Purpose:

```text
Session Continuity
Access Token Renewal
```

Characteristics:

```text
Long Lifetime
Rotatable
Revocable
Session Bound
```

---

## Token Lifecycle

```text
Login
  │
  ▼
Issue Access Token
Issue Refresh Token
  │
  ▼
Access Token Expires
  │
  ▼
Refresh Endpoint
  │
  ▼
New Access Token
```

---

# Session Management

WebChat supports session tracking and management.

Capabilities:

```text
View Active Sessions
Terminate Individual Sessions
Logout Current Session
Logout All Sessions
```

Benefits:

```text
Device Control
Account Protection
Session Revocation
```

---

# Secure Cookie Strategy

Authentication tokens are stored in cookies.

Security configuration:

```text
HttpOnly
Secure (Production)
SameSite Protection
Expiration Controls
```

Benefits:

```text
Reduced XSS Exposure
Controlled Session Lifecycle
```

---

# CSRF Protection

WebChat implements CSRF validation for state-changing operations.

---

## Protection Flow

```text
Client Request
      │
      ▼
CSRF Header
      │
      ▼
CSRF Cookie
      │
      ▼
Validation
      │
      ▼
Allow / Reject
```

---

## Protected Operations

Examples:

```text
POST
PATCH
PUT
DELETE
```

Requests failing CSRF validation are rejected.

---

# Route Protection

Protected routes require valid authentication.

---

## Authentication Middleware

Responsibilities:

```text
Token Validation
User Verification
Session Validation
Request Authorization
```

Flow:

```text
Incoming Request
        │
        ▼
Auth Middleware
        │
        ▼
Token Validation
        │
        ▼
User Lookup
        │
        ▼
Access Granted
```

---

# Email Verification

Account verification is supported.

Verification flow:

```text
User Registration
        │
        ▼
Verification Email
        │
        ▼
Verification Link
        │
        ▼
Verified Account
```

Benefits:

```text
Spam Reduction
Identity Confirmation
Improved Security
```

---

# Password Recovery

Secure password recovery process.

Flow:

```text
Forgot Password
        │
        ▼
Recovery Email
        │
        ▼
Secure Reset Token
        │
        ▼
Password Reset
```

Reset tokens are temporary and expire automatically.

---

# OAuth Security

WebChat supports Google OAuth 2.0.

Flow:

```text
User
  │
  ▼
Google OAuth
  │
  ▼
Identity Verification
  │
  ▼
WebChat Session
```

Benefits:

```text
Reduced Password Exposure
Trusted Identity Provider
Improved User Experience
```

---

# Authorization Model

Authentication and authorization are treated separately.

---

## Authentication

Answers:

```text
Who is this user?
```

---

## Authorization

Answers:

```text
Can this user perform this action?
```

Examples:

```text
Message Ownership
Profile Privacy
Community Membership
Story Visibility
```

---

# Privacy Controls

User privacy settings support:

```text
Public Profiles
Private Profiles
Follower Requests
Restricted Content Visibility
```

Visibility checks are enforced on the backend.

---

# Input Validation

Incoming data is validated before processing.

Validation applies to:

```text
Authentication
Posts
Messages
Communities
Stories
Profile Updates
```

Goals:

```text
Prevent Invalid Data
Reduce Injection Risk
Protect Application Logic
```

---

# Rate Limiting

Rate limiting is used to reduce abuse.

Targets include:

```text
Authentication Endpoints
Sensitive API Routes
High-Frequency Operations
```

Benefits:

```text
Brute Force Protection
Spam Prevention
Resource Protection
```

---

# Audit Logging

Security-relevant actions may be recorded.

Examples:

```text
Authentication Events
Account Actions
Sensitive Operations
```

Audit records improve:

```text
Accountability
Monitoring
Incident Investigation
```

---

# Real-Time Security

Socket connections follow authentication controls.

Goals:

```text
Authenticated Communication
Presence Validation
Controlled Event Access
```

## Socket Identity Binding

Socket identity is derived **only** from a short-lived, server-issued handshake token (`GET /api/auth/socket-token`) or the session cookie carried by the WebSocket upgrade.

```text
Client Identity Claim (query string userId)  →  IGNORED
Server-issued handshake token / cookie       →  SOURCE OF TRUTH
```

This closes a spoofing vector where any client could previously register as another user and receive their direct messages.

## Scoped Event Delivery

Direct messages and notifications are delivered to the exact participants of the resource, never broadcast cluster-wide.

```text
Emit target = [senderId, recipientId]        (DMs)
Emit target = [recipientId]                  (notifications)
```

Credentialed socket CORS is restricted to known origins (production web host and the app); wildcard `*.vercel.app` origins are not trusted.

---

# OAuth State Integrity

The OAuth handshake uses a stateless, tamper-evident `state` parameter.

```text
state = base64url(payload) + "." + HMAC_SHA256(payload, secret)
payload = { target: "web" | "app", exp, nonce }
```

Properties:

```text
HMAC-signed (no server-side store required)
Constant-time signature comparison
Expiry enforced
Missing / expired / forged state  →  rejected
```

Rejecting forged callbacks prevents login-CSRF / session-fixation, where an attacker feeds a victim a captured callback and silently signs them into the attacker's account.

The signing key is `JWT_SECRET`; if it is unset the server falls back to a per-process random key rather than a public constant.

---

# Mobile Hand-off Security

Native OAuth never places a token in a URL.

```text
Browser session cookies (useless to the app)
        │
        ▼
Single-use exchange code  →  custom URL scheme
        │
        ▼
POST /api/auth/mobile/exchange (HTTPS)
        │
        ▼
Session established in the WebView cookie jar
```

Properties:

```text
Only a code travels in the redirect — never an access/refresh token
Code is stored hashed (never plaintext)
2-minute expiry
Atomically consumed exactly once (concurrent replay cannot redeem twice)
Minimum-length validation on the presented code
```

See [MOBILE.md](./MOBILE.md) for the WebView cookie scoping that makes this work.

---

# Input Validation Hardening

## Regular Expression Safety (ReDoS)

User-supplied search terms are escaped before being interpolated into database regular expressions.

```text
Input  →  escapeRegex()  →  safe literal pattern
```

This prevents catastrophic backtracking (a denial-of-service vector) and unintended pattern matching from search input.

## Payload Bounds

```text
JSON / urlencoded body limit: 10 MB
AI suggestion input: sanitized, control characters stripped, hard length cap
```

## Schema Validation

Mutating endpoints validate input against schemas before any controller logic runs.

---

# Trust & Safety Enforcement

```text
Block (either direction)  →  suppress DM, follow, search, discovery
Report                    →  deduplicated, queued for admin review
```

Enforcement is applied server-side, so it cannot be bypassed by a modified client.

---

# Resilience

The backend registers process-level safety nets so a single unexpected rejection or exception is logged rather than silently terminating the service:

```text
process.on("unhandledRejection")
process.on("uncaughtException")
```

---


# Media Security

Media uploads are processed through managed storage infrastructure.

Benefits:

```text
Externalized Asset Storage
Reduced Server Load
Secure URL Distribution
```

Media metadata is stored separately from application logic.

---

# Security Headers

Production deployments should enable:

```text
Helmet
CORS Controls
Cookie Security
Compression
```

These protections reduce common web vulnerabilities.

---

# Security Recommendations

Future improvements may include:

```text
Two-Factor Authentication (2FA)
WebAuthn / Passkeys
Device Fingerprinting
Security Event Dashboard
IP Reputation Monitoring
Advanced Threat Detection
```

---

# Responsible Disclosure

If a security issue is discovered:

```text
Do Not Publicly Disclose
Contact Maintainers Directly
Provide Reproduction Steps
Allow Reasonable Remediation Time
```

---

# Security Summary

Current security architecture includes:

```text
JWT Authentication
Refresh Token Rotation
Session Management
Google OAuth
Signed OAuth State
Email Verification
Password Recovery
CSRF Protection (global)
Secure Cookies
Protected Routes
Socket Identity Binding
Single-Use Mobile Exchange Codes
Input Escaping (ReDoS)
Trust & Safety Enforcement
Rate Limiting
Audit Logging
Privacy Controls
```

These mechanisms provide layered protection across authentication, authorization, session security, and API access.
