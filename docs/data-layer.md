# Data layer scaffold

The frontend build ships with an in-browser data layer so the UI can run without any backend services. Instead of Drizzle ORM or Neon, feature repositories work against deterministic mock datasets.

## Key pieces

- `apps/web/src/types/` — shared TypeScript models for tenants, members, subscriptions, and accounts.
- `apps/web/src/mocks/sample-data.ts` — seed data used by the repositories. Feel free to extend this file with additional fixtures while prototyping.
- `apps/web/src/features/<feature>/api/*-repository.ts` — repository helpers that filter the mock data per user/tenant.
- `apps/web/src/features/<feature>/api/*-service.ts` — zod-validated service functions that orchestrate repository calls.

## Replacing mocks with a real backend

1. Swap the repository implementations for calls to your API, database client, or data fetching library.
2. Keep the service functions and hooks the same so UI components remain unchanged.
3. Once live data is available, delete `sample-data.ts` and any mock-specific code.

Because everything runs client-side, you can iterate on UI/UX quickly and later layer in persistence when you're ready.
