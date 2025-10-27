import { vi, describe, it, expect, beforeEach } from "vitest";

import type { TenantWithSubscription } from "@/types/tenants";
import * as repository from "@/features/tenants/api/tenant-repository";
import { getTenantProfile, listTenantsForUser } from "@/features/tenants/api/tenant-service";

describe("tenant service", () => {
  const mockTenant: TenantWithSubscription = {
    id: "tenant",
    name: "Tenant",
    slug: "tenant",
    status: "active",
    plan: "free",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subscription: null,
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns tenants for user", async () => {
    vi.spyOn(repository, "getTenantsForUser").mockResolvedValue([mockTenant]);

    const tenants = await listTenantsForUser("user_id");

    expect(tenants).toHaveLength(1);
    expect(tenants[0].id).toBe("tenant");
    expect(repository.getTenantsForUser).toHaveBeenCalledWith("user_id");
  });

  it("returns tenant profile for user", async () => {
    vi.spyOn(repository, "getTenantForUser").mockResolvedValue(mockTenant);

    const tenant = await getTenantProfile({ tenantId: "tenant", userId: "user" });

    expect(tenant).toMatchObject({ id: "tenant" });
    expect(repository.getTenantForUser).toHaveBeenCalledWith("tenant", "user");
  });
});
