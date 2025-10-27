import { getSubscriptionForTenant } from "@/features/billing/api/billing-repository";

export const getTenantSubscription = async ({ tenantId }: { tenantId: string }) =>
  getSubscriptionForTenant(tenantId);
