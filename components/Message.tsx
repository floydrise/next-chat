import Image from "next/image";
import { IMessage, useMessage } from "@/lib/store/messages";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useUser } from "@/lib/store/user";

export const Message = ({ value }: { value: IMessage }) => {
  const user = useUser((state) => state.user);

  return (
    <div className={"flex gap-2"}>
      <div>
        <Image
          className={"rounded-full"}
          src={value?.users?.avatar_url || ""}
          alt={"User avatar"}
          width={40}
          height={40}
        />
      </div>
      <div className={"flex-1"}>
        <div className={"flex items-center justify-between"}>
          <div className={"flex gap-1 items-center"}>
            <h1 className={"font-bold"}>{value.users?.display_name}</h1>
            <p className={"text-sm text-gray-400"}>
              {new Date(value.created_at).toDateString()}
            </p>
          </div>
          {user?.id === value.users?.id ? (
            <MessageMenu message={value} />
          ) : null}
        </div>
        <p className={`text-gray-700 dark:text-gray-200`}>{value.text}</p>
      </div>
    </div>
  );
};

const MessageMenu = ({ message }: { message: IMessage }) => {
  const setActionMessage = useMessage((state) => state.setActionMessage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            document.getElementById("trigger-delete")?.click();
            setActionMessage(message);
          }}
        >
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
