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
  optimisticUpdateMessage: (message: IMessage) => void;
  optimisticIds: string[];
}

export const useMessage = create<MessageState>()((set) => ({
  messages: [],
  optimisticIds: [],
  actionMessage: undefined,
  addMessage: (newMessage) =>
    set((state) => ({
      messages: [...state.messages, newMessage],
      optimisticIds: [...state.optimisticIds, newMessage.id],
    })),
  setActionMessage: (message) => set(() => ({ actionMessage: message })),
  optimisticDeleteMessage: (messageId) =>
    set((state) => {
      return {
        messages: state.messages.filter((message) => message.id !== messageId),
      };
    }),
  optimisticUpdateMessage: (updatedMessage) =>
    set((state) => {
      return {
        messages: state.messages.filter((message) => {
          if (message.id === updatedMessage.id) {
            message.text = updatedMessage.text;
            message.is_edit = updatedMessage.is_edit;
          }
          return message;
        }),
      };
    }),
}));
