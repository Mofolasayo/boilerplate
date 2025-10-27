import fs from "node:fs";
import path from "node:path";

import { config } from "dotenv";
import { z } from "zod";

const ENV_FILES = [".env", ".env.local", ".env.development", ".env.production"] as const;

ENV_FILES.forEach((file) => {
  const location = path.resolve(process.cwd(), file);
  if (fs.existsSync(location)) {
    config({ path: location, override: true });
  }
});

const baseSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).optional().default("development"),
});

const serverSchema = z.object({
  DATABASE_URL: z
    .string()
    .url("DATABASE_URL must be a valid connection string")
    .describe("Postgres connection string including protocol"),
  CLERK_SECRET_KEY: z
    .string()
    .min(1, "CLERK_SECRET_KEY is required; use sk_test_* during development"),
  FLAGSMITH_SERVER_KEY: z.string().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url("NEXT_PUBLIC_APP_URL should be an absolute URL like http://localhost:3000"),
  NEXT_PUBLIC_APP_NAME: z.string().min(1, "NEXT_PUBLIC_APP_NAME cannot be empty"),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is required; use pk_test_* during development"),
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
  NEXT_PUBLIC_FLAGSMITH_ENVIRONMENT_ID: z.string().optional(),
});

const schema = baseSchema.merge(serverSchema).merge(clientSchema);

const result = schema.safeParse(process.env);

if (!result.success) {
  console.error("❌ Environment validation failed:\n");
  for (const issue of result.error.issues) {
    console.error(` • ${issue.path.join(".") || "root"}: ${issue.message}`);
  }
  console.error("\nCreate a .env.local file based on .env.example and re-run `npm run env:check`.");
  process.exit(1);
}

console.log("✅ Environment variables look good for", result.data.NODE_ENV);
