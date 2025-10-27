# Deployment & Operations

## Observability

- Logging uses Pino (`src/lib/logging.ts`). Set `LOG_LEVEL` to control verbosity (`debug`, `info`, etc.). In development, logs are pretty-printed.
- Custom metrics can be emitted via `emitMetric` (`src/lib/metrics.ts`); currently these print as structured logs, making it easy to pipe into a real metrics collector.
- Extend `docs/testing.md` flows to include smoke checks post-deployment.

## Database seeding

Use the bundled seed script to provision a demo tenant, owner, and accounts:

```bash
npm run db:seed --workspace web
```

The script reads `DATABASE_URL` and logs progress. Adjust the payload in `scripts/seed.ts` as your schema expands.

## Deployment notes

1. Ensure `DATABASE_URL`, `LOG_LEVEL`, and auth provider keys are set in your hosting environment (Vercel, Render, etc.).
2. Run `npm run db:migrate --workspace web` during deployment to apply migrations.
3. Start the app with `npm run start --workspace web` (after `npm run build`).
4. If using Playwright smoke tests (`npm run test:e2e`), point `E2E_BASE_URL` to your deployed preview before promoting to production.

Pin these steps into your CI/CD pipeline so migrations, seeding, and smoke tests run automatically.
