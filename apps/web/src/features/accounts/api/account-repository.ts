import { ACCOUNTS, TENANT_MEMBERS } from "@/mocks/sample-data";
import type { Account } from "@/types/accounts";

export const getAccountsForUserTenant = async (tenantId: string, userId: string) => {
  const hasMembership = TENANT_MEMBERS.some(
    (member) => member.tenantId === tenantId && member.userId === userId,
  );

  if (!hasMembership) return [] satisfies Account[];

  return ACCOUNTS.filter((account) => account.tenantId === tenantId).sort((a, b) =>
    a.createdAt.localeCompare(b.createdAt),
  );
};
