import type { TenantSession } from "@/lib/auth/types";

export const SESSION_STORAGE_KEY = "tenant_session";

export const DEFAULT_TENANT_SESSION: TenantSession = {
  userId: "user_demo",
  email: "demo@tenant.dev",
  tenantId: "tenant_demo",
  tenantName: "Demo Tenant",
  roles: ["owner"],
};
