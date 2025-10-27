"use client";

import { useQuery } from "@tanstack/react-query";

import { listAccountsForTenant } from "@/features/accounts/api/account-service";
import { useTenantSession } from "@/providers/tenant-session-provider";

export const useAccounts = () => {
  const session = useTenantSession();

  return useQuery({
    queryKey: ["accounts", session.tenantId, session.userId],
    queryFn: async () =>
      listAccountsForTenant({
        tenantId: session.tenantId,
        userId: session.userId,
      }),
  });
};
