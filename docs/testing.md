# Testing strategy

Phase 6 introduces automated testing layers:

- **Unit tests (Vitest)** – configuration in `vitest.config.ts`. Run with `npm run test:unit`. Tests live alongside code (e.g., `tenant-service.test.ts`) and mock repositories so business logic stays isolated.
- **API integration tests** – also in Vitest (`src/app/api/accounts/index.test.ts`). These spin up a Hono app, set the tenant cookie, and assert responses without hitting the database.
- **Playwright e2e** – minimal smoke test in `tests/e2e/accounts.spec.ts` ensures the dashboard route renders core UI. Configure base URL via `E2E_BASE_URL` or default to http://localhost:3000.

## Commands

```bash
npm run test:unit     # vitest run
npm run test:unit:watch
npm run test:e2e      # playwright test
```

Before running Playwright tests locally, set up the database or mock API responses as needed. In CI, launch `next dev` against a test database and point `E2E_BASE_URL` to that instance.

Use `npm run test:coverage` to generate coverage reports (v8 provider, HTML output in `coverage/`). Update and extend these suites as new features land.
