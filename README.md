# Investing Copilot

AI-powered investment copilot. RAG over financial filings and news, deterministic portfolio math, Gemini for synthesis.

## Requirements

- Node.js 20.x LTS
- pnpm 9.x (or npm 10+)
- Docker (for local Postgres via Testcontainers)
- A Google Cloud project with Gemini API enabled

## Quickstart

```bash
pnpm install
cp .env.example .env   # fill in values — see "Secrets" below
pnpm dev
```

The server starts on `http://localhost:3000`. Health check: `GET /health`.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Run the server in watch mode |
| `pnpm build` | Compile TypeScript to `dist/` |
| `pnpm start` | Run the compiled server |
| `pnpm test` | Run unit + integration tests |
| `pnpm test:unit` | Unit tests only |
| `pnpm test:e2e` | End-to-end tests |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` |

## Secrets

Local development uses `.env` (never committed). See `.env.example` for required keys.

Staging and production pull secrets from **GCP Secret Manager**. See `docs/deployment.md` (TBD).

## Architecture

See `docs/blueprint.md` for the architecture diagram and sprint plan.

## Deployment

Trunk-based. Merges to `main` auto-deploy to **staging** on Cloud Run. Tagging a release (`v*`) promotes to **prod** with manual approval. See `.github/workflows/`.