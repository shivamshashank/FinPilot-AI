# Contributing to FinPilot AI

Thank you for your interest in contributing to **FinPilot AI**! This project is a
full-stack AI-powered personal finance platform with a React frontend, FastAPI
backend, Docker-based development setup, and GitHub Actions CI/CD.

We welcome contributions from developers, designers, testers, and documentation
contributors.

---

## 🗺️ Ways to Contribute

You can contribute by:

- reporting bugs or unexpected behavior
- suggesting features or product improvements
- submitting pull requests for fixes or enhancements
- improving documentation and examples
- adding tests for backend and frontend behavior

---

## 🛠️ Development Setup

### Prerequisites

To work on the project locally, you will need:

- Python 3.11+
- Node.js 22+
- npm 10+
- Docker and Docker Compose (optional but recommended)
- Git

### Get the Code

1. Fork the repository on GitHub:
   https://github.com/shivamshashank/FinPilot-AI.git
2. Clone your fork locally:

   ```bash
   git clone https://github.com/YOUR-USERNAME/FinPilot-AI.git
   cd FinPilot-AI
   ```

3. Add the upstream repository:

   ```bash
   git remote add upstream https://github.com/shivamshashank/FinPilot-AI.git
   ```

4. Install dependencies:

   ```bash
   cd backend
   python -m pip install -r requirements.txt

   cd ../frontend
   npm install
   ```

5. Install pre-commit hooks:

   ```bash
   pre-commit install
   ```

---

## 💻 Working on Code

### 1. Create a Branch

Use a descriptive branch name:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 2. Project Structure

The repository is organized as:

- `backend/`: FastAPI application, API routes, config, and tests
- `frontend/`: React + TypeScript + Vite app and tests
- `docs/`: architecture and development documentation
- `.github/workflows/`: CI/CD pipelines for validation and releases

### 3. Formatting & Linting

Before committing, run the relevant checks:

```bash
cd backend
ruff check .
black --check .
pytest

cd ../frontend
npm run lint
npm run typecheck
npm run test:coverage
```

### 4. Pre-commit Hooks

Pre-commit hooks run on commit and push for repository-wide checks. If you want
manual validation, run:

```bash
pre-commit run --all-files --show-diff-on-failure
```

---

## 📝 Commit Guidelines

We recommend using [Conventional Commits](https://www.conventionalcommits.org/)
for a readable history:

- `feat: add expense insights dashboard`
- `fix: correct backend health check response`
- `docs: update local development steps`
- `test: add frontend unit coverage`
- `refactor: simplify API router structure`

---

## 🚀 Submitting a Pull Request

When your changes are ready:

1. Push your branch to your fork:

   ```bash
   git push origin branch-name
   ```

2. Open a pull request against the repository:
   https://github.com/shivamshashank/FinPilot-AI
3. Include a clear summary of changes, testing steps, and any screenshots if the
   UI changed.
4. Ensure the GitHub Actions checks pass before requesting review.

Once approved and passing CI, a maintainer will merge your PR.
