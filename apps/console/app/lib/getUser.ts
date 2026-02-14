import { headers } from "next/headers";
import { auth } from "./auth";

export type User = {
    id: string;
    name: string;
    email: string;
    verified: boolean;
    onboardingCompleted: boolean;
    image: string | null;
}

export async function getCurrentUser(): Promise<User | null> {
    const authSession = await auth.api.getSession({
        headers: await headers(),
    }); 

    if(!authSession || !authSession.user) return null;

    const user = authSession.user

    return {
        id: user.id,
        name: user.name ?? "Account",
        email: user.email ?? "",
        verified: user.emailVerified,
        onboardingCompleted: user.hasCompletedOnboarding,
        image: user.image ?? null,
    };
};