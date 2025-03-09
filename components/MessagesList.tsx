"use client";
import { Message } from "@/components/Message";
import { IMessage, useMessage } from "@/lib/store/messages";
import { DeleteAlert, EditAlert } from "@/components/MessageActions";
import { useEffect, useRef } from "react";
import { createClient } from "@/supabase/client";
import { toast } from "sonner";

export const MessagesList = () => {
  const {
    messages,
    addMessage,
    optimisticIds,
    optimisticDeleteMessage,
    optimisticUpdateMessage,
  } = useMessage((state) => state);
  const supabase = createClient();
  const scrollRef = useRef({}) as React.RefObject<HTMLDivElement>;
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
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "messages" },
        (payload) => {
          optimisticDeleteMessage(payload.old.id);
        },
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "messages" },
        (payload) => {
          console.log("Change received!", payload);
          optimisticUpdateMessage(payload.new as IMessage);
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [addMessage, messages, optimisticIds, supabase]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className={"flex-1 flex flex-col h-full p-5 overflow-y-auto"}
      ref={scrollRef}
    >
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
