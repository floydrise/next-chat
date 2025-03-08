"use client";

import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export const ChatInput = () => {
  const supabase = createClient();
  const handleSendMessage = async (text: string) => {
   const newMessage = {
       id: ""
   }

    const { error } = await supabase.from("messages").insert({ text });
    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={"p-5"}>
      <Input
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSendMessage(event.currentTarget.value);
            event.currentTarget.value = "";
          }
        }}
        placeholder={"Send message"}
      />
    </div>
  );
};
