export type TenantRole = "owner" | "admin" | "analyst" | "viewer";

export type TenantSession = {
  userId: string;
  email: string;
  tenantId: string;
  tenantName: string;
  roles: TenantRole[];
};

export type TenantContext = TenantSession & {
  /**
   * Identifies whether the session originates from the default mock payload.
   * Useful for gating features that should only run when a real identity is present.
   */
  isMock: boolean;
};
