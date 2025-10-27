import { createRouter } from "@/lib/api/router";
import { withTenantContext } from "@/lib/api/middleware";
import { getTenantSubscription } from "@/features/billing/api/billing-service";
import { logger } from "@/lib/logging";

const router = createRouter().get(
  "/",
  withTenantContext(async (c) => {
    const session = c.get("tenantContext");

    const subscription = await getTenantSubscription({ tenantId: session.tenantId });
    logger.debug({ tenantId: session.tenantId, subscription }, "billing fetched");

    return c.json({ data: subscription });
  }),
);

export default router;
