import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { apiKey } from "better-auth/plugins";
import { prisma } from "db";

export const auth = betterAuth({
    database: prismaAdapter(prisma, { provider: 'postgresql' }),
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
            permissions: {
                defaultPermissions: {
                    file: ['read'],
                    projects: ['read'],
                },
            },
        }),
    ], 
});