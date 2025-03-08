"use client";

import { useEffect, useRef } from "react";
import { IMessage, useMessage } from "@/lib/store/messages";

export const InitMessages = ({ messages }: { messages: IMessage[] }) => {
  const initState = useRef(false);
  useEffect(() => {
    if (!initState.current) {
      useMessage.setState({ messages });
    }

    initState.current = true;
  }, [messages]);

  return <></>;
};
