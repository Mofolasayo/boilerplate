import { createRouter } from "@/lib/api/router";
import { withTenantContext } from "@/lib/api/middleware";
import { listTenantsForUser } from "@/features/tenants/api/tenant-service";

const router = createRouter().get(
  "/",
  withTenantContext(async (c) => {
    const session = c.get("tenantContext");
    const tenants = await listTenantsForUser(session.userId);
    return c.json({ data: tenants });
  }),
);

export default router;
