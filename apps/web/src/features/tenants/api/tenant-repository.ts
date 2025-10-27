import { TENANT_MEMBERS, TENANTS, TENANT_SUBSCRIPTIONS } from "@/mocks/sample-data";
import type { TenantSubscription, TenantWithSubscription } from "@/types/tenants";

const combineTenant = (tenantId: string): TenantSubscription | null => {
  const subscription = TENANT_SUBSCRIPTIONS.find((item) => item.tenantId === tenantId);
  return subscription ?? null;
};

export const getTenantForUser = async (tenantId: string, userId: string) => {
  const tenant = TENANTS.find((item) => item.id === tenantId);
  if (!tenant) return null;

  const hasMembership = TENANT_MEMBERS.some(
    (member) => member.tenantId === tenantId && member.userId === userId,
  );

  if (!hasMembership) return null;

  return {
    ...tenant,
    subscription: combineTenant(tenantId),
  } satisfies TenantWithSubscription;
};

export const getTenantsForUser = async (userId: string) => {
  const tenantIds = new Set(
    TENANT_MEMBERS.filter((member) => member.userId === userId).map((member) => member.tenantId),
  );

  return TENANTS.filter((tenant) => tenantIds.has(tenant.id)).map(
    (tenant) =>
      ({
        ...tenant,
        subscription: combineTenant(tenant.id),
      }) satisfies TenantWithSubscription,
  );
};
