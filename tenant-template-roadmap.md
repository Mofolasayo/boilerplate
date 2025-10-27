# Tenant-Aware Next.js Template Roadmap

This guide translates the architectural strengths and pitfalls observed in `finance-dashboard`, `finance-platform`, and the Cal.com monorepo into a phased plan for building a production-ready, multi-tenant Next.js template. Progress through the phases sequentially; each one introduces guardrails that keep tenant isolation, performance, and developer experience in balance.

## Phase 0 – Foundations & Tooling

- **Repository shape**: Start with a Turborepo (or at minimum a strict Next.js workspace) to accommodate future packages. Cal.com’s workspaces keep auth, UI, and domain logic separated while still sharing linting and build pipelines.
- **TypeScript discipline**: Enable `strict`, `noImplicitAny`, and path aliases from day one. The smaller projects rely on inference; the monorepo demonstrates the payoff of fully typed contexts.
- **Linting & formatting**: Adopt `eslint-config-next`, `@typescript-eslint`, and a Prettier config. Wire up `turbo lint`/`lint-staged` tasks, mirroring Cal.com’s repository gating so formatting drift is caught before merge.
- **Env management**: Model environment schemas after Cal.com’s `turbo.json`/dotenv checker usage. Define required variables (`DATABASE_URL`, `NEXT_PUBLIC_APP_URL`, tenant keys) and ship `.env.example` before writing any feature code.
- **UI kit setup**: Install and configure `shadcn/ui` via its CLI, commit a base set of components (button/input/form primitives), and document the generation workflow so every contribution follows the same design system.

## Phase 1 – Base App & Workspace Layout

- **Next.js App Router**: Scaffold a Next.js 14+ project with the App Router. Mirror the `app/(dashboard)` and `app/(auth)` segment pattern from `finance-dashboard` for clear separation of authenticated vs public surfaces.
- **Shared providers**: Introduce layout-level providers (`QueryClientProvider`, theming, toast) just as `providers/query-provider.tsx` and `app/layout.tsx` do. Keep provider setup thin to simplify testing.
- **Feature-first directories**: Create `features/<domain>/{api,components,hooks}` and `lib` folders immediately—even if they start empty—to enforce modular boundaries that scale like Cal.com’s `packages/*` and `apps/web/modules`.
- **Design system staging**: Seed a `components/ui` directory that re-exports your generated Shadcn primitives, matching how `finance-dashboard` centralizes shared widgets. This keeps future component extensions consistent and tree-shakeable.

## Phase 2 – Authentication & Tenant Boundaries

- **Middleware guardrails**: Use Clerk or NextAuth with edge middleware to block unauthenticated requests (`finance-dashboard/middleware.ts`). Expand the route matcher early to accommodate future tenant-only sections.
- **Tenant context**: Store tenant metadata (organization/team ID, roles) in the session. Expose a server helper (e.g., `getTenantContext()`) so every API handler starts with uniform access control instead of repeating inline `getAuth` checks.
- **Client segregation**: Wrap tenant-aware components in client boundaries only when interactivity is required, keeping server components default for data-heavy dashboards.

## Phase 3 – Data Layer & Validation

- **Schema design**: Choose Drizzle or Prisma; enforce tenant scoping through composite keys or explicit `tenantId` columns on every table (Cal.com’s Prisma schema is the reference). Ensure each table declares primary keys and foreign key constraints the way `finance-dashboard`’s Drizzle models do.
- **Generated validators**: Mirror the `createInsertSchema` pattern so form schemas derive from database models. Extend with `zod` refinements per feature to prevent drift between client-side and server-side validation.
- **Repository utilities**: Centralize DB access (e.g., `db/transactions.repository.ts`) and wrap tenant filters there. Cache repetitive queries with helpers akin to Cal.com’s service layer to keep API handlers lean.

## Phase 4 – Tenant-Aware API Surface

- **Edge-friendly routers**: Compose Hono or tRPC routers under `/api` similar to `app/api/[[...route]]/route.ts` but inject the tenant context helper before executing feature logic.
- **Consistent cache strategy**: Adopt TanStack Query patterns with deterministic keys (`["summary", tenantId, filters]`) and eagerly invalidate related datasets, following the example set in `finance-dashboard`’s transaction hooks.
- **Bulk operations & imports**: Provide scalable endpoints (bulk create/delete, CSV import) using validated payloads and transaction-aware repositories to match real-world tenant needs.

## Phase 5 – Domain Feature Modules

- **Reference implementation**: Ship at least one full slice (e.g., Accounts + Transactions) that demonstrates component composition, optimistic UI, and tenant-scoped filtering. `finance-dashboard/features/transactions` is a solid baseline.
- **UI system**: Lean on Tailwind + Shadcn primitives to assemble higher-order components; document override patterns so future features extend the design system instead of re-styling from scratch, similar to Cal.com’s `packages/ui`.
- **Client state hooks**: Keep UI state in compact Zustand stores or React context, isolating each feature’s modal/drawer logic (`use-new-account` pattern) to avoid global state sprawl.

## Phase 6 – Quality Gates & Testing

- **Unit & integration tests**: Set up Vitest with a shared `setupVitest.ts` (as Cal.com does) for DB and auth mocks. Cover repositories, tenant guards, and utility functions.
- **E2E coverage**: Add Playwright smoke flows that authenticate, switch tenants, and exercise critical dashboards. Reuse Cal.com’s environment-aware config (multiple projects, long timeouts locally) to keep CI reliable.
- **Static analysis**: Integrate type-check scripts and optional bundle analysis into CI to watch for regressions in tenant-isolated bundles.

## Phase 7 – Observability, Ops & DX

- **Metrics & logging**: Expose `reportWebVitals` hooks and structured logging with tenant identifiers. Adopt Cal.com’s telemetry layering to redact sensitive fields before shipping logs.
- **Seed & migration flows**: Provide `db:generate`, `db:migrate`, and `db:seed` scripts (borrowing from the finance projects) plus tenant-specific seed helpers for demo environments.
- **Deployment profiles**: Document dev/staging/prod stacks (Vercel + Neon, or self-hosted). Include platform-specific notes (multi-region edge vs serverful) so teams can scale confidently.
- **Operational playbooks**: Capture SSO onboarding, tenant provisioning, and data export flows in markdown—Cal.com’s extensive docs show how docs become part of the product.

## Phase 8 – Hardening & Extensions

- **Feature flags**: Introduce flagging to roll out tenant features safely—consider a lightweight config package similar to Cal.com’s edge-config usage.
- **Billing & quotas**: Plan for seat-based billing, rate limiting, and usage metering; multi-tenant dashboards often evolve into SaaS with monetization layers.
- **Marketplace hooks**: If integrations are in scope, mirror Cal.com’s `packages/app-store` architecture to keep third-party apps sandboxed from core code.

## Implementation Checklist

1. Bootstrap repo tooling (Phase 0) and enforce CI gates before shipping features.
2. Scaffold App Router structure with providers and placeholder feature folders.
3. Implement auth + tenant context helpers, then layer them into a sample API route.
4. Define database schema with tenant constraints; generate zod validators.
5. Build one end-to-end feature slice (UI + API + data layer) as a reference.
6. Add Vitest and Playwright suites; wire them into CI.
7. Document deployment, env requirements, and operational processes.
8. Iterate on advanced capabilities (flags, billing, integrations) as product scope grows.

By following these phases, you combine the modular clarity of `finance-dashboard`, the cautionary lessons from `finance-platform`, and the enterprise-grade rigor of Cal.com into a reusable tenant-aware Next.js template that scales from MVP to production.
