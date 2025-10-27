# Tenant-Aware Next.js Template

This repository packages everything we learned while analysing the following open projects:

- [sanidhyy/finance-dashboard](https://github.com/sanidhyy/finance-dashboard) – feature-driven App Router structure and CRUD flows.
- [JosueIsOffline/finance-saas-platform](https://github.com/JosueIsOffline/finance-saas-platform) – multi-step dashboards and billing ideas.
- [calcom/cal.com](https://github.com/calcom/cal.com) – enterprise-grade monorepo patterns, TRPC/Hono APIs, testing, and documentation discipline.

The goal is to give you a head start when building a tenant-aware SaaS dashboard with Next.js 14+. The template layers these ideas into an opinionated, phase-by-phase build (see `tenant-template-roadmap.md` for the full journey).

## What’s included

- **App Router scaffold** with protected dashboard/auth segments and shared providers (Clerk-ready session helpers).
- **Drizzle ORM schema**, Neon client, seed script, and generated Zod validators for tenants, members, accounts, and subscriptions.
- **Edge API** via Hono, typed client hooks (TanStack Query), and feature-first folders (`features/<domain>/{api,components,hooks}`).
- **UI system** built on Tailwind + Shadcn, reusable layout components (data cards, tables, filter toolbar), and feature flag driven navigation.
- **Testing harness**: Vitest (unit/integration with React Testing Library + happy-dom) and Playwright E2E scaffold.
- **Observability & ops**: Pino logging, structured metric helper, environment validation, deployment + testing docs.
- **Feature flags & optional slices**: Billing and marketplace routes/components toggle via env vars, ready for gradual rollout.

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

# seed demo tenant data (requires DATABASE_URL)
npm run db:seed --workspace web
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

This template is intended as a starting point—adapt the roadmap, extend the DB schema, and plug in your identity/billing providers. PRs that improve the underpinning patterns or documentation are welcome.  

Happy building! 🚀
