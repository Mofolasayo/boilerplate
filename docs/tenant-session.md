# Tenant session flow

Phase 2 introduces a lightweight cookie-based session to keep the template runnable without a real identity provider. Key files:

- `apps/web/middleware.ts`: Protects `/dashboard` routes. In development it seeds the mock session automatically; in other environments it redirects to `/sign-in`.
- `apps/web/src/lib/auth/constants.ts`: Defines the cookie name, default session payload, and cookie options.
- `apps/web/src/lib/auth/session.ts`: Server utilities for reading/writing the session cookie and exposing a typed tenant context.
- `apps/web/src/lib/auth/actions.ts`: Server actions used by the demo sign-in form and sign-out button. Replace these with real auth flows when integrating your provider.
- `apps/web/src/providers/tenant-session-provider.tsx`: Client-side React context so feature modules can call `useTenantSession()`.

## Replacing the mock auth

1. Swap the `/sign-in` form for your provider (Clerk, Auth.js, etc.).
2. Update the middleware to verify authentic tokens instead of relying on the mock cookie. The rest of the code keeps working as long as you set the `tenant_session` cookie (or adjust the constant).
3. Populate `TenantSession` with real values (user id, tenant id, roles) and invalidate queries on sign-out if needed.
4. Expand the `TenantContext` to include permissions, feature flags, or subscription tiers as your product requires.

Keeping the session helpers isolated means the rest of the app—including feature modules—only depends on `useTenantSession()` / `getTenantContext()`, making it easy to evolve your auth strategy without touching UI layers.
