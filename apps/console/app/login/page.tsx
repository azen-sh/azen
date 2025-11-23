import LoginPage from "@/components/LoginPage";
import { getCurrentUser } from "../lib/getUser";
import { redirect } from "next/navigation";

export default async function Login() {
    const user = await getCurrentUser();

    if(user) {
        redirect("/dashboard");
    };
    return (
        <LoginPage />
    );
}