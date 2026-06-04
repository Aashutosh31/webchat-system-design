# WebChat System Architecture

```text
                                  USERS
                                    │
                                    ▼

                     ┌─────────────────────────┐
                     │      React Client       │
                     │  Vite + Zustand + UI    │
                     └───────────┬─────────────┘
                                 │
               ┌─────────────────┼─────────────────┐
               │                 │                 │
               ▼                 ▼                 ▼

         REST API         Socket.IO         LiveKit Voice
          (Axios)          Realtime            Rooms

               │                 │                 │
               └─────────────────┴─────────────────┘
                                 │
                                 ▼

                     ┌─────────────────────────┐
                     │     Express Backend     │
                     └───────────┬─────────────┘
                                 │

      ┌──────────────┬───────────┼──────────────┬──────────────┐
      │              │           │              │              │
      ▼              ▼           ▼              ▼              ▼

 Authentication   Messaging   Feed      Communities      Stories

      │              │           │              │              │
      └──────────────┴───────────┴──────────────┴──────────────┘
                                 │
                                 ▼

                          MongoDB Atlas

                                 │
                                 ▼

                               Redis

                                 │
                                 ▼

                            Cloudinary

                                 │
                                 ▼

                              LiveKit

                                 │
                                 ▼

                     Google Apps Script
                           Email Layer
```
