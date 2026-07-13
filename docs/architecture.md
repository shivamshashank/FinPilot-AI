# FinPilot AI Architecture

FinPilot AI is organized as a full-stack SaaS application with a React frontend and a FastAPI backend. Day 1 establishes the foundation only: runnable app shells, health checks, configuration boundaries, and local development conventions.

## System Layers

- **Frontend:** React, TypeScript, Vite, and CSS modules/global CSS for the initial shell.
- **Backend:** FastAPI, Pydantic settings, API router versioning, and health endpoints.
- **Database:** Supabase PostgreSQL will be added during Day 2.
- **Auth:** Supabase Auth will be added during Day 4.
- **AI:** Gemini service integration will be added after the core finance flows exist.

## Repository Layout

```text
finpilot-ai/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── tests/
│   │   └── main.py
│   ├── Dockerfile
│   ├── pyproject.toml
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.ts
├── docs/
├── docker-compose.yml
└── ROADMAP.md
```

## API Versioning

All application APIs should live under `/api/v1`. Operational endpoints such as `/health`, `/ready`, and `/live` are intentionally exposed at the root for deployment platforms and health checks.

## Configuration

Runtime configuration belongs in environment variables. Keep committed files limited to `.env.example` templates and never commit real secrets.

