import { ChatHeader } from "@/components/ChatHeader";
import {createClient} from "@/lib/supabase/server";

export default async function Home() {

    const supabase = await createClient();
    const {data} = await supabase.auth.getUser();

    return (
    <div className={"max-w-3xl mx-auto md:py-10 h-screen"}>
      <div className={"h-full border rounded-md"}>
        <ChatHeader user={data.user} />
      </div>
    </div>
  );
}
