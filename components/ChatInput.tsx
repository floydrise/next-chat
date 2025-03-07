import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MousePointer2 } from "lucide-react";

export const ChatInput = () => {
  return (
    <div className={"p-5 flex gap-2 border-t"}>
      <Input placeholder={"Send message"} />
      <Button>
        <MousePointer2 />
      </Button>
    </div>
  );
};
