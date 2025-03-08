import { MessagesList } from "@/components/MessagesList";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { InitMessages } from "@/lib/store/InitMessages";

export const ChatMessages = async () => {
  const supabase = await createClient();
  const { data } = await supabase.from("messages").select("*, users(*)");

  return (
    <Suspense fallback={"Loading ..."}>
      <MessagesList />
      <InitMessages messages={data || []} />
    </Suspense>
  );
};
