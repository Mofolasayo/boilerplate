import { z } from "zod";

import { getTenantForUser, getTenantsForUser } from "@/features/tenants/api/tenant-repository";
import type { TenantRole } from "@/lib/auth/types";

const tenantRoleEnum: TenantRole[] = ["owner", "admin", "analyst", "viewer"];

const tenantBaseSchema = z.object({
  name: z.string().min(2, "name must be at least 2 characters"),
  slug: z.string().min(2, "slug must be at least 2 characters"),
});

export const createTenantInputSchema = tenantBaseSchema.extend({
  userId: z.string().min(1, "userId is required"),
  email: z.string().email().optional(),
});

export const createTenantMemberInputSchema = z.object({
  tenantId: z.string().min(1, "tenantId is required"),
  email: z.string().email(),
  role: z.enum(tenantRoleEnum),
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
