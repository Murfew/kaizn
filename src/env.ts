import { supabaseVercel, vercel } from "@t3-oss/env-core/presets-zod";
import { createEnv } from "@t3-oss/env-nextjs";

import * as z from "zod";

export const env = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.url().optional(),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  },
  client: {},
  experimental__runtimeEnv: {},
  emptyStringAsUndefined: true,
  extends: [supabaseVercel(), vercel()],
});
