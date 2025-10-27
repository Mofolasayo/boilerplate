import { describe, expect, it, vi } from "vitest";
import { Hono } from "hono";
import type { StatusCode } from "hono/utils/http-status";

import accountsRoute from "@/app/api/accounts";
import type { Account } from "@/db/schema";
import * as accountService from "@/features/accounts/api/account-service";
import { DEFAULT_TENANT_SESSION } from "@/lib/auth/constants";
import * as authSession from "@/lib/auth/session";

const createRequest = (pathname: string) => {
  const request = new Request(`http://localhost${pathname}`);
  request.headers.set(
    "cookie",
    `tenant_session=${encodeURIComponent(JSON.stringify(DEFAULT_TENANT_SESSION))}`,
  );
  return request;
};

describe("accounts API flow", () => {
  it("returns accounts for tenant", async () => {
    const account: Account = {
      id: "1",
      name: "Operating",
      currency: "USD",
      tenantId: DEFAULT_TENANT_SESSION.tenantId,
      createdAt: new Date().toISOString(),
    };

    vi.spyOn(accountService, "listAccountsForTenant").mockResolvedValue([account]);
    vi.spyOn(authSession, "getTenantContext").mockReturnValue({
      ...DEFAULT_TENANT_SESSION,
      isMock: false,
    });

    const honoApp = new Hono().route("/api/accounts", accountsRoute);
    const response = await honoApp.request(createRequest("/api/accounts"));

    expect(response.status).toBe(200 satisfies StatusCode);
    const payload = await response.json();
    expect(payload.data).toHaveLength(1);
  });
});
