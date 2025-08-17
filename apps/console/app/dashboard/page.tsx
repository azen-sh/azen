import { headers } from "next/headers";
import { auth } from "../lib/auth";

export default async function Dashboard() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    console.log(session);

    return (
        <div className="bg-black flex justify-center items-center text-white min-h-screen text-2xl">
            <h1>Dashboard</h1>
        </div>
    );
}