# nextUp — Frontend

![React](https://img.shields.io/badge/react-18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/typescript-strict-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/vite-8.x-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-3.x-06B6D4?logo=tailwindcss)
![Redux Toolkit](https://img.shields.io/badge/redux--toolkit-2.x-764ABC?logo=redux)

React + TypeScript single-page application built with Vite.

---

## Setup

### Prerequisites

- Node.js ≥ 20.19.0
- Backend server running (see [`../server`](../server/README.md))
- TMDB API key — [get one free](https://developer.themoviedb.org/docs/getting-started)

### Install & run

```bash
npm install
npm run dev
```

Runs on <http://localhost:5173> by default.

### Environment variables

Create a `.env` file in this directory:

```env
VITE_TMDB_API_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original
VITE_TMDB_API_KEY=your-tmdb-api-key
VITE_SV_API_BASE_URL=http://localhost:8081
VITE_CLIENT_URL=http://localhost:5173
```

---

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint (zero warnings allowed) |

---

## Tech Stack

| Package | Purpose |
| ------- | ------- |
| React 18 + TypeScript | UI framework |
| Vite + SWC | Build tool and compiler |
| Redux Toolkit + Redux Persist | Global state, persisted to localStorage |
| React Query | Server state and data fetching |
| React Router DOM 6 | Client-side routing |
| Tailwind CSS | Utility-first styling |
| React Spring | Animations |
| Swiper / React Tinder Card | Carousel and swipe UI |
| DOMPurify | HTML sanitization |
| React Icons | Icon library |

---

## Project Structure

```text
src/
├── app/
│   ├── App.tsx          # Route definitions
│   └── Store.ts         # Redux store + persist config
├── components/          # Reusable UI components
├── features/
│   └── user/            # Redux user slice
├── pages/               # One file per route
├── services/            # API call functions
├── types/               # TypeScript type definitions
├── lib/                 # Shared utilities
└── assets/              # Static images and styles
```
