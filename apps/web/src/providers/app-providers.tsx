"use client";

import React from "react";
import type { PropsWithChildren } from "react";

import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { TenantSessionProvider } from "@/providers/tenant-session-provider";
import type { TenantSession } from "@/lib/auth/types";

type AppProvidersProps = PropsWithChildren<{
  initialTenantSession?: TenantSession;
}>;

export const AppProviders = ({ children, initialTenantSession }: AppProvidersProps) => (
  <ThemeProvider>
    <QueryProvider>
      <TenantSessionProvider initialSession={initialTenantSession}>
        {children}
      </TenantSessionProvider>
    </QueryProvider>
  </ThemeProvider>
);
