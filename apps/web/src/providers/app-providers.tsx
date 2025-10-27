"use client";

import React from "react";
import type { PropsWithChildren } from "react";

import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { TenantSessionProvider } from "@/providers/tenant-session-provider";
import type { TenantContext } from "@/lib/auth/types";

type AppProvidersProps = PropsWithChildren<{
  tenantSession: TenantContext;
}>;

export const AppProviders = ({ tenantSession, children }: AppProvidersProps) => (
  <ThemeProvider>
    <QueryProvider>
      <TenantSessionProvider value={tenantSession}>{children}</TenantSessionProvider>
    </QueryProvider>
  </ThemeProvider>
);
