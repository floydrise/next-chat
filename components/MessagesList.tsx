"use client";
import { Message } from "@/components/Message";
import { IMessage, useMessage } from "@/lib/store/messages";
import { DeleteAlert, EditAlert } from "@/components/MessageActions";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export const MessagesList = () => {
  const { messages, addMessage, optimisticIds } = useMessage((state) => state);
  const supabase = createClient();
  useEffect(() => {
    const channel = supabase
      .channel("next-chat")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        async (payload) => {
          if (!optimisticIds.includes(payload.new.id)) {
            const { error, data } = await supabase
              .from("users")
              .select("*")
              .eq("id", payload.new.sent_by)
              .single();
            if (error) {
              toast.error(error.message);
            } else {
              const newMessage = {
                ...payload.new,
                users: data,
              };
              addMessage(newMessage as IMessage);
            }
          }
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className={"flex-1 flex flex-col h-full p-5 overflow-y-auto"}>
      <div className={"flex-1"}></div>
      <div className={"space-y-7"}>
        {messages.map((value, index) => (
          <Message key={index} value={value} />
        ))}
      </div>
      <DeleteAlert />
      <EditAlert />
    </div>
  );
};
