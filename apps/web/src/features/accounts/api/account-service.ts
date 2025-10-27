import { getAccountsForUserTenant } from "@/features/accounts/api/account-repository";

export const listAccountsForTenant = async ({
  tenantId,
  userId,
}: {
  tenantId: string;
  userId: string;
}) => getAccountsForUserTenant(tenantId, userId);
