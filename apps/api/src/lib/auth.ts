import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { apiKey } from "better-auth/plugins";
import { createDb, schema } from "db";

const db = createDb();

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            ...schema,
        },
    }),
    secret: process.env.BETTER_AUTH_SECRET,
    plugins: [
        apiKey({
            apiKeyHeaders: ['azen-api-key'],
            enableMetadata: true,
            rateLimit: {
                enabled: false,
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