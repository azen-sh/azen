import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { apiKey } from "better-auth/plugins";
import { prisma } from "db";

export const auth = betterAuth({
    database: prismaAdapter(prisma, { provider: "postgresql" }),
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