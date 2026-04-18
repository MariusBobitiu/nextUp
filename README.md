# nextUp

![nextUp logo](next-up/src/assets/nextUp%20-%20Logo.svg)

**Movie discovery for couples — stop arguing, start watching.**

![Node version](https://img.shields.io/badge/node-%3E%3D20.19.0-brightgreen?logo=node.js)
![React](https://img.shields.io/badge/react-18.2.0-61DAFB?logo=react)
![Express](https://img.shields.io/badge/express-4.19.2-000000?logo=express)
![MongoDB](https://img.shields.io/badge/mongodb-mongoose-47A248?logo=mongodb)
![TypeScript](https://img.shields.io/badge/typescript-strict-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/vite-8.x-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-3.x-06B6D4?logo=tailwindcss)

---

## Overview

**nextUp** is a full-stack movie and TV show discovery app that helps couples decide what to watch together. Browse trending content powered by [TMDB](https://www.themoviedb.org/), build a shared watchlist, and use the swipe interface to quickly agree on what's next.

### Key Features

- **Browse & Search** — Explore movies and TV shows by category via the TMDB API
- **Watchlist** — Add, remove, and clear titles from a personal watchlist
- **Authentication** — JWT-based sign-up/sign-in with secure password hashing
- **Password Reset** — Email-driven reset flow powered by [Resend](https://resend.com)
- **Profile & Settings** — Update display name, email, and password

---

## Project Structure

```text
nextUp/
├── next-up/   # React + TypeScript frontend (Vite)
└── server/    # Express + MongoDB backend
```

See sub-project READMEs for setup details:

- [Frontend →](next-up/README.md)
- [Backend →](server/README.md)

---

## Quick Start

### Prerequisites

| Tool | Version |
| ---- | ------- |
| Node.js | ≥ 20.19.0 |
| npm | ≥ 10 |
| MongoDB | Atlas or local instance |
| TMDB API Key | [Get one free](https://developer.themoviedb.org/docs/getting-started) |

### 1. Clone

```bash
git clone https://github.com/mariusbobitiu/nextUp.git
cd nextUp
```

### 2. Configure environment variables

**`server/.env`**

```env
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net
DB_NAME=next-up

JWT_SECRET=your-secret
SALT_ROUNDS=10
COOKIE_EXPIRATION=30d

TMDB_API_BASE_URL=https://api.themoviedb.org/3
TMDB_API_KEY=your-tmdb-api-key

RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=noreply@yourdomain.com

CLIENT_URL=http://localhost:5173
```

**`next-up/.env`**

```env
VITE_TMDB_API_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original
VITE_TMDB_API_KEY=your-tmdb-api-key
VITE_SV_API_BASE_URL=http://localhost:8081
VITE_CLIENT_URL=http://localhost:5173
```

### 3. Install & run

```bash
# Backend
cd server && npm install && npm run dev

# Frontend (new terminal)
cd next-up && npm install && npm run dev
```

App is available at <http://localhost:5173> — backend runs on <http://localhost:8081>.

---

## Tech Stack

| Layer | Technology |
| ----- | ---------- |
| Frontend | React 18, TypeScript, Vite, Redux Toolkit, React Query |
| Styling | Tailwind CSS, React Spring |
| Backend | Express.js, Node.js (ESM) |
| Database | MongoDB + Mongoose |
| Auth | JWT, bcrypt, cookie-parser |
| Email | Resend |
| Movie Data | TMDB API |

---

## API Reference

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| `POST` | `/auth/sign-up` | Register a new user |
| `POST` | `/auth/sign-in` | Login, returns JWT cookie |
| `GET` | `/movies/:username/watchlist` | Get user's watchlist |
| `POST` | `/movies/:username/watchlist` | Add movie to watchlist |
| `DELETE` | `/movies/:username/watchlist` | Remove movie from watchlist |
| `DELETE` | `/movies/:username/watchlist/clear` | Clear entire watchlist |
| `POST` | `/users/forgot-password` | Request password reset email |
| `POST` | `/users/reset-password` | Complete password reset |
| `PUT` | `/users/:username/update-user` | Update profile |
| `PUT` | `/users/:username/update-password` | Change password |
| `DELETE` | `/users/:username` | Delete account |
| `GET` | `/health` | Health check |
