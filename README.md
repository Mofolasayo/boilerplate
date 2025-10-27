# Tenant-Aware Next.js Template

This repository packages everything we learned while analysing the following open projects:

- [sanidhyy/finance-dashboard](https://github.com/sanidhyy/finance-dashboard) – feature-driven App Router structure and CRUD flows.
- [JosueIsOffline/finance-saas-platform](https://github.com/JosueIsOffline/finance-saas-platform) – multi-step dashboards and billing ideas.
- [calcom/cal.com](https://github.com/calcom/cal.com) – enterprise-grade monorepo patterns, TRPC/Hono APIs, testing, and documentation discipline.

The goal is to give you a head start when building a tenant-aware SaaS dashboard with Next.js 14+. The template layers these ideas into an opinionated, phase-by-phase build (see `tenant-template-roadmap.md` for the full journey). This edition is frontend-only so you can iterate quickly with deterministic mock data before wiring up a backend.

## What’s included

- **App Router scaffold** with protected dashboard/auth segments, shared providers, and a client-only tenant session context.
- **Mock data layer** implemented with typed repositories (`apps/web/src/mocks/sample-data.ts`) so the UI runs without a backend.
- **Feature-first architecture** – React Query services, modular hooks, and Shadcn-based UI primitives under `features/<domain>`.
- **Testing harness**: Vitest (unit tests with React Testing Library + happy-dom) and Playwright E2E scaffold.
- **Observability & ops**: Lightweight console logger, metric helper, environment validation, deployment + testing docs.
- **Feature flags & optional slices**: Billing and marketplace routes/components toggle via env vars for staged rollouts.

## Quick start

```bash
# install deps
npm install

# validate environment (fill in values via .env.example)
npm run env:check

# run dev server
npm run dev --workspace web

# format / lint / type-check / test
npm run format
npm run lint
npm run type-check
npm run test:unit
```

Playwright smoke tests live in `apps/web/tests/e2e`. Set `E2E_BASE_URL` and start the app before running `npm run test:e2e`.

## Feature flags

Controlled via `.env*`:

```env
NEXT_PUBLIC_FEATURE_BILLING=true
NEXT_PUBLIC_FEATURE_MARKETPLACE=false
```

Use `getFeatureFlag()` server-side and `useFeatureFlag()` client-side to gate components, routes, or navigation.

## Documentation

- `tenant-template-roadmap.md` – phased rollout of the entire template.
- `docs/feature-modules.md` – how to add new feature slices.
- `docs/api-layer.md`, `docs/testing.md`, `docs/deployment.md`, `docs/feature-flags.md`, `docs/shadcn-workflow.md`, `docs/tenant-session.md` – deep dives on each subsystem.

## Contributing

This template is intended as a starting point—adapt the roadmap, swap the mock repositories for real APIs, and plug in your identity/billing providers. PRs that improve the underpinning patterns or documentation are welcome.

Happy building! 🚀
