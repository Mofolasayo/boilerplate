import type { Context } from "hono";
import type { Env } from "hono/types";

import { getTenantContext } from "@/lib/auth/session";
import type { TenantContext } from "@/lib/auth/types";

export type TenantContextEnv = Env & {
  Variables: {
    tenantContext: TenantContext;
  };
};

export const withTenantContext = <C extends Context<TenantContextEnv>>(
  handler: (c: C) => Promise<Response> | Response,
) => {
  return async (c: C) => {
    const tenantContext = getTenantContext();

    if (!tenantContext || tenantContext.isMock) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    c.set("tenantContext", tenantContext);
    return handler(c);
  };
};
