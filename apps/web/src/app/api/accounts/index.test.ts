import { describe, expect, it, vi, beforeEach } from "vitest";
import { Hono } from "hono";
import type { StatusCode } from "hono/utils/http-status";

import accountsRoute from "@/app/api/accounts";
import type { Account } from "@/db/schema";
import * as accountService from "@/features/accounts/api/account-service";
import { DEFAULT_TENANT_SESSION } from "@/lib/auth/constants";
import * as authSession from "@/lib/auth/session";

const createRequest = async (url: string, init?: RequestInit) => {
  const app = new Hono();
  const route = app.route("/api/accounts", accountsRoute);

  const request = new Request(url, init);
  request.headers.set(
    "cookie",
    `tenant_session=${encodeURIComponent(JSON.stringify(DEFAULT_TENANT_SESSION))}`,
  );

  return route.request(request);
};

describe("accounts route", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(authSession, "getTenantContext").mockReturnValue({
      ...DEFAULT_TENANT_SESSION,
      isMock: false,
    });
  });

  it("returns account list", async () => {
    const account: Account = {
      id: "account",
      name: "Main",
      tenantId: DEFAULT_TENANT_SESSION.tenantId,
      currency: "USD",
      createdAt: new Date().toISOString(),
    };

    vi.spyOn(accountService, "listAccountsForTenant").mockResolvedValue([account]);

    const response = await createRequest("http://localhost/api/accounts");

    expect(response.status).toBe(200 satisfies StatusCode);
    const body = await response.json();
    expect(body.data).toHaveLength(1);
  });
});
