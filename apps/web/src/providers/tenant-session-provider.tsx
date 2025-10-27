"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { DEFAULT_TENANT_SESSION, SESSION_STORAGE_KEY } from "@/lib/auth/constants";
import type { TenantContext, TenantSession, TenantRole } from "@/lib/auth/types";

const STORAGE_KEY = SESSION_STORAGE_KEY;

const mockContext: TenantContext = {
  ...DEFAULT_TENANT_SESSION,
  isMock: true,
};

const TENANT_ROLES: TenantRole[] = ["owner", "admin", "analyst", "viewer"];

type TenantSessionContextValue = TenantContext & {
  setSession: (session: TenantSession) => void;
  clearSession: () => void;
};

const TenantSessionContext = createContext<TenantSessionContextValue | null>(null);

const parseRoles = (value: unknown): TenantRole[] => {
  if (!Array.isArray(value)) return DEFAULT_TENANT_SESSION.roles;
  const roles = value.filter(
    (role): role is TenantRole =>
      typeof role === "string" && TENANT_ROLES.includes(role as TenantRole),
  );
  return roles.length > 0 ? roles : DEFAULT_TENANT_SESSION.roles;
};

const parseStoredSession = (raw: string | null): TenantSession | null => {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<TenantSession> | null;
    if (!parsed || typeof parsed !== "object") return null;

    const { userId, tenantId, tenantName, email, roles } = parsed;
    if (!userId || !tenantId || !tenantName || !email) return null;

    return {
      ...DEFAULT_TENANT_SESSION,
      ...parsed,
      userId,
      tenantId,
      tenantName,
      email,
      roles: parseRoles(roles),
    } satisfies TenantSession;
  } catch {
    return null;
  }
};

export const TenantSessionProvider = ({
  children,
  initialSession,
}: {
  children: ReactNode;
  initialSession?: TenantSession;
}) => {
  const [session, setSession] = useState<TenantContext>(() =>
    initialSession ? { ...initialSession, isMock: false } : mockContext,
  );

  useEffect(() => {
    if (initialSession || typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const restored = parseStoredSession(stored);

    if (restored) {
      setSession({ ...restored, isMock: false });
    }
  }, [initialSession]);

  const persistSession = (next: TenantSession) => {
    setSession({ ...next, isMock: false });
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...next,
          roles: next.roles.length ? next.roles : DEFAULT_TENANT_SESSION.roles,
        }),
      );
    }
  };

  const clearSession = () => {
    setSession(mockContext);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const value = useMemo(
    () => ({
      ...session,
      setSession: persistSession,
      clearSession,
    }),
    [session],
  );

  return <TenantSessionContext.Provider value={value}>{children}</TenantSessionContext.Provider>;
};

export const useTenantSession = () => {
  const context = useContext(TenantSessionContext);
  if (!context) {
    throw new Error("useTenantSession must be used within a TenantSessionProvider");
  }

  return context;
};
