"use client";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/hono/client";
import type { TenantWithSubscription } from "@/features/tenants/api/tenant-repository";

export const useListTenants = () => {
  return useQuery({
    queryKey: ["tenants"],
    queryFn: async () => {
      const response = await api.tenants.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch tenants");
      }

      const { data } = (await response.json()) as {
        data: TenantWithSubscription[];
      };
      return data;
    },
  });
};
