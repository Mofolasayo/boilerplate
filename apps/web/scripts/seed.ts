import "dotenv/config";

import { eq } from "drizzle-orm";

import { accounts, tenantMembers, tenants } from "@/db/schema";
import { db } from "@/db/client";
import { DEFAULT_TENANT_SESSION } from "@/lib/auth/constants";
import { logger } from "@/lib/logging";
import { emitMetric } from "@/lib/metrics";

const SEED_TENANT_ID = "tenant_seed";

async function seed() {
  logger.info("🚜 Seeding database with demo tenant data");

  await db.delete(tenantMembers).where(eq(tenantMembers.tenantId, SEED_TENANT_ID));
  await db.delete(accounts).where(eq(accounts.tenantId, SEED_TENANT_ID));
  await db.delete(tenants).where(eq(tenants.id, SEED_TENANT_ID));

  const [tenant] = await db
    .insert(tenants)
    .values({
      id: SEED_TENANT_ID,
      name: "Seed Tenant",
      slug: "seed-tenant",
      status: "active",
      plan: "growth",
    })
    .returning();

  await db.insert(tenantMembers).values({
    tenantId: tenant.id,
    userId: DEFAULT_TENANT_SESSION.userId,
    email: DEFAULT_TENANT_SESSION.email,
    role: "owner",
  });

  const createdAccounts = await db
    .insert(accounts)
    .values([
      { tenantId: tenant.id, name: "Operating account", currency: "USD" },
      { tenantId: tenant.id, name: "Savings account", currency: "USD" },
    ])
    .returning();

  logger.info({ tenant, createdAccounts }, "✅ Seed complete");
  emitMetric({ name: "seed.accounts", value: createdAccounts.length, tags: { tenant: tenant.id } });
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    logger.error(error, "Seed failed");
    process.exit(1);
  });
