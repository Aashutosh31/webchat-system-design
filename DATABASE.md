# DATABASE.md

# WebChat Database Architecture

This document describes the database design, collections, relationships, indexing strategy, and data flow used by WebChat.

---

# Overview

WebChat uses MongoDB as its primary persistence layer.

The database stores:

* User Accounts
* Authentication Data
* Messaging Data
* Communities
* Stories
* Social Feed
* Notifications
* Sessions
* AI Related Data

---

# Database Architecture

```text
                        User
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼

   Conversation      FeedPost         Story
         │               │               │
         ▼               ▼               ▼

      Message       Comment      Story Viewer

         │
         ▼

     Notification

         │
         ▼

     Community
         │
         ▼

 CommunityMessage
```

---

# Core Collections

## User

Collection:

```text
users
```

Purpose:

```text
Identity
Authentication
Social Graph
Profile Information
```

Key Fields:

```text
_id
username
email
password

profilePic
bio

followers[]
following[]

followRequests[]

isPrivate

emailVerified
refreshTokenVersion
```

Relationships:

```text
User
 ├── FeedPosts
 ├── Stories
 ├── Messages
 ├── Notifications
 ├── Communities
 └── Sessions
```

---

# Conversation

Collection:

```text
conversations
```

Purpose:

```text
DM Containers
Conversation Metadata
```

Key Fields:

```text
participants[]
lastMessage
updatedAt
```

Relationships:

```text
Conversation
 └── Messages
```

---

# Message

Collection:

```text
messages
```

Purpose:

```text
Direct Messages
```

Key Fields:

```text
conversationId
sender
text
image
seen
createdAt
```

Flow:

```text
User
  │
  ▼
Conversation
  │
  ▼
Messages
```

---

# Community

Collection:

```text
communities
```

Purpose:

```text
Community Management
```

Key Fields:

```text
name
description

owner

members[]

channels[]
```

Relationships:

```text
Community
 ├── Members
 ├── Channels
 └── Posts
```

---

# CommunityMessage

Collection:

```text
communitymessages
```

Purpose:

```text
Community Channel Messaging
```

Key Fields:

```text
community
channelId

author

content

reactions[]
pinned
edited
```

---

# FeedPost

Collection:

```text
feedposts
```

Purpose:

```text
Homepage Social Feed
```

Key Fields:

```text
author
content
image

likes[]

comments[]
```

Relationships:

```text
FeedPost
 ├── Author
 ├── Likes
 └── Comments
```

---

# Story

Collection:

```text
stories
```

Purpose:

```text
Ephemeral Content
```

Key Fields:

```text
author
imageUrl
caption

viewers[]

createdAt
```

---

## TTL Lifecycle

Stories automatically expire.

```text
createdAt
     │
     ▼
24 Hours
     │
     ▼
MongoDB TTL Index
     │
     ▼
Automatic Deletion
```

---

# Notification

Collection:

```text
notifications
```

Purpose:

```text
Realtime User Notifications
```

Key Fields:

```text
recipient
sender

type

read

postId
```

Types:

```text
follow_request
follow_accept
like
comment
story
```

---

# Post

Collection:

```text
posts
```

Purpose:

```text
Forum Style Discussions
```

Key Fields:

```text
author
community

title
content

upvotes[]
downvotes[]
```

---

# Comment

Collection:

```text
comments
```

Purpose:

```text
Nested Discussion System
```

Key Fields:

```text
author
post

parentComment

content
```

Supports:

```text
Threaded Replies
Nested Discussions
```

---

# PublicMessage

Collection:

```text
publicmessages
```

Purpose:

```text
Public Chat Rooms
Anonymous Messaging
```

Key Fields:

```text
room
senderName
content
createdAt
```

---

# Authentication Collections

Authentication is intentionally separated from user profile data.

---

# Session

Collection:

```text
sessions
```

Purpose:

```text
Device Tracking
Session Management
```

Stores:

```text
Device
Browser
IP Metadata
Last Activity
```

---

# RefreshToken

Collection:

```text
refreshtokens
```

Purpose:

```text
Refresh Token Rotation
```

Stores:

```text
User
Token Hash
Expiry
```

---

# OAuthAccount

Collection:

```text
oauthaccounts
```

Purpose:

```text
Google OAuth Mapping
```

Stores:

```text
Provider
ProviderId
User
Email
```

---

# EmailVerificationToken

Collection:

```text
emailverificationtokens
```

Purpose:

```text
Email Verification Workflow
```

Stores:

```text
User
Token
Expiry
```

---

# PasswordResetToken

Collection:

```text
passwordresettokens
```

Purpose:

```text
Password Recovery
```

Stores:

```text
User
Token
Expiry
```

---

# LoginAttempt

Collection:

```text
loginattempts
```

Purpose:

```text
Brute Force Detection
Security Monitoring
```

Stores:

```text
Email
IP
Timestamp
Success
```

---

# AuditLog

Collection:

```text
auditlogs
```

Purpose:

```text
Security Auditing
Administrative Tracking
```

Stores:

```text
Actor
Action
Target
Timestamp
Metadata
```

---

# Social Graph Model

```text
User A
   │
   ├──── followers[]
   │
   ├──── following[]
   │
   └──── followRequests[]
```

This enables:

```text
Public Profiles
Private Profiles
Follow Requests
Mutual Connections
```

---

# Messaging Relationships

```text
User
 │
 ▼

Conversation
 │
 ▼

Message
```

Benefits:

```text
Fast Conversation Lookup
Message History
Unread Tracking
```

---

# Community Relationships

```text
Community
 │
 ├── Members
 │
 ├── Channels
 │
 └── CommunityMessages
```

Supports:

```text
Discord Style Architecture
```

---

# Notification Relationships

```text
Action
  │
  ▼

Notification Created
  │
  ▼

MongoDB Persist
  │
  ▼

Socket Emit
  │
  ▼

User Receives
```

---

# Indexing Strategy

Important indexes:

```text
usernameLower
emailLower

participants

community

author

createdAt
```

Goals:

```text
Fast Lookup
Search Efficiency
Reduced Query Cost
```

---

# Data Lifecycle

## Standard Records

```text
Create
Update
Delete
```

Examples:

```text
Users
Messages
Posts
Communities
```

---

## Ephemeral Records

```text
Create
Expire
Auto Delete
```

Examples:

```text
Stories
Verification Tokens
Password Reset Tokens
```

---

# Scaling Strategy

Current:

```text
MongoDB Atlas
Single Primary Cluster
```

Future:

```text
Read Replicas
Sharding
Dedicated Analytics DB
Search Cluster
```

---

# Database Summary

WebChat uses MongoDB to support:

```text
Authentication
Messaging
Communities
Stories
Notifications
Social Feed
Session Management
OAuth
Security Auditing
```

The database model is designed around modular collections, clear ownership relationships, realtime communication requirements, and future scalability.
