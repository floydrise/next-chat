"use client";

import {Input} from "@/components/ui/input";
import {createClient} from "@/lib/supabase/client";
import {toast} from "sonner";
import {v4 as uuidv4} from "uuid";
import {useUser} from "@/lib/store/user";
import {IMessage, useMessage} from "@/lib/store/messages";

export const ChatInput = () => {
    const user = useUser((state) => state.user);
    const addMessage = useMessage((state) => state.addMessage)

    const supabase = createClient();
    const handleSendMessage = async (text: string) => {
        if (text.trim()) {
            const newMessage = {
                id: uuidv4(),
                text,
                sent_by: user?.id,
                is_edit: false,
                created_at: new Date().toISOString(),
                users: {
                    id: user?.id,
                    avatar_url: user?.user_metadata.avatar_url,
                    created_at: new Date().toISOString(),
                    display_name: user?.user_metadata.user_name,
                }
            }

            addMessage(newMessage as IMessage);

            const {error} = await supabase.from("messages").insert({text});
            if (error) {
                toast.error(error.message);
            }
        } else {
            toast.error("Cannot send an empty message!");
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
