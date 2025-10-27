"use client";

import React, { createContext, useContext, type ReactNode } from "react";

import type { TenantContext } from "@/lib/auth/types";

const TenantSessionContext = createContext<TenantContext | null>(null);

export const TenantSessionProvider = ({
  value,
  children,
}: {
  value: TenantContext;
  children: ReactNode;
}) => {
  return <TenantSessionContext.Provider value={value}>{children}</TenantSessionContext.Provider>;
};

export const useTenantSession = () => {
  const context = useContext(TenantSessionContext);
  if (!context) {
    throw new Error("useTenantSession must be used within a TenantSessionProvider");
  }

  return context;
};
