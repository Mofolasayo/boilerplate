# Client data flow

This boilerplate ships as a frontend-only stack. Rather than calling server-hosted APIs, feature services read from mock datasets under `apps/web/src/mocks` and expose typed helpers to the UI.

## Where to look

- `apps/web/src/features/<feature>/api` — async helpers that return mock data. Swap these out for real fetch calls once you stand up a backend.
- `apps/web/src/features/<feature>/hooks` — React Query wrappers that provide loading/error state to components.
- `apps/web/src/mocks/sample-data.ts` — centralised demo records for tenants, accounts, and subscriptions.

## Adding a backend later

1. Replace the mock repositories with real data sources (REST, GraphQL, tRPC, etc.).
2. Move shared typing into `apps/web/src/types` so both client and server agree on payloads.
3. Update hooks to use `fetch`/`axios` (or your preferred client) and keep cache keys per tenant.
4. Remove the mock dataset once your data layer is wired to live services.

Until then, the frontend runs entirely in the browser with deterministic sample data, making it easy to prototype UI without provisioning infrastructure.
