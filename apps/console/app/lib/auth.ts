import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { authConfig } from "@azen/auth-config";

export const auth = betterAuth({
    ...authConfig,
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    plugins: [
        nextCookies(),
        ...authConfig.plugins,
    ], 
});