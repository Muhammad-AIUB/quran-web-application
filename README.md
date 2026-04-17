# Quran Web Application

## Overview

A full-stack web app for reading the Quran in the browser: **114 surahs**, **per-surah ayah pages**, **English translation search**, and **persistent typography settings**.  
Built as a static-data, API-backed architecture—no database. Text and translations are bundled from [**risan/quran-json**](https://github.com/risan/quran-json).

## Tech Stack

- **Frontend:** Next.js 15 (App Router, SSG), React 19, Tailwind CSS, `next-themes`, React **Context** for settings with **`localStorage`** persistence and **hydration-safe** initialization
- **Backend:** Node.js, Hono, TypeScript
- **Data:** JSON on disk (surah index + per-surah files), loaded once into memory on the API
- **Tests:** Vitest (backend API/service, frontend utilities)

## Features

**Frontend**

- Surah index with Arabic name, transliteration, English title, Meccan/Medinan
- Ayah reading view (Arabic, translation, transliteration) with SSG for routes `/surah/[id]`
- Translation search UI with debounced requests and match highlighting
- Reading settings: Arabic typeface (≥2 options), Arabic size, translation size—**React Context** + **`localStorage`**, with **hydration-safe** initialization (stable defaults for SSR/first paint, then apply stored values after mount)
- Responsive layout: app shell, mobile settings drawer, desktop settings sidebar
- Theme toggle (light / dark / system)

**Backend**

- REST API over JSON corpus: list surahs, fetch one surah, search ayahs by translation text
- In-memory search index built at startup (normalized English text)
- CORS configurable for deployed frontend origin(s)
- Health check endpoint for uptime monitoring

## System Architecture

```
User → Next.js (static pages + client fetch) → Hono API → in-memory JSON (loaded from disk at startup)
```

- **Surah list and ayah pages** are generated from JSON in `frontend/data` at build time (SSG).
- **Search** calls the API (`GET /search`), which queries the in-memory index derived from `backend/data`.

## Folder Structure

```
quran-web-application/
├── backend/
│   ├── data/                 # surahs.json, surah/{1..114}.json
│   └── src/
│       ├── app.ts            # Hono app, CORS, /health
│       ├── server.ts
│       ├── routes/           # quran routes
│       └── services/         # load JSON, search
├── frontend/
│   ├── app/                  # App Router pages
│   ├── components/
│   ├── context/              # settings (localStorage)
│   ├── data/                 # mirror of JSON for SSG
│   └── utils/                # API client, types, fonts, highlight
├── docs/                     # architecture notes, smoke HTTP, QA checklists
├── package.json              # root scripts: dev, build, test
└── README.md
```

## Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd quran-web-application
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   cp .env.example .env
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../frontend
   cp .env.example .env.local
   npm install
   ```

4. **Run the API** (from `backend/`)

   ```bash
   npm run dev
   ```

   Default: `http://localhost:8787`

5. **Run the web app** (from `frontend/`, second terminal)

   ```bash
   npm run dev
   ```

   Default: `http://localhost:3000`

**Environment variables**

`backend/.env`

```env
PORT=8787
CORS_ORIGIN=http://localhost:3000
# Optional: DATA_DIR=/absolute/path/to/data
```

`frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8787
```

**Run API + web together** (optional, from repository root after `npm install`):

```bash
npm run dev
```

## API Endpoints

| Method | Path | Input | Output |
| ------ | ---- | ----- | ------ |
| `GET` | `/health` | — | `{ status, service, timestamp }` — liveness |
| `GET` | `/surahs` | — | `{ data: SurahSummary[] }` |
| `GET` | `/surah/:id` | `id` integer **1–114** | `{ data: SurahWithVerses }` or `400` / `404` |
| `GET` | `/search` | `q` (string), optional `limit` (1–200, default 120) | `{ data: Hit[], query }` — translation substring search (normalized) |

Query length is capped server-side (very long input is truncated before search).

## Edge Cases Handled

- **Empty or whitespace-only search** — API returns an empty result set; UI prompts the user to enter a query where appropriate.
- **No search results** — Empty state in the search UI.
- **Invalid surah id** (not 1–114, or non-numeric) — API responds with `400`; missing surah data returns `404`.
- **Missing or corrupt JSON** — API initialization fails fast at startup if data cannot be loaded (process error); invalid `localStorage` settings fall back to defaults.
- **First visit / empty `localStorage`** — Default font and sizes applied until the user saves settings.
- **Large font sizes** — Arabic and translation sizes are clamped to safe ranges so layout remains usable.

## Testing Approach

- **Smoke testing** — Run API (`/health`, `/surahs`, `/surah/1`, `/search?q=mercy`) and open main UI flows (list → surah → search). Example HTTP requests: `docs/smoke-api.http`.
- **Automated** — `npm test` at repo root runs backend + frontend Vitest suites (route/service behavior, utilities).
- **Settings persistence (`localStorage`)** — Manually verified across **normal page reload**, **hard reload** (bypass cache), and **new browser session** (same origin): typography choices remain applied and match DevTools → Application → Local Storage.
- **Manual checklist (short)**  
  - Surah list loads and links resolve for several ids (1, 2, 114).  
  - Search returns expected hits and handles API offline (error message).  
  - Settings: sliders respect min/max; persistence covered above.  
  - Responsive: drawer vs sidebar at breakpoints.  
  - Deployed: CORS and `NEXT_PUBLIC_API_URL` verified against production API.

## Future Improvements

- Bookmark system and reading progress
- Dark mode (additional palettes, contrast, scheduling)
- Offline support (PWA, cached surah JSON)
- Advanced search indexing (fuzzy match, optional Arabic token search)
- Performance optimizations (bundle splitting, font strategy, HTTP caching)

## Deployment

- **Frontend (e.g. Vercel):** Project root **`frontend`**. Set **`NEXT_PUBLIC_API_URL`** to the public HTTPS API origin (no trailing slash). Redeploy when the API URL changes.
- **Backend (e.g. Render, Railway):** Root **`backend`**. Build: `npm install && npm run build`. Start: `npm start`. Set **`PORT`** if the platform does not inject it. Set **`CORS_ORIGIN`** to your frontend origin (comma-separated for multiple).
- **CORS:** Must include the exact scheme + host + port of the deployed web app, or the browser will block search requests.

## Important Notes

- **No database** — By design; the corpus is versioned JSON in the repo.
- **Static data** — Same dataset under `backend/data` (API) and `frontend/data` (SSG); keep in sync when updating from upstream `quran-json`.
- **In-memory API** — JSON is read at startup and held in memory for fast list/search; restarting the process reloads data.
- **Attribution** — Quran text and translations: see [**risan/quran-json**](https://github.com/risan/quran-json).