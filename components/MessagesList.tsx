"use client";
import {Message} from "@/components/Message";
import {useMessage} from "@/lib/store/messages";
import {DeleteAlert} from "@/components/MessageActions";

export const MessagesList = () => {
  const messages = useMessage((state) => state.messages);

    return (
    <div className={"flex-1 flex flex-col h-full p-5 overflow-y-auto"}>
      <div className={"flex-1"}></div>
      <div className={"space-y-7"}>
        {messages.map((value) => (
          <Message key={value.id} value={value}/>
        ))}
      </div>
      <DeleteAlert/>
    </div>
  );
};
