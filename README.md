# professional-training-plan

خطة تدريب احترافية شاملة وفقاً لمعايير جهاز الدولة المصرية — Professional Training Plan according to GAHR Standards.

A bilingual (Arabic RTL / English) web application for managing a civil-service
professional training catalogue aligned with the competency domains expected by
the Egyptian Central Agency for Organization and Administration (GAHR).

## Stack

- **Backend:** Node.js + Express API (`server/`) exposing the training catalogue and aggregate statistics.
- **Frontend:** React + TypeScript, built with Vite (`src/`), with a right-to-left Arabic UI and an English toggle.
- **Tooling:** ESLint, TypeScript, Vitest (+ Testing Library and Supertest).

## Getting started

```bash
npm ci        # install exact dependencies
npm run dev   # start the API (:3001) and the web dev server (:5173)
```

Open http://localhost:5173. The Vite dev server proxies `/api` to the Express API.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Run the API and web dev server together. |
| `npm run build` | Build the production frontend into `dist/`. |
| `npm start` | Serve the built frontend and API from Express (production). |
| `npm run lint` | Lint the codebase with ESLint. |
| `npm run typecheck` | Type-check with the TypeScript compiler. |
| `npm test` | Run the Vitest unit/integration suite. |

## API

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Service health check. |
| `GET` | `/api/programs` | List all training programs. |
| `GET` | `/api/stats` | Aggregate statistics (totals, hours, levels, categories). |
| `POST` | `/api/programs` | Create a training program (validated). |

## Cloud Agent environment

`.cursor/environment.json` configures the Cursor Cloud Agent environment: `npm ci`
on install and a `dev` terminal that runs both servers, exposing ports 5173 (web)
and 3001 (api).
