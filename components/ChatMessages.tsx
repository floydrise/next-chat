import { MessagesList } from "@/components/MessagesList";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";

export const ChatMessages = async () => {
  const supabase = await createClient();
  const { data } = await supabase.from("messages").select("*, users(*)");
  console.log(data);
  return (
    <Suspense fallback={"Loading ..."}>
      <MessagesList messages={data || []} />
    </Suspense>
  );
};
