# Testing strategy

Phase 6 introduces automated testing layers:

- **Unit tests (Vitest)** – configuration in `vitest.config.ts`. Run with `npm run test:unit`. Tests live alongside code (e.g., `tenant-service.test.ts`) and target the mock repositories so business logic stays isolated.
- **Playwright e2e** – minimal smoke test in `tests/e2e/accounts.spec.ts` ensures the dashboard route renders core UI. Configure the base URL via `E2E_BASE_URL` or default to http://localhost:3000.

## Commands

```bash
npm run test:unit     # vitest run
npm run test:unit:watch
npm run test:e2e      # playwright test
npm run test:coverage # vitest run --coverage
```

Before running Playwright tests locally, start `next dev` in another terminal so the suite has a target application.

Use `npm run test:coverage` to generate coverage reports (v8 provider, HTML output in `coverage/`). Update and extend these suites as new features land.
