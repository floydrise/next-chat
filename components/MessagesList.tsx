"use client";
import {Message} from "@/components/Message";

export interface IMessage {
  created_at: string;
  id: string;
  is_edit: boolean;
  sent_by: string;
  text: string;
  users: {
    avatar_url: string;
    created_at: string;
    display_name: string;
    id: string;
  };
}

export const MessagesList = ({ messages }: { messages: IMessage[] }) => {
  return (
    <div className={"flex-1 flex flex-col h-full p-5 overflow-y-auto"}>
      <div className={"flex-1"}></div>
      <div className={"space-y-7"}>
        {messages.map((value) => (
          <Message key={value.id} value={value}/>
        ))}
      </div>
    </div>
  );
};
