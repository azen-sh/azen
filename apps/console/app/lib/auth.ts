import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { authConfig } from "@azen/auth-config";
import { resend } from "./resend";
import { magicLink } from "better-auth/plugins";
import MagicLinkEmail from "@/emails/MagicLinkLogin";

export const auth = betterAuth({
    ...authConfig,
    account:{
        accountLinking: {
            enabled: true,
            trustedProviders: ["google", "github"],
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },
    plugins: [
        nextCookies(),
        magicLink({
            expiresIn: 900,
            sendMagicLink: async ({ email, url }) => {
                await resend.emails.send({
                    from: `${process.env.EMAIL_SENDER_NAME} ${process.env.EMAIL_SENDER_ADDRESS}`,
                    to: email,
                    subject: "Login to Azen",
                    react: MagicLinkEmail({ url, email }),
                });
            },
        }),
        ...authConfig.plugins,
    ], 
});