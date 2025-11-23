import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { getCurrentUser } from "../lib/getUser"
import { redirect } from "next/navigation";

export default async function ConsoleLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    
    const user = await getCurrentUser();
    if(!user) {
        redirect("/login");
    };

    return (
      <SidebarProvider>
        <AppSidebar user={user} />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-black text-white">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
}