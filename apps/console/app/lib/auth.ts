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
                },
            }
        }
    } 
});