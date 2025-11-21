import { headers } from "next/headers";
import { auth } from "../lib/auth";
import { redirect } from "next/navigation";
import ApiKeysManager from "../components/apiKeysManager";

export default async function Dashboard() {
    const response = await auth.api.getSession({
        headers: await headers()
    });

    if(!response?.user) {
        redirect("/");
    };

    return (
        <ApiKeysManager />
    );
}