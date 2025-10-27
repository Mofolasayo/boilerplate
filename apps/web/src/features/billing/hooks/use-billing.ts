"use client";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/hono/client";

export const useBilling = () => {
  return useQuery({
    queryKey: ["billing", "subscription"],
    queryFn: async () => {
      const response = await api.billing.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch billing info");
      }

      const { data } = (await response.json()) as {
        data: { plan: string; status: string; renewAt?: string | null } | null;
      };
      return data;
    },
  });
};
