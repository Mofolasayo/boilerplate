# Feature flags

Phase 8 introduces environment-driven feature flags. Configure them in `.env*` files:

```env
NEXT_PUBLIC_FEATURE_BILLING=true
NEXT_PUBLIC_FEATURE_MARKETPLACE=false
```

Use helpers from `src/lib/flags.ts`:

- `getFeatureFlag(flag)` – synchronous helper for places that run during module evaluation (still works in the browser because flags are env-backed constants).
- `useFeatureFlag(flag)` – client hook used by the header/nav and feature pages.

Examples:

- Billing nav link and API responses only appear when `billing` is enabled.
- Marketplace pages redirect back to `/dashboard` if the flag is disabled.

Extend `rawFlags` in `src/lib/flags.ts` with additional toggles (e.g., CSV import, AI insights) and guard routes, components, or hooks accordingly. Combine with your production flagging provider later; the helper functions give you a single place to swap implementations.
