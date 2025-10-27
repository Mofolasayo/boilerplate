import { Hono } from "hono";

import type { TenantContextEnv } from "@/lib/api/middleware";

export const createRouter = () => new Hono<TenantContextEnv>();
