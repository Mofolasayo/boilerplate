import { hc } from "hono/client";

import type { AppRouter } from "@/app/api/[[...route]]/route";

const client = hc<AppRouter>("/");

export const api = client.api;
