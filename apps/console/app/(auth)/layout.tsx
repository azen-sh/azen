import { Toaster } from "@/components/ui/sonner";
import { getCurrentUser } from "../lib/getUser";
import { redirect } from "next/navigation";

export default async function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const user = await getCurrentUser();

    if(user) {
        redirect("/dashboard");
    };

    return (
        <div>
          {children}
          <Toaster richColors closeButton position="top-right" />
        </div>
      );
}