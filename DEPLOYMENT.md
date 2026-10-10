# DEPLOYMENT.md

# WebChat Deployment Guide

This document describes local development, Docker deployment, and production deployment procedures for WebChat.

---

# Deployment Architecture

Current production deployment:

```text
                    ┌──────────────────┐
                    │      Vercel      │
                    │ React Frontend   │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │      Render      │
                    │ Express Backend  │
                    └────────┬─────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼

    MongoDB Atlas         Redis          Cloudinary
       Database           Cache            Media

                             │
                             ▼

                         LiveKit
                       Voice Services

                             │
                             ▼

                  Google Apps Script
                     Email Webhook
```

---

# Infrastructure Overview

Frontend:

```text
React
Vite
Tailwind CSS
```

Hosted on:

```text
Vercel
```

---

Backend:

```text
Node.js
Express
Socket.IO
```

Hosted on:

```text
Render
```

---

External Services:

```text
MongoDB Atlas
Redis
Cloudinary
LiveKit
Google OAuth
Google Apps Script (Email Webhook)
```

---

# Local Development Setup

---

## Prerequisites

Install:

```text
Node.js
npm
MongoDB
Redis
Docker (optional)
Git
```

Recommended:

```text
Node.js >= 20
npm >= 10
```

---

# Clone Repository

```bash
git clone <repository-url>
cd WebChat
```

---

# Frontend Setup

Navigate:

```bash
cd webchat-frontend
```

Install dependencies:

```bash
npm install
```

Create:

```bash
.env
```

Example:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
VITE_LIVEKIT_URL=your_livekit_url
```

Start:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# Backend Setup

Navigate:

```bash
cd webchat-backend
```

Install dependencies:

```bash
npm install
```

Create:

```bash
.env
```

Example:

```env
PORT=3000

MONGO_URI=

REDIS_URL=

JWT_SECRET=

JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=

FRONTEND_URL=http://localhost:5173

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
LIVEKIT_URL=

GOOGLE_SCRIPT_WEBHOOK_URL=
EMAIL_FROM=
```

Start backend:

```bash
npm run dev
```

Backend:

```text
http://localhost:3000
```

---

# Development Services

Required:

```text
MongoDB
Redis
```

Verify:

```bash
mongosh
redis-cli ping
```

Expected:

```text
PONG
```

---

# Docker Deployment

---

## Build Frontend

```bash
docker build -t webchat-frontend .
```

---

## Build Backend

```bash
docker build -t webchat-backend .
```

---

## Start Stack

```bash
docker compose up -d
```

---

## Stop Stack

```bash
docker compose down
```

---

## View Logs

```bash
docker logs webchat-backend
docker logs webchat-frontend
```

---

# Production Deployment

---

# Frontend Deployment (Vercel)

Connect repository:

```text
GitHub
→ Import Project
→ Select Frontend
```

Build Command:

```bash
npm run build
```

Output Directory:

```text
dist
```

Environment Variables:

```env
VITE_API_BASE_URL=
VITE_SOCKET_URL=
VITE_LIVEKIT_URL=
```

Deploy:

```text
Automatic on Git Push
```

---

# Backend Deployment (Render)

Create:

```text
Web Service
```

Build Command:

```bash
npm install
```

Start Command:

```bash
npm start
```

Environment Variables:

```env
MONGO_URI=
REDIS_URL=

JWT_SECRET=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=

FRONTEND_URL=
CLIENT_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
LIVEKIT_URL=

GOOGLE_SCRIPT_WEBHOOK_URL=
EMAIL_FROM=
```

---

# MongoDB Atlas Setup

Create:

```text
Shared Cluster
```

Configure:

```text
Database User
Network Access
Connection String
```

Example:

```env
MONGO_URI=mongodb+srv://...
```

---

# Redis Setup

Supported providers:

```text
Redis Cloud
Upstash Redis
Render Redis
```

Environment:

```env
REDIS_URL=
```

Purpose:

```text
Presence
Socket Coordination
Caching
Sessions
```

---

# Cloudinary Setup

Create account:

```text
https://cloudinary.com
```

Retrieve:

```text
Cloud Name
API Key
API Secret
```

Configure:

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Used for:

```text
Stories
Profile Pictures
Posts
Media Uploads
```

---

# LiveKit Setup

Required for:

```text
Voice Rooms
Audio Communication
```

Environment:

```env
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
LIVEKIT_URL=
```

---

# Google OAuth Setup

Create credentials:

```text
Google Cloud Console
```

Authorized Origins:

```text
https://your-frontend-domain.com
```

Authorized Redirect:

```text
https://your-backend-domain.com/api/auth/google/callback
```

Configure:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
```

---

# Email Service Setup

WebChat uses a Google Apps Script Webhook for sending emails.

This approach was adopted because traditional SMTP providers encountered reliability issues on Render deployments.

Used for:

```text
Verification Emails
Password Reset
Notifications
```

Configure:

```env
GOOGLE_SCRIPT_WEBHOOK_URL=
EMAIL_FROM=
```

Setup Steps:

```text
1. Create a Google Apps Script project.
2. Implement a webhook endpoint that sends emails using Gmail.
3. Deploy the script as a Web App.
4. Copy the generated Web App URL.
5. Add the URL to GOOGLE_SCRIPT_WEBHOOK_URL.
```

