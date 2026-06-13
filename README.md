# CalCom Clone

### Hexlet tests and linter status:
[![Actions Status](https://github.com/alekseibq/ai-for-developers-project-386/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/alekseibq/ai-for-developers-project-386/actions)

Full-stack meeting booking app — guests browse meeting types, pick time slots, book appointments; admins manage meeting types (CRUD).

## Tech Stack

- **Frontend**: Vue 3, Pinia, Vue Router, Tailwind CSS, TypeScript
- **Backend**: FastAPI, Pydantic, Motor (MongoDB), Poetry
- **Contracts**: TypeSpec → OpenAPI3
- **Tests**: Vitest (unit), Playwright (E2E), pytest + testcontainers (integration)
- **Infra**: Docker, docker-compose, Nginx

## Quick Start

```bash
make dev           # full stack via docker-compose
make dev-backend   # uvicorn hot-reload on :8000
make dev-frontend  # vite dev server on :5173
```

## Commands

| Make target     | Description               |
|-----------------|---------------------------|
| `make test`     | backend tests (pytest)    |
| `make lint`     | ruff (BE) + vue-tsc (FE)  |
| `make coverage` | pytest + coverage report  |
| `make generate` | TypeSpec → OpenAPI        |
| `make ci`       | test + lint + e2e         |

Frontend-specific: `npm run test:unit`, `npm run lint`.

## AI-Assisted Development

Project conventions for AI assistants are documented in [AGENTS.md](./AGENTS.md).
