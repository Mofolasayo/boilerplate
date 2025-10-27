import { createRouter } from "@/lib/api/router";
import { withTenantContext } from "@/lib/api/middleware";
import { listAccountsForTenant } from "@/features/accounts/api/account-service";
import { logger } from "@/lib/logging";

const router = createRouter().get(
  "/",
  withTenantContext(async (c) => {
    const session = c.get("tenantContext");
    const accounts = await listAccountsForTenant({
      tenantId: session.tenantId,
      userId: session.userId,
    });
    logger.debug({ tenantId: session.tenantId, accountCount: accounts.length }, "accounts fetched");
    return c.json({ data: accounts });
  }),
);

export default router;
