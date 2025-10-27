# API layer overview

Phase 4 introduces a typed edge API using Hono:

- `src/app/api/[[...route]]/route.ts` registers nested routers and exposes the app on the edge runtime. Add new feature routers beside `tenants` and mount them here.
- `src/lib/api/router.ts` and `src/lib/api/middleware.ts` provide helpers to construct routers and inject the current tenant context. Routes call `c.get("tenantContext")` to access user/tenant metadata.
- `src/app/api/tenants/index.ts` is the reference implementation. It requires tenant context via middleware, fetches from the Drizzle repositories, and responds with JSON payloads.
- `src/lib/hono/client.ts` exports a typed client using `hc<AppRouter>`. Client hooks call this to avoid stringly typed fetches.
- `src/features/tenants/api/use-list-tenants.ts` shows how to wrap API calls with TanStack Query, reusing the `"tenants"` cache key for invalidations.

## Cache strategy

- Use descriptive query keys: `useListTenants` uses `["tenants"]`. Include tenant or filter identifiers when data varies.
- On mutating operations, invalidate affected keys. For example, after creating a tenant call `queryClient.invalidateQueries({ queryKey: ["tenants"] })`.
- Edge handlers remain stateless and rely on the tenant cookie for context, meaning caches should be per-tenant on the client side.

## Adding a new endpoint

1. Create a router under `src/app/api/<feature>`. Use `withTenantContext` to guarantee auth.
2. Export service functions from your feature module to keep business logic out of route handlers.
3. Add corresponding client utilities in `src/features/<feature>/api` (React Query, mutation hooks, etc.).
4. Update UI components to consume these hooks, keeping data fetching and UI concerns separate.

By structuring the API this way, server logic stays DRY, multi-tenant checks are centralized, and client hooks inherit strong typing from the Hono router.
