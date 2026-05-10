# Backend — Task Manager API

Express + MongoDB + JWT (with AES‑256 encryption) + Zod validation.

## Run

```bash
npm install
npm run dev      # nodemon, port 7000
# or
npm start
```

Configure `.env` (see `.env.example`).

## Endpoints

Prefix: `/api/v1`

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/user/signup` | No | Create user, return user + encrypted access/refresh tokens |
| POST | `/user/login` | No | Login, return user + encrypted access/refresh tokens |
| POST | `/user/refresh-token` | No | Issue a new pair using the encrypted refresh token |
| POST | `/user/logout` | Yes | Clear refresh token on the server |
| GET  | `/user/me` | Yes | Decoded current user payload |
| POST | `/task` | Yes | Create task `{ title, description }` |
| GET  | `/task` | Yes | List current user's tasks |
| PATCH | `/task/:id` | Yes | Update task fields (`status`, `title`, `description`) |
| DELETE | `/task/:id` | Yes | Delete a task |

Send the encrypted access token as `Authorization: Bearer <token>`.

## Folder layout

```
src/
├── app.js
├── index.js
├── config/db.js
├── controllers/
├── middleware/         # auth, error, validate (Zod)
├── models/             # User, Task
├── routes/             # /user, /task
├── services/           # business logic
├── utils/              # JWT, AES, ApiError, ApiResponse, asyncHandler
└── validators/         # Zod schemas
```
