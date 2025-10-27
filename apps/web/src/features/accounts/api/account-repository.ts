import { and, eq } from "drizzle-orm";

import { db } from "@/db/client";
import { accounts, tenantMembers } from "@/db/schema";

export const getAccountsForUserTenant = async (tenantId: string, userId: string) => {
  const rows = await db
    .select({ account: accounts })
    .from(accounts)
    .innerJoin(
      tenantMembers,
      and(eq(tenantMembers.tenantId, accounts.tenantId), eq(tenantMembers.userId, userId)),
    )
    .where(eq(accounts.tenantId, tenantId))
    .orderBy(accounts.createdAt);

  return rows.map((row) => row.account);
};
