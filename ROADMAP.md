# FinPilot AI 15-Day Roadmap

This roadmap turns the project scope from `README.md` into a focused 15-day build plan. The goal is to ship a production-style AI-powered personal finance platform with a React frontend, FastAPI backend, Supabase PostgreSQL/Auth, Gemini AI features, tests, and deployment.

## Execution Priorities

- **Days 1-5:** Project foundation, database, backend structure, authentication, and UI shell.
- **Days 6-10:** Core finance features: expenses, income, budgets, goals, and analytics.
- **Days 11-13:** AI assistant, receipt scanning, notifications, reports, and exports.
- **Days 14-15:** Testing, deployment, monitoring, documentation, and final polish.

## Critical Path

Database and auth must come first, then the finance data flows, then analytics, then AI. The recommended build order is:

1. Database
2. Authentication
3. Expenses and income
4. Budgets and savings goals
5. Analytics dashboard
6. Gemini AI assistant
7. Receipt scanner
8. Reports and notifications
9. Tests
10. Deployment

---

## Day 1: Project Setup and Architecture

- [x] Verify repository structure: `frontend/`, `backend/`, `docs/`
- [x] Set up React + Vite + TypeScript frontend
- [x] Set up FastAPI backend
- [x] Configure Python virtual environment instructions
- [x] Add `.env.example` files for frontend and backend
- [x] Set up Docker Compose skeleton
- [x] Create initial architecture notes in `docs/`
- [x] Confirm local development commands for frontend and backend

## Day 2: Database and Supabase Setup

- [ ] Create or configure Supabase project
- [ ] Configure PostgreSQL connection
- [ ] Set up SQLAlchemy
- [ ] Set up Alembic migrations
- [ ] Create core database models:
  - [ ] User
  - [ ] Account
  - [ ] Category
  - [ ] Transaction/Expense
  - [ ] Income
  - [ ] Budget
  - [ ] SavingGoal
  - [ ] Receipt
  - [ ] AIInsight
- [ ] Generate first migration
- [ ] Apply migration locally
- [ ] Verify database connection from FastAPI

## Day 3: Backend Foundation

- [ ] Create FastAPI application entrypoint
- [ ] Add `/health`, `/ready`, and `/live` endpoints
- [ ] Configure CORS
- [ ] Add global error handling
- [ ] Add request/response logging middleware
- [ ] Create backend module structure:
  - [ ] `api/`
  - [ ] `core/`
  - [ ] `database/`
  - [ ] `models/`
  - [ ] `repositories/`
  - [ ] `schemas/`
  - [ ] `services/`
  - [ ] `utils/`
- [ ] Add base repository pattern
- [ ] Add shared Pydantic response conventions

## Day 4: Authentication

- [ ] Configure Supabase Auth
- [ ] Implement register endpoint
- [ ] Implement login endpoint
- [ ] Implement logout endpoint
- [ ] Implement JWT verification dependency
- [ ] Add protected-route dependency
- [ ] Add current-user endpoint
- [ ] Create frontend auth context
- [ ] Build login page
- [ ] Build register page
- [ ] Persist session on page refresh
- [ ] Protect authenticated frontend routes

## Day 5: App Shell and UI System

- [ ] Install and configure TailwindCSS
- [ ] Set up shadcn/ui
- [ ] Configure React Router
- [ ] Create dashboard layout
- [ ] Create sidebar navigation
- [ ] Add light/dark theme support
- [ ] Add global loading states
- [ ] Add toast notification system
- [ ] Create reusable UI components:
  - [ ] Page header
  - [ ] Data table
  - [ ] Empty state
  - [ ] Modal/dialog
  - [ ] Form field wrapper
- [ ] Confirm responsive layout on mobile and desktop

## Day 6: Expense Management

- [ ] Create backend expense schemas
- [ ] Create expense repository
- [ ] Create expense service
- [ ] Add expense CRUD endpoints
- [ ] Add pagination
- [ ] Add search
- [ ] Add category filter
- [ ] Add merchant and notes fields
- [ ] Build frontend expense list page
- [ ] Build create/edit expense form
- [ ] Add delete expense flow
- [ ] Add optimistic updates with TanStack Query
- [ ] Add validation with React Hook Form and Zod

## Day 7: Income Management

- [ ] Create income model, schema, repository, and service
- [ ] Add income CRUD endpoints
- [ ] Support income source types:
  - [ ] Salary
  - [ ] Freelance
  - [ ] Investment
  - [ ] Rental
  - [ ] Business
  - [ ] Other
- [ ] Build frontend income list page
- [ ] Build create/edit income form
- [ ] Add monthly income summary
- [ ] Add income source breakdown
- [ ] Add income validation and error states

## Day 8: Budget Management

- [ ] Create budget schemas
- [ ] Create budget repository
- [ ] Create budget service
- [ ] Add budget CRUD endpoints
- [ ] Calculate spent amount
- [ ] Calculate remaining amount
- [ ] Add overspending detection
- [ ] Add budget status values: safe, warning, exceeded
- [ ] Build frontend budget dashboard
- [ ] Build create/edit budget form
- [ ] Add category budget progress bars
- [ ] Add budget warning UI

