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
}

export const useMessage = create<MessageState>()((set) => ({
    messages: [],
}))