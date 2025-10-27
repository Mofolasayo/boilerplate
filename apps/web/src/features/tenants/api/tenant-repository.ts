import { and, eq } from "drizzle-orm";

import { db } from "@/db/client";
import {
  tenantMembers,
  tenants,
  tenantSubscriptions,
  type Tenant,
  type TenantSubscription,
} from "@/db/schema";

export type TenantWithSubscription = Tenant & {
  subscription: TenantSubscription | null;
};

export const getTenantForUser = async (tenantId: string, userId: string) => {
  const [record] = await db
    .select({
      tenant: tenants,
      subscription: tenantSubscriptions,
    })
    .from(tenants)
    .leftJoin(tenantSubscriptions, eq(tenantSubscriptions.tenantId, tenants.id))
    .innerJoin(tenantMembers, eq(tenantMembers.tenantId, tenants.id))
    .where(and(eq(tenants.id, tenantId), eq(tenantMembers.userId, userId)));

  if (!record) return null;

  return {
    ...record.tenant,
    subscription: record.subscription,
  } satisfies TenantWithSubscription;
};

export const getTenantsForUser = async (userId: string) => {
  const rows = await db
    .select({
      tenant: tenants,
      subscription: tenantSubscriptions,
    })
    .from(tenants)
    .leftJoin(tenantSubscriptions, eq(tenantSubscriptions.tenantId, tenants.id))
    .innerJoin(tenantMembers, eq(tenantMembers.tenantId, tenants.id))
    .where(eq(tenantMembers.userId, userId));

  return rows.map(
    ({ tenant, subscription }) =>
      ({
        ...tenant,
        subscription,
      }) satisfies TenantWithSubscription,
  );
};
