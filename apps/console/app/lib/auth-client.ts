import { apiKeyClient, magicLinkClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_URL,
    plugins: [
        apiKeyClient(),
        magicLinkClient(),
    ],
});

export const { signIn, signUp, signOut, useSession } = authClient;