# Local Development

## Prerequisites

- Node.js 22 or newer
- npm 10 or newer
- Python 3.11 or newer for local development
- Docker Desktop for containerized development

The README targets Python 3.13 for production. The current scaffold is compatible with Python 3.11+ so development can start on machines that have not upgraded yet.

## Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
uvicorn app.main:app --reload
```

Health endpoints:

```bash
curl http://127.0.0.1:8000/health
curl http://127.0.0.1:8000/ready
curl http://127.0.0.1:8000/live
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`.

## Full Stack with Docker

```bash
docker compose up --build
docker compose logs
docker compose down
```

## Quality Checks

```bash
cd backend
pytest
ruff check .
black --check .
```

```bash
cd frontend
npm run lint
npm run typecheck
npm run build
```

