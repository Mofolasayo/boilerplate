"use client";

import { useQuery } from "@tanstack/react-query";

import { getTenantSubscription } from "@/features/billing/api/billing-service";
import { useTenantSession } from "@/providers/tenant-session-provider";

export const useBilling = () => {
  const session = useTenantSession();

  return useQuery({
    queryKey: ["billing", "subscription", session.tenantId],
    queryFn: async () => getTenantSubscription({ tenantId: session.tenantId }),
  });
};
