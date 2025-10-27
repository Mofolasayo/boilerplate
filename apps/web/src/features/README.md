# Feature modules

Each domain feature owns its API hooks, UI components, and integration tests.

```
features/
  accounts/
    api/        # Data access: server actions, API clients, query hooks
    components/ # Feature-scoped UI composed from shared primitives
    hooks/      # Local state machines or view-model hooks
```

## Working convention

- Server logic lives in `api/<feature>-service.ts` and reuses repositories. Routes under `app/api` should import these services rather than hitting the database directly.
- Client hooks call the typed Hono client (`@/lib/hono/client`) and surface TanStack Query state to components.
- UI components combine shared primitives (e.g., `FilterToolbar`, Shadcn tables) with feature-specific behaviour. Keep them small and composable so other screens can reuse them.

Use tenant context helpers (`getTenantContext`, `useTenantSession`) within these modules to guarantee per-tenant isolation.
