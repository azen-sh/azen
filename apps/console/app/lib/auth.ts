import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { apiKey } from "better-auth/plugins";
import { db, schema } from "db";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            ...schema,
        },
    }),
    secret: process.env.BETTER_AUTH_SECRET,
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    plugins: [
        nextCookies(),
        apiKey({
            apiKeyHeaders: ['azen-api-key'],
            enableMetadata: true,
            rateLimit: {
                enabled: true,
                timeWindow: 60 * 1000,
                maxRequests: 60,
            },
            permissions: {
                defaultPermissions: {
                    file: ['read'],
                    projects: ['read'],
                },
            },
        }),
    ], 
});