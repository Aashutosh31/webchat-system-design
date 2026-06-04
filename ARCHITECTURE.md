# ARCHITECTURE.md

# WebChat Architecture

This document describes the system architecture, data flow, communication patterns, and infrastructure used by WebChat.

---

# System Overview

WebChat is a full-stack real-time social communication platform that combines:

* Direct Messaging
* Communities
* Stories
* Social Feed
* Voice Rooms
* Notifications
* AI Infrastructure

The platform follows a modular monolithic architecture with clear service boundaries and horizontal scaling support.

---

# High-Level Architecture

```text
                                    ┌──────────────────┐
                                    │     Browser      │
                                    │ React + Vite SPA │
                                    └────────┬─────────┘
                                             │
                    ┌────────────────────────┴────────────────────────┐
                    │                                                 │
                    ▼                                                 ▼

          ┌─────────────────┐                             ┌─────────────────┐
          │   REST API      │                             │   WebSockets    │
          │ Axios Requests  │                             │   Socket.IO     │
          └────────┬────────┘                             └────────┬────────┘
                   │                                               │
                   └──────────────────┬────────────────────────────┘
                                      ▼

                         ┌─────────────────────┐
                         │   Express Backend   │
                         │     Node.js API     │
                         └───────┬─────────────┘
                                 │
       ┌─────────────────────────┼─────────────────────────┐
       │                         │                         │
       ▼                         ▼                         ▼

 ┌────────────┐          ┌────────────┐          ┌────────────┐
 │ MongoDB    │          │ Redis      │          │ Cloudinary │
 │ Persistence│          │ Presence   │          │ Media CDN  │
 └────────────┘          └────────────┘          └────────────┘
                                 │
                                 ▼

                         ┌──────────────┐
                         │ AI Services  │
                         │ Memory Layer │
                         └──────────────┘
```

---

# Architectural Principles

The application is designed around five principles:

### 1. Real-Time First

Features should update instantly without requiring page refreshes.

Examples:

* New messages
* Notifications
* Voice room updates
* Online status

---

### 2. Persistent Data

All critical events are stored before being emitted.

Example:

```text
Message Sent
     │
     ▼
Save To MongoDB
     │
     ▼
Emit Socket Event
     │
     ▼
Receiver Updates UI
```

This guarantees message durability.

---

### 3. Horizontal Scalability

Redis acts as the coordination layer between application instances.

Future deployment can support:

```text
Instance A
Instance B
Instance C
```

while sharing:

```text
Redis
MongoDB
```

for synchronized state.

---

### 4. Separation of Concerns

Application responsibilities are isolated into:

```text
controllers/
models/
routes/
middleware/
services/
```

Each layer has a single responsibility.

---

### 5. API-Driven Frontend

Frontend never talks directly to databases.

All operations pass through:

```text
React
  ↓
Axios
  ↓
Express API
  ↓
Database
```

---

# Frontend Architecture

## Technology Stack

```text
React 19
Vite
Zustand
Tailwind CSS
Socket.IO Client
React Query
LiveKit
Framer Motion
```

---

## Structure

```text
src/

components/
hooks/
lib/
store/

App.jsx
main.jsx
```

---

## State Management

WebChat uses domain-based Zustand stores.

```text
useAuthStore
useChatStore
useCommunityStore
useFeedStore
useStoryStore
useUserStore
useDiscoverStore
useProfileStore
```

Benefits:

* Feature isolation
* Predictable updates
* Reduced component complexity

---

## Communication Flow

```text
Component
    │
Store Action
    │
Axios Request
    │
Backend API
    │
Update Store
    │
UI Re-render
```

---

# Backend Architecture

## Technology Stack

```text
Node.js
Express
Socket.IO
MongoDB
Redis
Passport.js
JWT
```

---

## Request Lifecycle

```text
Client Request
      │
      ▼
Express Route
      │
      ▼
Controller
      │
      ▼
Database Operation
      │
      ▼
JSON Response
```

---

## Folder Responsibilities

### Controllers

Business logic.

Examples:

```text
authcontroller.js
chatcontroller.js
communitycontroller.js
feedcontroller.js
```

---

### Models

Database schemas.

Examples:

```text
User
Message
Conversation
Community
Story
Notification
```

---

### Middleware

Cross-cutting concerns.

Examples:

```text
Authentication
CSRF Validation
Account Verification
```

---

### Services

Reusable system functionality.

Examples:

```text
AIService
MemoryService
EmailService
TokenService
```

---

# Authentication Architecture

## Login Flow

```text
User Login
    │
    ▼
Credential Validation
    │
    ▼
Generate Tokens
    │
    ▼
Set Secure Cookies
    │
    ▼
Authenticated Session
```

---

## Token Strategy

Two-token model:

### Access Token

```text
Short-lived
Used for API authorization
```

### Refresh Token

```text
Long-lived
Used for session renewal
```

---

## OAuth Flow

```text
User
  │
  ▼
Google OAuth
  │
  ▼
Passport.js
  │
  ▼
WebChat Session
```

---

# Real-Time Messaging Architecture

## Direct Messages

```text
Sender
   │
   ▼
Message Created
   │
   ▼
MongoDB Save
   │
   ▼
Socket.IO Emit
   │
   ▼
Recipient Receives
```

---

## Presence Tracking

Redis tracks:

```text
Online Users
User Sockets
Room Participants
Voice Rooms
```

---

## Notification System

Events generate notifications.

Examples:

```text
Follow
Like
Comment
Story View
```

Notifications are:

```text
Stored
+
Delivered Realtime
```

---

# Community Architecture

Community Model:

```text
Community
 ├── Members
 ├── Channels
 └── Messages
```

Channel Types:

```text
Text
Voice
```

---

# Story Architecture

Stories contain:

```text
Owner
Media
Viewers
Timestamp
```

Lifecycle:

```text
Create Story
     │
     ▼
Visible 24 Hours
     │
     ▼
TTL Expiration
     │
     ▼
Auto Removal
```

---

# Voice Room Architecture

Voice rooms use:

```text
LiveKit
Socket.IO
Redis Presence
```

Responsibilities:

```text
Room Creation
Room Discovery
Participant Tracking
State Synchronization
```

---

# Media Pipeline

```text
Client Upload
      │
      ▼
Cloudinary
      │
      ▼
Secure URL
      │
      ▼
MongoDB Reference
```

---

# AI Architecture

Current AI subsystem includes:

```text
AIService
MemoryService
AgentWorker
TaskExecutor
```

Responsibilities:

```text
Context Assembly
Memory Retrieval
Background Tasks
AI Orchestration
```

The architecture is designed to support future provider expansion without affecting application features.

---

# Deployment Architecture

Current Production Deployment:

```text
Frontend
   ▼
Vercel

Backend
   ▼
Render

Database
   ▼
MongoDB Atlas

Cache
   ▼
Redis

Media
   ▼
Cloudinary
```

---

# Future Scaling Path

Potential future upgrades:

```text
Redis Cluster
Kubernetes
Microservices
CDN Layer
Multi-Region Deployment
Dedicated Analytics Service
Moderation Service
```

---

# Conclusion

WebChat follows a modular real-time architecture designed around persistent communication, scalable infrastructure, and feature isolation.

The current architecture supports messaging, communities, stories, voice communication, notifications, and AI-assisted experiences while remaining extensible for future growth.
