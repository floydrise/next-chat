import { ChatHeader } from "@/components/ChatHeader";
import { createClient } from "@/lib/supabase/server";
import { ChatInput } from "@/components/ChatInput";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <div className={"max-w-3xl mx-auto md:py-10 h-screen"}>
      <div className={"h-full border rounded-md flex flex-col"}>
        <ChatHeader user={data.user} />
        <div className={"flex-1 flex flex-col p-5 overflow-y-auto"}>
          <div className={"flex-1"}></div>
          <div className={"space-y-7"}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((value) => (
              <div key={value} className={"flex gap-2"}>
                <div className={"h-10 w-10 bg-indigo-400 rounded-full"}></div>
                <div className={"flex-1"}>
                  <div className={"flex gap-1 mb-1 items-center"}>
                    <h1 className={"font-bold"}>Stefan</h1>
                    <p className={"text-sm text-gray-400"}>
                      {new Date().toDateString()}
                    </p>
                  </div>
                  <p
                    className={
                      "text-gray-700 bg-indigo-200 dark:bg-indigo-400 rounded-lg p-2 dark:text-gray-200"
                    }
                  >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ChatInput />
      </div>
    </div>
  );
}
