import { ChatHeader } from "@/components/ChatHeader";
import { createClient } from "@/lib/supabase/server";
import { ChatInput } from "@/components/ChatInput";
import { ChatMessages } from "@/components/ChatMessages";
import { InitUser } from "@/lib/store/InitUser";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <>
      <div className={"max-w-3xl mx-auto md:py-10 h-screen"}>
        <div className={"h-full border rounded-md flex flex-col"}>
          <ChatHeader user={data.user} />
          <ChatMessages />
          <ChatInput />
        </div>
      </div>
      <InitUser user={data?.user} />
    </>
  );
}
