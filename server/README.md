# nextUp — Backend

![Node.js](https://img.shields.io/badge/node-%3E%3D20.19.0-brightgreen?logo=node.js)
![Express](https://img.shields.io/badge/express-4.19.2-000000?logo=express)
![MongoDB](https://img.shields.io/badge/mongodb-mongoose-47A248?logo=mongodb)
![ESModules](https://img.shields.io/badge/esm-native-F7DF1E?logo=javascript)

Express REST API backed by MongoDB. Handles authentication, watchlist management, and proxies TMDB data to the frontend.

---

## Setup

### Prerequisites

- Node.js ≥ 20.19.0
- MongoDB (Atlas cluster or local instance)
- TMDB API key — [get one free](https://developer.themoviedb.org/docs/getting-started)
- Resend account for email (password reset)

### Install & run

```bash
npm install
npm run dev
```

Runs on <http://localhost:8081> by default.

### Environment variables

Create a `.env` file in this directory:

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

---

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start server with nodemon (auto-reload) |
| `npm start` | Start server for production |

---

## Project Structure

```text
src/
├── index.js             # Express app setup, middleware, route mounting
├── config/
│   └── db.js            # MongoDB connection with connection caching
├── Routes/
│   ├── AuthRoute.js     # /auth endpoints
│   ├── MovieRoute.js    # /movies endpoints
│   └── UserRoute.js     # /users endpoints
├── Controllers/
│   ├── AuthController.js
│   ├── MoviesController.js
│   └── UserController.js
├── Models/
│   ├── UserModel.js     # User schema (includes watchlist array)
│   └── MovieModel.js
├── Middlewares/
│   ├── userVerification.js  # JWT verification middleware
│   └── logger.js            # Request logging
└── util/                # Shared utility functions
```

---

## API Endpoints

### Auth — `/auth`

| Method | Path | Auth | Description |
| ------ | ---- | ---- | ----------- |
| `POST` | `/auth/sign-up` | — | Register a new user |
| `POST` | `/auth/sign-in` | — | Login; sets JWT cookie |
| `POST` | `/auth/` | JWT | Verify current session |

### Watchlist — `/movies`

| Method | Path | Auth | Description |
| ------ | ---- | ---- | ----------- |
| `GET` | `/movies/:username/watchlist` | JWT | Get user's watchlist |
| `POST` | `/movies/:username/watchlist` | JWT | Add a movie |
| `DELETE` | `/movies/:username/watchlist` | JWT | Remove a movie |
| `DELETE` | `/movies/:username/watchlist/clear` | JWT | Clear all movies |

### Users — `/users`

| Method | Path | Auth | Description |
| ------ | ---- | ---- | ----------- |
| `POST` | `/users/forgot-password` | — | Send password reset email |
| `POST` | `/users/reset-password` | — | Complete password reset |
| `POST` | `/users/verify-token` | — | Verify a JWT token |
| `PUT` | `/users/:username/update-user` | JWT | Update profile |
| `PUT` | `/users/:username/update-password` | JWT | Change password |
| `DELETE` | `/users/:username` | JWT | Delete account |
| `POST` | `/users/logout` | JWT | Logout and clear cookie |

### Health

| Method | Path | Description |
| ------ | ---- | ----------- |
| `GET` | `/` | Welcome message |
| `GET` | `/health` | Health check |
