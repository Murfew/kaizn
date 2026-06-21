import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { env } from "@/env";
import prisma from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: {
    allowedHosts: [
      env.BETTER_AUTH_URL,
      env.VERCEL_URL,
      env.VERCEL_BRANCH_URL,
      env.VERCEL_PROJECT_PRODUCTION_URL,
    ].filter((url): url is string => Boolean(url)),
    protocol: env.NODE_ENV === "development" ? "http" : "https",
  },
  plugins: [nextCookies()],
});