## Day 9: Savings Goals

- [ ] Create saving goal schemas
- [ ] Create saving goal repository
- [ ] Create saving goal service
- [ ] Add savings goal CRUD endpoints
- [ ] Add progress calculation
- [ ] Add target-date tracking
- [ ] Add suggested monthly contribution calculation
- [ ] Build frontend goals page
- [ ] Build create/edit goal form
- [ ] Add visual progress cards
- [ ] Add goal completion state

## Day 10: Analytics Dashboard

- [ ] Create backend analytics service
- [ ] Add monthly spending summary
- [ ] Add income vs expense summary
- [ ] Add category breakdown
- [ ] Add cash flow calculation
- [ ] Add budget utilization calculation
- [ ] Add spending trend endpoint
- [ ] Build dashboard summary cards:
  - [ ] Total income
  - [ ] Total expenses
  - [ ] Net savings
  - [ ] Budget utilization
  - [ ] Financial health score
- [ ] Add line, bar, pie, and area charts
- [ ] Verify analytics for empty and populated accounts

## Day 11: Gemini AI Financial Assistant

- [ ] Create AI service abstraction
- [ ] Configure Gemini API key through environment variables
- [ ] Add `/ai/chat` endpoint
- [ ] Build user financial context from transactions, budgets, goals, and income
- [ ] Add prompt templates for financial questions
- [ ] Validate and normalize AI responses
- [ ] Add safeguards against unsafe financial guarantees
- [ ] Build frontend AI chat component
- [ ] Add chat loading state
- [ ] Add chat error state
- [ ] Add basic chat history UI

## Day 12: AI Receipt Scanner

- [ ] Add backend file upload handling
- [ ] Add receipt metadata model
- [ ] Implement OCR pipeline
- [ ] Send receipt text or image context to Gemini
- [ ] Parse Gemini response into structured JSON
- [ ] Validate receipt response with Pydantic
- [ ] Extract merchant, date, amount, currency, tax, category, and line items
- [ ] Auto-create expense from valid receipt data
- [ ] Build frontend receipt upload UI
- [ ] Build extracted receipt review screen
- [ ] Add category prediction flow

## Day 13: Notifications, Reports, and Export

- [ ] Create notification model, schema, repository, and service
- [ ] Add budget overrun notifications
- [ ] Add savings milestone notifications
- [ ] Add monthly report notification
- [ ] Add reports endpoints
- [ ] Add CSV export
- [ ] Add PDF export if time permits
- [ ] Build frontend notification center
- [ ] Build frontend reports page
- [ ] Add export buttons
- [ ] Verify report output with real sample data

## Day 14: Testing and Quality

- [ ] Add backend unit tests with PyTest
- [ ] Add backend integration tests for critical APIs
- [ ] Add frontend component tests
- [ ] Add tests for auth flows
- [ ] Add tests for expense CRUD
- [ ] Add tests for income CRUD
- [ ] Add tests for budget calculations
- [ ] Add tests for analytics summaries
- [ ] Add tests for AI response parsing
- [ ] Add Playwright E2E tests:
  - [ ] Register/login
  - [ ] Create expense
  - [ ] View dashboard
  - [ ] Upload receipt
- [ ] Run `ruff check .`
- [ ] Run `black .`
- [ ] Run frontend lint and format
- [ ] Fix blocking quality issues

## Day 15: Deployment, Monitoring, and Final Polish

- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Railway
- [ ] Connect production Supabase database
- [ ] Configure production environment variables
- [ ] Configure production CORS
- [ ] Set up GitHub Actions CI
- [ ] Add install, lint, test, build, Docker build, deploy, and health check pipeline steps
- [ ] Configure Sentry
- [ ] Configure PostHog
- [ ] Verify `/health`, `/ready`, and `/live`
- [ ] Verify Swagger docs
- [ ] Verify ReDoc docs
- [ ] Run full production smoke test
- [ ] Update `README.md` with final deployed URLs
- [ ] Document known limitations
- [ ] Document future enhancements

---

## Definition of Done

- [ ] Users can register, log in, and access a protected dashboard
- [ ] Users can create, edit, delete, search, and filter expenses
- [ ] Users can manage income sources
- [ ] Users can create budgets and see budget utilization
- [ ] Users can create savings goals and track progress
- [ ] Dashboard shows financial summaries and charts
- [ ] AI assistant answers finance questions using user data
- [ ] Receipt scanner extracts expense data from uploaded receipts
- [ ] Reports and exports are available
- [ ] Critical backend and frontend tests pass
- [ ] App is deployed with production environment variables
- [ ] Health checks and monitoring are configured
- [ ] README and docs are up to date

## Stretch Goals

- [ ] Google OAuth
- [ ] Email verification
- [ ] Password reset
- [ ] Avatar upload
- [ ] Multi-currency support
- [ ] Subscription detection
- [ ] Recurring transaction detection
- [ ] Advanced anomaly detection
- [ ] Redis caching
- [ ] Background jobs for reports and AI processing
- [ ] Mobile app with React Native
