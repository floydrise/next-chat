import { IMessage } from "@/components/MessagesList";
import Image from "next/image";

export const Message = ({ value }: { value: IMessage }) => {
  return (
    <div className={"flex gap-2"}>
      <div>
        <Image
          className={"rounded-full"}
          src={value.users.avatar_url}
          alt={"User avatar"}
          width={40}
          height={40}
        />
      </div>
      <div className={"flex-1"}>
        <div className={"flex gap-1 mb-1 items-center"}>
          <h1 className={"font-bold"}>{value.users.display_name}</h1>
          <p className={"text-sm text-gray-400"}>
            {new Date(value.created_at).toDateString()}
          </p>
        </div>
        <p
          className={`text-gray-700 bg-indigo-200 dark:bg-indigo-400 rounded-lg p-2 dark:text-gray-200`}
        >
          {value.text}
        </p>
      </div>
    </div>
  );
};
