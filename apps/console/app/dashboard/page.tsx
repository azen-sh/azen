import { headers } from "next/headers";
import { auth } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const response = await auth.api.getSession({
        headers: await headers()
    });

    if(!response?.user) {
        redirect("/");
    };

    return (
        <div className="bg-black flex justify-center items-center text-white min-h-screen text-2xl">
            <h1>Dashboard</h1>
        </div>
    );
}