---

# Dual-Host Topology (Website + App)

WebChat runs **two backend instances** of the same codebase, because the website and the Android app have different OAuth and transport constraints.

```text
Website (webchat.qzz.io)
   │  relative /api  →  Vercel reverse proxy (vercel.json)
   ▼
Website backend (webchat-yz4f.onrender.com)
   GOOGLE_CALLBACK_URL = https://webchat.qzz.io/api/auth/google/callback

Android app
   │  absolute URLs (no proxy on device)
   ▼
App backend (webchat-mgax.onrender.com)
   GOOGLE_CALLBACK_URL = https://webchat-mgax.onrender.com/api/auth/google/callback
```

Rules:

```text
· vercel.json must proxy /api and /health to the WEBSITE backend
· The app's .env.mobile must point at the APP backend (absolute URLs)
· Each backend's GOOGLE_CALLBACK_URL must be registered with Google
· The socket has no proxy — the app must address the backend host directly
```

> Getting these crossed produces a Google `redirect_uri_mismatch` during sign-in. Always confirm the proxy target matches the registered callback.

---

# Android App Deployment

The Android app is built and released independently of the web deploy.

Build prerequisites:

```text
JDK 21
Android SDK (API 36 build tools)
Release keystore (android/webchat-release.jks + keystore.properties)
```

Build & publish:

```bash
cd webchat-frontend

# Signed release APK
npm run android:release      # → android/app/build/outputs/apk/release/app-release.apk

# Play Store bundle
npm run android:aab          # → android/app/build/outputs/bundle/release/app-release.aab
```

Then:

```text
1. Upload app-release.apk to the GitHub Release as `webchat.apk`.
2. Bump versionCode in android/app/build.gradle before the next upload.
3. Update the download links in README.md / MOBILE.md if the asset name changes.
```

The app reads its configuration from `.env.mobile` at build time:

```env
VITE_API_BASE_URL=https://webchat-mgax.onrender.com/api
VITE_SOCKET_URL=https://webchat-mgax.onrender.com
VITE_LIVEKIT_URL=wss://<your-livekit-host>
```

See [MOBILE.md](./MOBILE.md) for the full pipeline and security model.

---

# AI & Moderation Configuration

Additional backend environment variables:

```env
# AI composer suggestions (smart replies / captions)
GROQ_API_KEY=
GROQ_MODEL=

# Optional additional AI providers
MISTRAL_API_KEY=
MISTRAL_MODEL=

# ARC cognitive layer memory
PINECONE_API_KEY=
PINECONE_INDEX=

# Comma-separated user IDs allowed to read the moderation queue
ADMIN_USER_IDS=
```

If `ADMIN_USER_IDS` is unset, the moderation review endpoint (`GET /api/moderation/reports`) is not accessible.

---

# Health Checks

Backend:

```http
GET /health
```

Expected:

```json
{
  "status": "ok"
}
```

---

# Production Security Checklist

Before production deployment:

```text
[ ] HTTPS Enabled
[ ] Secure Cookies Enabled
[ ] MongoDB Whitelisted
[ ] Redis Protected
[ ] OAuth Configured
[ ] JWT Secrets Generated
[ ] Cloudinary Configured
[ ] Email Webhook Configured
[ ] LiveKit Configured
[ ] Environment Variables Set
[ ] CORS Restricted
```

---

# Monitoring Recommendations

Monitor:

```text
CPU Usage
Memory Usage
Response Times
Database Connections
Redis Health
Socket Connections
Webhook Delivery Status
```

Suggested tools:

```text
Render Metrics
MongoDB Atlas Metrics
Redis Dashboard
Cloudinary Dashboard
Google Apps Script Executions
```

---

# Backup Strategy

Recommended:

```text
MongoDB Atlas Backups
Environment Variable Backups
Cloudinary Asset Retention
Deployment Config Backups
Google Apps Script Backup
```

Store backups securely.

---

# CI/CD Workflow

Deployment flow:

```text
Git Push
    │
    ▼
GitHub
    │
    ▼
Vercel Build
    │
    ▼
Render Deploy
    │
    ▼
Production
```

---

# Troubleshooting

## Backend Not Starting

Check:

```bash
npm run dev
```

Verify:

```env
MONGO_URI
JWT_SECRET
```

---

## Socket Issues

Verify:

```env
CLIENT_URL
FRONTEND_URL
```

Check:

```text
Socket Connection Logs
```

---

## OAuth Failure

Verify:

```env
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GOOGLE_CALLBACK_URL
```

---

## Media Upload Failure

Verify:

```env
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

---

## Email Delivery Failure

Verify:

```env
GOOGLE_SCRIPT_WEBHOOK_URL
EMAIL_FROM
```

Check:

```text
Google Apps Script Deployment
Webhook Logs
Google Apps Script Execution History
```

---

# Deployment Summary

WebChat is deployed using:

```text
Frontend   → Vercel
Backend    → Render
Database   → MongoDB Atlas
Cache      → Redis
Media      → Cloudinary
Voice      → LiveKit
OAuth      → Google
Email      → Google Apps Script Webhook
Android    → GitHub Releases (signed APK)
```

This deployment architecture provides a scalable, production-ready environment for real-time communication, communities, stories, notifications, and voice experiences.
