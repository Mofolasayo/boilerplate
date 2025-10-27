import { z } from "zod";

import { insertTenantSchema, insertTenantMemberSchema } from "@/db/schema";
import { getTenantForUser, getTenantsForUser } from "@/features/tenants/api/tenant-repository";

export const createTenantInputSchema = insertTenantSchema
  .pick({
    name: true,
    slug: true,
  })
  .extend({
    userId: z.string().min(1, "userId is required"),
    email: z.string().email().optional(),
  });

export const createTenantMemberInputSchema = insertTenantMemberSchema
  .pick({
    tenantId: true,
    email: true,
    role: true,
  })
  .extend({
    userId: z.string().min(1, "userId is required"),
  });

export const listTenantsForUser = async (userId: string) => getTenantsForUser(userId);

export const getTenantProfile = async ({
  tenantId,
  userId,
}: {
  tenantId: string;
  userId: string;
}) => getTenantForUser(tenantId, userId);
