import { getCurrentUser } from "@/app/lib/getUser";
import AccountSettingsPage from "@/components/AccountSettingsPage";

export default async function AccountSettings() {
  const user = await getCurrentUser();

  if(!user) {
    return null;
  };

  return (
    <AccountSettingsPage user={user} />
  )
}