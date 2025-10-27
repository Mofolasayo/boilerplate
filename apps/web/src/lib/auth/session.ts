import { cookies } from "next/headers";

import { COOKIE_DEFAULTS, DEFAULT_TENANT_SESSION, SESSION_COOKIE_NAME } from "@/lib/auth/constants";
import type { TenantContext, TenantSession } from "@/lib/auth/types";

const parseSession = (raw: string): TenantSession | null => {
  try {
    const parsed = JSON.parse(raw) as Partial<TenantSession>;
    if (!parsed || typeof parsed !== "object") return null;

    if (!parsed.userId || !parsed.tenantId || !parsed.tenantName) return null;

    return {
      ...DEFAULT_TENANT_SESSION,
      ...parsed,
      roles:
        Array.isArray(parsed.roles) && parsed.roles.length > 0
          ? parsed.roles
          : DEFAULT_TENANT_SESSION.roles,
      email: parsed.email ?? DEFAULT_TENANT_SESSION.email,
    };
  } catch {
    return null;
  }
};

export const serializeTenantSession = (session: TenantSession) => JSON.stringify(session);

export const getTenantSession = (): TenantSession => {
  const cookie = cookies().get(SESSION_COOKIE_NAME);
  if (!cookie?.value) return DEFAULT_TENANT_SESSION;

  const session = parseSession(cookie.value);
  return session ?? DEFAULT_TENANT_SESSION;
};

export const getTenantContext = (): TenantContext => {
  const cookie = cookies().get(SESSION_COOKIE_NAME);
  const session = cookie?.value ? parseSession(cookie.value) : null;

  return {
    ...(session ?? DEFAULT_TENANT_SESSION),
    isMock: !session,
  };
};

export const setTenantSession = (session: TenantSession) => {
  cookies().set(SESSION_COOKIE_NAME, serializeTenantSession(session), COOKIE_DEFAULTS);
};

export const clearTenantSession = () => {
  cookies().delete(SESSION_COOKIE_NAME);
};
