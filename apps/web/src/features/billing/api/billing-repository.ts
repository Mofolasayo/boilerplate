import { TENANT_SUBSCRIPTIONS } from "@/mocks/sample-data";

export const getSubscriptionForTenant = async (tenantId: string) => {
  const subscription = TENANT_SUBSCRIPTIONS.find((item) => item.tenantId === tenantId);
  return subscription ?? null;
};
