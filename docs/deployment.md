# Deployment & Operations

This starter now runs entirely in the browser. Deploy it anywhere that can host a Next.js static/edge app—no database, server runtime, or background workers required.

## Observability

- Logging is a thin wrapper around `console` (`src/lib/logging.ts`). Prefixes help you filter logs in the browser console or Vercel logs.
- `emitMetric` (`src/lib/metrics.ts`) is a convenience helper that currently funnels metrics into `logger.debug`. Swap it for your analytics provider when you add backends later.
- Extend the Playwright checks in `docs/testing.md` to hit your deployed environment once it’s live.

## Deployment notes

1. Build the app: `npm run build --workspace web`.
2. Start locally with `npm run start --workspace web` or deploy via Vercel/Netlify using their Next.js adapters. No environment variables are required, but you can set `NEXT_PUBLIC_FEATURE_*` flags if you want to toggle sections.
3. If you run Playwright smoke tests (`npm run test:e2e --workspace web`), point `E2E_BASE_URL` to your deployed preview before promoting to production.

When you introduce APIs or databases, revisit this doc and layer in the additional infrastructure steps (migrations, secrets, etc.).
