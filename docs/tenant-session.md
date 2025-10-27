# Tenant session flow

The demo now keeps session state entirely in the browser so it can run without cookies or server actions.

## Key files

- `apps/web/src/lib/auth/constants.ts` — houses the default `TenantSession` payload and the storage key used for `localStorage`.
- `apps/web/src/providers/tenant-session-provider.tsx` — client React context that loads/saves the session, flags mock sessions, and exposes `setSession` / `clearSession` helpers.
- `apps/web/src/app/(auth)/sign-in/page.tsx` — writes the demo session via `useTenantSession()` and redirects with Next's client router.
- `apps/web/src/components/layout/app-header.tsx` — calls `clearSession()` to sign out and send the user back to `/sign-in`.

## Integrating a real identity provider

1. Replace the sign-in page with your auth provider's UI. When authentication succeeds, call `setSession()` with the tenant/user payload returned by your backend.
2. If you move storage back to secure cookies, update the provider to read from your new source instead of `localStorage`.
3. Expand the `TenantSession` type as needed (permissions, plan info, etc.). Components will automatically receive the new data through the context.

All feature hooks (`useAccounts`, `useBilling`, `useListTenants`) read the session through the provider, so once you swap in real auth data the rest of the UI continues to work unchanged.
