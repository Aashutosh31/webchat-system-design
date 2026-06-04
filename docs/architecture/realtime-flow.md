# Realtime Messaging Flow

```text
Sender
  │
  ▼

Send Message
  │
  ▼

REST Endpoint
  │
  ▼

Message Saved
(MongoDB)
  │
  ▼

Socket Event
Emitted
  │
  ▼

Receiver Socket
  │
  ▼

Store Update
  │
  ▼

UI Refresh
```

---

# Presence Flow

```text
User Connects
      │
      ▼

Socket Registered
      │
      ▼

Redis Presence
      │
      ▼

Online Users Broadcast
      │
      ▼

Clients Updated
```

---

# Notification Flow

```text
Action
  │
  ▼

Create Notification
  │
  ▼

MongoDB Save
  │
  ▼

Socket Emit
  │
  ▼

Recipient Receives
```
