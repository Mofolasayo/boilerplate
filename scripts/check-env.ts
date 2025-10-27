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

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).optional().default("development"),
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url("NEXT_PUBLIC_APP_URL should be an absolute URL like http://localhost:3000")
    .optional(),
  NEXT_PUBLIC_APP_NAME: z.string().min(1, "NEXT_PUBLIC_APP_NAME cannot be empty").optional(),
  NEXT_PUBLIC_FEATURE_BILLING: z.enum(["true", "false"]).optional(),
  NEXT_PUBLIC_FEATURE_MARKETPLACE: z.enum(["true", "false"]).optional(),
});

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
