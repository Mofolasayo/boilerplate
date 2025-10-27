import { vi, describe, it, expect, beforeEach } from "vitest";

import type { Account } from "@/db/schema";
import * as repository from "@/features/accounts/api/account-repository";
import { listAccountsForTenant } from "@/features/accounts/api/account-service";

describe("account service", () => {
  const mockAccount: Account = {
    id: "account",
    name: "Main",
    currency: "USD",
    tenantId: "tenant",
    createdAt: new Date().toISOString(),
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns accounts for tenant", async () => {
    vi.spyOn(repository, "getAccountsForUserTenant").mockResolvedValue([mockAccount]);

    const accounts = await listAccountsForTenant({ tenantId: "tenant", userId: "user" });

    expect(accounts).toHaveLength(1);
    expect(accounts[0].name).toBe("Main");
    expect(repository.getAccountsForUserTenant).toHaveBeenCalledWith("tenant", "user");
  });
});
