"use client";

import { useQuery } from "@tanstack/react-query";

import type { Account } from "@/db/schema";
import { api } from "@/lib/hono/client";

export const useAccounts = () => {
  return useQuery<Account[]>({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await api.accounts.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch accounts");
      }

      const { data } = (await response.json()) as { data: Account[] };
      return data;
    },
  });
};
