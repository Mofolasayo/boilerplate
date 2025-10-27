import { Hono } from "hono";
import { handle } from "hono/vercel";

import accountsRoute from "@/app/api/accounts";
import billingRoute from "@/app/api/billing";
import tenantsRoute from "@/app/api/tenants";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const router = app
  .route("/tenants", tenantsRoute)
  .route("/accounts", accountsRoute)
  .route("/billing", billingRoute);

export const GET = handle(router);
export const POST = handle(router);
export const PATCH = handle(router);
export const DELETE = handle(router);

export type AppRouter = typeof router;
