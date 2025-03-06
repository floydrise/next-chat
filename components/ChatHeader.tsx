"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/auth-js";
import { useRouter } from "next/navigation";

export const ChatHeader = ({ user }: { user: User | null }) => {
  const router = useRouter();

  const handleLogin = () => {
    const supabase = createClient();
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: location.origin + "/auth/callback",
      },
    });
  };
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className={"p-5 border-b flex justify-between items-center"}>
      <div>
        <h1 className={"font-bold text-xl"}>Daily Chats</h1>
        <div className={"flex items-center gap-2"}>
          <div
            className={"bg-green-400 rounded-full h-3 w-3 animate-pulse"}
          ></div>
          <p className={"text-sm text-gray-500"}>Two online</p>
        </div>
      </div>
      <div className={"flex gap-2"}>
        <ThemeToggle />
        {user ? (
          <Button onClick={handleLogout}>Log out</Button>
        ) : (
          <Button onClick={handleLogin}>Log in with GitHub</Button>
        )}
      </div>
    </div>
  );
};
