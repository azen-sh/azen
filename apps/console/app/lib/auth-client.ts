import { apiKeyClient, magicLinkClient, organizationClient, inferAdditionalFields, inferOrgAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { auth } from "./auth";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_URL,
    plugins: [
        apiKeyClient(),
        magicLinkClient(),
        organizationClient({
            schema: inferOrgAdditionalFields < typeof auth > ()
        }),
        inferAdditionalFields({
            user: {
                hasCompletedOnboarding: {
                    type: "boolean"
                }
            }
        })
    ],
});

export const { 
    signIn, 
    signUp, 
    signOut, 
    useSession, 
    updateUser, 
    organization, 
    useListOrganizations 
} = authClient;