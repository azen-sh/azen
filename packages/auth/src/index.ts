import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { apiKey } from "better-auth/plugins";
import { db, schema } from "db";
import type { CookieOptions } from "better-auth";

export const authConfig = {
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
          ...schema,
        },
      }),
      secret: process.env.BETTER_AUTH_SECRET!,
      advanced: {
        cookies: {
            session_token: {
                name: "better-auth.session_token",
                attributes: {
                    path: "/",
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
                    maxAge: 60 * 60 * 24 * 7,
                    domain: process.env.NODE_ENV === "production" 
                    ? ".azen.sh" 
                    : undefined
                } as CookieOptions,
            }
        }
    },
      plugins: [
        apiKey({
          apiKeyHeaders: ["azen-api-key"],
          enableMetadata: true,
          rateLimit: {
            enabled: true,
            timeWindow: 60 * 1000, 
            maxRequests: 60,     
          },
          permissions: {
            defaultPermissions: {
              file: ["read"],
              projects: ["read"],
            },
          },
        }),
    ],
} 