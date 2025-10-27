# Frontend Tenant Dashboard Starter

A Next.js 14 template for multi-tenant dashboards that runs entirely in the browser. It bundles Shadcn UI, typed mock data, and React Query hooks so you can prototype flows locally and swap in real APIs later.

## Why you might use it

- **Client-only architecture** – tenant session and data live in localStorage + mock repositories; no database or API server required.
- **Feature-first modules** – each domain (accounts, billing, tenants) owns its repositories, services, hooks, and UI components.
- **Ready-made UI system** – Shadcn primitives, theme provider, and shared layout pieces give you production styling without design thrash.
- **Quality guardrails** – TypeScript, ESLint, Prettier, lint-staged/Husky, Vitest, and Playwright cover the bases from unit tests to e2e checks.

## Tech stack

- Next.js App Router · React 18 · TypeScript 5
- Shadcn UI + TailwindCSS utilities
- TanStack Query for data fetching/caching
- Vitest + React Testing Library + Playwright
- Husky + lint-staged + Prettier + ESLint

## Project layout

```
apps/web/
  src/
    app/                # App Router routes (auth + dashboard)
    components/         # Shared UI primitives (Shadcn re-exports)
    features/<domain>/  # Feature modules: api, hooks, components
    mocks/              # Typed mock datasets
    providers/          # Query/theme/tenant session providers
    lib/                # Helpers (flags, logging, metrics, tests)
```

Supporting docs live under `docs/` and the roadmap in `tenant-template-roadmap.md`.

## Getting started

```bash
# install dependencies
npm install

# check optional env vars (feature flags, etc.)
npm run env:check

# start the dashboard
npm run dev --workspace web

# run quality checks
npm run lint --workspace web
npm run type-check --workspace web
npm run test:unit --workspace web
```

Playwright smoke tests are in `apps/web/tests/e2e`; start the dev server in another tab and run `npm run test:e2e --workspace web`.

## Feature flags

Toggle slices from `.env*` files:

```env
NEXT_PUBLIC_FEATURE_BILLING=true
NEXT_PUBLIC_FEATURE_MARKETPLACE=false
```

`getFeatureFlag()` and `useFeatureFlag()` (see `src/lib/flags.ts`) gate navigation, pages, and components.

## Quality toolkit

- **Linting & formatting** – ESLint + Prettier run via lint-staged/Husky on every commit; `npm run format` formats the repo manually.
- **Type safety** – `npm run type-check --workspace web`.
- **Unit tests** – Vitest collocated with code (`*.test.ts[x]`).
- **End-to-end** – Playwright config under `apps/web`.

## Extending to a backend

When you are ready to leave mock mode:

1. Replace repositories in `features/<domain>/api` with real fetch calls or SDKs.
2. Keep shared types in `src/types` so both client and server agree on payloads.
3. Swap the tenant session provider to read from your auth solution (cookies, JWT, etc.).
4. Reintroduce API routes or server functions as needed—docs outline the original phased plan.

## Documentation

- `tenant-template-roadmap.md` – phased rollout from frontend-only to production-grade.
- `docs/api-layer.md` – how the mock data flow works and how to plug in real endpoints.
- `docs/data-layer.md` – typed dataset approach and migration plan.
- `docs/feature-modules.md`, `docs/tenant-session.md`, `docs/feature-flags.md`, `docs/testing.md`, `docs/deployment.md`, `docs/shadcn-workflow.md` – subsystem deep dives.

## Contributing

This starter is intentionally opinionated but adaptable. If you improve the architecture, docs, or tooling, feel free to open a PR.

Happy building! 🚀
