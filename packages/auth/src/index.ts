import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { apiKey, organization } from "better-auth/plugins";
import { asc, db, eq, schema } from "db";
import type { BetterAuthOptions, CookieOptions } from "better-auth";

const { member } = schema;

export const authConfig = {
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
          ...schema,
        },
      }),
      databaseHooks: {
        session: {
          create: {
            before: async (session) => {
              const [membership] = await db
                .select({ organizationId: member.organizationId })
                .from(member)
                .where(eq(member.userId, session.userId))
                .orderBy(asc(member.createdAt))
                .limit(1);

              if (!membership) {
                return { data: session };
              };

              return {
                data: {
                  ...session,
                  activeOrganizationId: membership.organizationId,
                },
              };
            },
          },
        },
      },
      secret: process.env.BETTER_AUTH_SECRET!,
      user: {
        additionalFields: {
          hasCompletedOnboarding: {
            type: "boolean",
            defaultValue: false,
          },
        },
      },
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
        organization({
          schema: {
            organization: {
              additionalFields: {
                description: {
                  type: "string",
                  input: true,
                  required: false,
                },
              },
            },
          },
        }),
    ],
} satisfies BetterAuthOptions;