import { create } from "zustand/react";

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
  } | null;
}

interface MessageState {
  messages: IMessage[];
  addMessage: (message: IMessage) => void;
  actionMessage: IMessage | undefined;
  setActionMessage: (message: IMessage | undefined) => void;
  optimisticDeleteMessage: (messageId: string) => void;
}

export const useMessage = create<MessageState>()((set) => ({
  messages: [],
  actionMessage: undefined,
  addMessage: (message) =>
    set((prevState) => ({ messages: [...prevState.messages, message] })),
  setActionMessage: (message) => set(() => ({ actionMessage: message })),
  optimisticDeleteMessage: (messageId) =>
    set((state) => {
      return {
        messages: state.messages.filter((message) => message.id !== messageId),
      };
    }),
}));
