# Feature modules

Each domain feature owns its data helpers, UI components, and integration tests.

```
features/
  accounts/
    api/        # Data access: repositories and service helpers
    components/ # Feature-scoped UI composed from shared primitives
    hooks/      # React Query wrappers or view-model hooks
```

## Working convention

- Service logic lives in `api/<feature>-service.ts` and reuses repositories that currently read from `src/mocks/sample-data.ts`.
- Client hooks call those services via React Query and surface loading/error state to components.
- UI components combine shared primitives (e.g., `FilterToolbar`, Shadcn tables) with feature-specific behaviour. Keep them small and composable so other screens can reuse them.

Use `useTenantSession()` within these modules to guarantee per-tenant isolation.
