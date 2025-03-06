import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className={"max-w-3xl mx-auto md:py-10 h-screen"}>
      <div className={"h-full border rounded-md"}>
        <div className={"p-5 border-b flex justify-between items-center"}>
          <div>
            <h1 className={"font-bold text-xl"}>Daily Chats</h1>
            <div className={"flex items-center gap-2"}>
              <div
                className={"bg-green-400 rounded-full h-3 w-3 animate-pulse"}
              ></div>
              <p className={"text-sm text-gray-500"}>Two online</p>
            </div>
          </div>
          <div className={"flex gap-2"}>
            <ThemeToggle />
            <Button>Log in</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
