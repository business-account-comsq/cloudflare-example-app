import MessageDisplay from "@/components/message-display";
import MessageForm from "@/components/message-form";
import { getMessagesFromDatabase } from "@/actions/get-message-from-database";

export const runtime="edge"

export default async function Home() {
  const messages=await getMessagesFromDatabase();
  return (
    <main className="max-w-2xl mx-auto p-10">
      <MessageForm/>
      <MessageDisplay messages={messages}/>
    </main>
  );
}

