import type { TenantRole } from "@/lib/auth/types";

export type PlanTier = "free" | "growth" | "scale";

export type TenantStatus = "active" | "trial" | "suspended";

export type Tenant = {
  id: string;
  name: string;
  slug: string;
  status: TenantStatus;
  plan: PlanTier;
  createdAt: string;
  updatedAt: string;
};

export type TenantMember = {
  id: string;
  tenantId: string;
  userId: string;
  email: string;
  role: TenantRole;
  createdAt: string;
};

export type TenantSubscriptionStatus = "trial" | "active" | "suspended";

export type TenantSubscription = {
  id: string;
  tenantId: string;
  plan: PlanTier;
  status: TenantSubscriptionStatus;
  renewAt?: string | null;
  createdAt: string;
};

export type TenantWithSubscription = Tenant & {
  subscription: TenantSubscription | null;
};
