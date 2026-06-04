# Database Entity Relationship Diagram

```text
                         User
                           │
      ┌────────────────────┼────────────────────┐
      │                    │                    │
      ▼                    ▼                    ▼

 Conversation         FeedPost              Story
      │                    │                    │
      ▼                    ▼                    ▼

   Message            Comment             Viewers

      │
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

# Authentication Collections

```text
User
 │
 ├── Session
 │
 ├── RefreshToken
 │
 ├── OAuthAccount
 │
 ├── LoginAttempt
 │
 ├── AuditLog
 │
 ├── EmailVerificationToken
 │
 └── PasswordResetToken
```
