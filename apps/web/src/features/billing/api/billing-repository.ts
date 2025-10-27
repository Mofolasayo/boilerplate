import { eq } from "drizzle-orm";

import { db } from "@/db/client";
import { tenantSubscriptions } from "@/db/schema";

export const getSubscriptionForTenant = async (tenantId: string) => {
  const [subscription] = await db
    .select()
    .from(tenantSubscriptions)
    .where(eq(tenantSubscriptions.tenantId, tenantId))
    .limit(1);

  return subscription ?? null;
};
