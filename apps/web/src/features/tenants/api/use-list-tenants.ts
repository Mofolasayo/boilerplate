"use client";

import { useQuery } from "@tanstack/react-query";

import { listTenantsForUser } from "@/features/tenants/api/tenant-service";
import { useTenantSession } from "@/providers/tenant-session-provider";

export const useListTenants = () => {
  const session = useTenantSession();

  return useQuery({
    queryKey: ["tenants", session.userId],
    queryFn: async () => listTenantsForUser(session.userId),
  });
};
