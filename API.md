# API.md

# WebChat API Documentation

This document describes the public API architecture used by WebChat.

---

# Overview

WebChat exposes a REST API alongside a real-time Socket.IO layer.

The API is responsible for:

* Authentication
* User Management
* Messaging
* Communities
* Stories
* Feed Operations
* Notifications
* Voice Rooms
* Discovery

---

# Base URL

Development:

```text
http://localhost:3000/api
```

Production:

```text
https://your-backend-domain.com/api
```

---

# Authentication

Base Route:

```text
/api/auth
```

---

## Sign Up

### Request

```http
POST /api/auth/signup
```

### Body

```json
{
  "username": "ashutosh",
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

### Response

```json
{
  "success": true,
  "user": {}
}
```

---

## Login

### Request

```http
POST /api/auth/login
```

### Body

```json
{
  "identifier": "user@example.com",
  "password": "password"
}
```

`identifier` accepts an email address or a username.

### Response

```json
{
  "success": true,
  "user": {}
}
```

---

## Check Authentication

```http
GET /api/auth/check
```

Returns currently authenticated user.

---

## Logout

```http
POST /api/auth/logout
```

Invalidates current session.

---

## Refresh Session

```http
POST /api/auth/refresh
```

Refreshes expired access token.

---

## CSRF Token

```http
GET /api/auth/csrf-token
```

Issues (and sets as a readable cookie) the synchronizer token that every mutating request must echo back in the `X-CSRF-Token` header. The frontend axios instance bootstraps this automatically.

---

## Socket Token

```http
GET /api/auth/socket-token
```

Requires authentication. Returns a short-lived handshake token used to bind a Socket.IO connection to a verified server-side identity.

```json
{
  "token": "<short-lived-handshake-token>",
  "expiresIn": 600
}
```

Client-supplied user IDs are ignored during the socket handshake — identity is derived only from this token or the session cookie.

---

## Mobile Session Exchange

```http
POST /api/auth/mobile/exchange
```

Redeems the single-use OAuth hand-off code returned to the Android app, and sets the session cookies in the app's own cookie jar.

### Body

```json
{
  "code": "<single-use-code>"
}
```

---

## Google OAuth (app target)

The native app starts OAuth with a target marker so the callback returns to the app instead of the website:

```http
GET /api/auth/google?target=app
```

The callback then redirects to the app's custom scheme with a single-use code:

```text
io.qzz.webchat://auth/callback?code=<single-use-code>
```

See [MOBILE.md](./MOBILE.md) for the full hand-off flow.

---

## Google OAuth

### Start OAuth

```http
GET /api/auth/google
```

### OAuth Callback

```http
GET /api/auth/google/callback
```

---

## Verify Email

```http
GET /api/auth/verify-email
```

---

## Forgot Password

```http
POST /api/auth/forgot-password
```

---

## Reset Password

```http
POST /api/auth/reset-password
```

---

## Active Sessions

```http
GET /api/auth/sessions
```

Returns all active sessions.

---

## Remove Session

```http
DELETE /api/auth/sessions/:id
```

Terminates a specific session.

---

# User API

Base Route:

```text
/api/users
```

---

## Get User Profile

```http
GET /api/users/:id
```

---

## Follow User

```http
POST /api/users/follow/:id
```

---

## Unfollow User

```http
POST /api/users/unfollow/:id
```

---

## Accept Follow Request

```http
POST /api/users/follow-request/accept/:id
```

---

## Reject Follow Request

```http
POST /api/users/follow-request/reject/:id
```

---

## Search Users

```http
GET /api/users/search
```

### Example

```http
GET /api/users/search?q=ash
```

---

# Direct Messaging API

Base Route:

```text
/api/chat
```

---

## Get Conversations

```http
GET /api/chat/conversations
```

---

## Get Messages

```http
GET /api/chat/:userId
```

Returns conversation history.

---

## Send Message

```http
POST /api/chat/send/:userId
```

### Body

```json
{
  "text": "Hello",
  "image": null
}
```

---

## Mark Messages Seen

```http
PATCH /api/chat/seen/:conversationId
```

---

# Public Chat API

Base Route:

```text
/api/public-chat
```

---

## Get Public Messages

```http
GET /api/public-chat
```

---

## Send Public Message

```http
POST /api/public-chat
```

---

## Delete Public Message

```http
DELETE /api/public-chat/:id
```

---

# Community API

Base Route:

```text
/api/communities
```

---

## Get Communities

```http
GET /api/communities
```

---

## Create Community

```http
POST /api/communities
```

---

## Join Community

```http
POST /api/communities/:id/join
```

---

## Leave Community

```http
POST /api/communities/:id/leave
```

---

## Create Channel

```http
POST /api/communities/:id/channels
```

---

## Get Community Messages

```http
GET /api/communities/:id/messages
```

---

## Send Community Message

```http
POST /api/communities/:id/messages
```

---

## Add Reaction

```http
POST /api/communities/messages/:messageId/reactions
```

---

# Feed API

Base Route:

```text
/api/feed
```

---

## Get Feed

```http
GET /api/feed
```

---

## Create Post

```http
POST /api/feed
```

---

## Delete Post

```http
DELETE /api/feed/:postId
```

---

## Like Post

```http
POST /api/feed/:postId/like
```

---

## Comment On Post

```http
POST /api/feed/:postId/comment
```

---

# Stories API

Base Route:

```text
/api/stories
```

---

## Get Stories

```http
GET /api/stories
```

---

## Create Story

```http
POST /api/stories
```

---

## View Story

```http
POST /api/stories/:storyId/view
```

---

## Delete Story

```http
DELETE /api/stories/:storyId
```

---

# Forum API

Base Route:

```text
/api/posts
```

---

## Get Forum Posts

```http
GET /api/posts
```

---

## Create Forum Post

```http
POST /api/posts
```

---

## Upvote Post

```http
POST /api/posts/:id/upvote
```

---

## Downvote Post

```http
POST /api/posts/:id/downvote
```

---

## Add Comment

```http
POST /api/posts/:id/comments
```

---

## Reply To Comment

```http
POST /api/posts/comments/:commentId/reply
```

---

# Notifications API

Base Route:

```text
/api/users/notifications
```

---

## Get Notifications

```http
GET /api/users/notifications
```

---

## Mark Notification Read

```http
PATCH /api/users/notifications/:id
```

---

# Discover API

Base Route:

```text
/api/discover
```

---

## Get Discover Feed

```http
GET /api/discover
```

---

## Search Discover Content

```http
GET /api/discover/search
```

---

# Live & Voice API

Base Route:

```text
/api/live
```

---

## Generate LiveKit Token

```http
POST /api/live/token
```

---

## Get Active Voice Rooms

```http
GET /api/live/rooms
```

---

# AI API

Base Route:

```text
/api/ai
```

All routes require authentication, a verified account, and are rate limited per user (20 requests / minute).

---

## Suggest Captions

```http
POST /api/ai/captions
```

### Body

```json
{
  "draft": "sunset at the beach"
}
```

### Response

```json
{
  "suggestions": ["A caption", "Another caption", "A third caption"]
}
```

---

## Suggest Replies

```http
POST /api/ai/replies
```

### Body

```json
{
  "message": "hey, are you free later?",
  "history": "Them: hey, are you free later?"
}
```

### Response

```json
{
  "suggestions": ["Sure!", "I can't right now", "Let me check"]
}
```

---

# Moderation API

Base Route:

```text
/api/moderation
```

All routes require authentication and a verified account. Mutating routes are additionally covered by the global CSRF check.

---

## List Blocked Users

```http
GET /api/moderation/blocked
```

---

## Block User

```http
POST /api/moderation/block
```

### Body

```json
{
  "userId": "<target-user-id>"
}
```

---

## Unblock User

```http
POST /api/moderation/unblock
```

### Body

```json
{
  "userId": "<target-user-id>"
}
```

---

## Create Report

```http
POST /api/moderation/report
```

### Body

```json
{
  "targetType": "user",
  "targetId": "<target-id>",
  "reason": "spam",
  "details": "optional context"
}
```

Supported `targetType` values:

```text
user
post
comment
message
community
```

Supported `reason` values:

```text
spam
harassment
hate_speech
violence
nudity
self_harm
misinformation
other
```

Only one open report per reporter per target is allowed.

---

## Get Reports

```http
GET /api/moderation/reports
```

Admin-gated moderation review queue.

---

# Socket.IO Events

---

## Messaging

### Client → Server

```text
sendMessage
typing
stopTyping
markSeen
```

### Server → Client

```text
newMessage
messageSeen
userTyping
```

---

## Notifications

### Server → Client

```text
newNotification
new_notification
```

---

## Presence

### Server → Client

```text
getOnlineUsers
onlineUsers
```

---

## Voice Rooms

### Client → Server

```text
createVoiceRoom
joinVoiceRoom
leaveVoiceRoom
getVoiceRooms
```

### Server → Client

```text
activeVoiceRooms
roomUpdated
```

---

# Security

Protected endpoints require:

```text
Authentication Cookie
+
CSRF Token
```

Sensitive actions:

```text
POST
PATCH
DELETE
```

must pass CSRF validation.

---

# Error Format

Standard error response:

```json
{
  "message": "Operation failed"
}
```

---

# Versioning

Current API Version:

```text
v1
```

Future versions will remain backward compatible whenever possible.
