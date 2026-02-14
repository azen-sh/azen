import { getCurrentUser } from "../lib/getUser";
import { redirect } from "next/navigation";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  };

  if (user.onboardingCompleted) {
    redirect("/dashboard");
  };

  return <>{children}</>;
}
