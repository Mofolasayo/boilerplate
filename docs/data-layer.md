# Data layer scaffold

Phase 3 adds a tenant-scoped database design using Drizzle ORM. Key elements:

- `src/db/schema.ts` — defines enums and tables for tenants, members, accounts, and subscriptions. All tables include a `tenantId` foreign key so queries always filter by tenant.
- `src/db/client.ts` — creates a Neon HTTP client and exports a Drizzle instance. Replace Neon with your preferred Postgres driver if needed.
- `src/lib/db/index.ts` — convenience re-export so features can `import { db, tenants } from "@/lib/db"`.
- `src/features/tenants/api/tenant-repository.ts` — example repository functions showing how to compose joins that respect both `tenantId` and `userId`.
- `src/features/tenants/api/tenant-service.ts` — zod-driven request payload schemas that reuse the Drizzle table definitions.

## Running migrations

Drizzle commands are available inside `apps/web`:

```bash
npm run db:generate   # emit SQL into apps/web/drizzle
npm run db:migrate    # apply migrations (requires DATABASE_URL)
npm run db:studio     # explore schema via Drizzle Studio
```

Set `DATABASE_URL` in `.env.local` before running migrations. The template uses Neon, but any Postgres-compatible connection string works.

## Using the tenant context

When fetching data, combine the `getTenantContext()` helper with repository functions:

```ts
import { getTenantContext } from "@/lib/auth/session";
import { listTenantsForUser } from "@/features/tenants/api/tenant-service";

export async function loadTenants() {
  const session = getTenantContext();
  return listTenantsForUser(session.userId);
}
```

This keeps multi-tenant scoping centralized and avoids leaking tenant-specific logic into UI components.
