import Image from "next/image";
import { IMessage } from "@/lib/store/messages";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import {useUser} from "@/lib/store/user";

export const Message = ({ message }: { message: IMessage }) => {
  const user = useUser((state) => state.user);

    return (
    <div className={"flex gap-2"}>
      <div>
        <Image
          className={"rounded-full"}
          src={message?.users?.avatar_url || ""}
          alt={"User avatar"}
          width={40}
          height={40}
        />
      </div>
      <div className={"flex-1"}>
        <div className={"flex items-center justify-between"}>
          <div className={"flex gap-1 items-center"}>
            <h1 className={"font-bold"}>{message.users?.display_name}</h1>
            <p className={"text-sm text-gray-400"}>
              {new Date(message.created_at).toDateString()}
            </p>
          </div>
            {user?.id === message.users?.id ? <MessageMenu /> : null}
        </div>
        <p className={`text-gray-700 dark:text-gray-200`}>{message.text}</p>
      </div>
    </div>
  );
};

const MessageMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Remove</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
