import type { TenantSession } from "@/lib/auth/types";

export const SESSION_COOKIE_NAME = "tenant_session";

export const DEFAULT_TENANT_SESSION: TenantSession = {
  userId: "user_demo",
  email: "demo@tenant.dev",
  tenantId: "tenant_demo",
  tenantName: "Demo Tenant",
  roles: ["owner"],
};

export const COOKIE_DEFAULTS = {
  httpOnly: false,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};
