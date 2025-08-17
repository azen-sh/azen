"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut } from "./lib/auth-client";

export default function Home() {
  return (
    <div className="bg-black flex justify-center items-center min-h-screen gap-4">
      <Button 
      onClick={() => 
      signIn.social({ provider: 'google', callbackURL: '/dashboard' })}
      className="bg-white text-black px-4 py-2 cursor-pointer hover:bg-white">Sign In</Button>

      <Button 
      onClick={() => signOut()}
      className="bg-white text-black cursor-pointer hover:bg-white">Sign Out</Button>
    </div>
  );
}
