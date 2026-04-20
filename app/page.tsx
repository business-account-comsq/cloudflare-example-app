import MessageDisplay from "@/components/message-display";
import MessageForm from "@/components/message-form";
import { getMessagesFromDatabase } from "@/actions/get-message-from-database";

export const runtime="edge"

export default async function Home() {
  console.log("① page start");
  let messages = null;
  try {
    console.log("② before fetch");
    messages = await getMessagesFromDatabase();
    console.log("③ after fetch", messages);
  } catch (e) {
    console.error("❌ fetch error:", e);
  }
  console.log("④ render check", messages);
  if (!messages) {
    return (
      <main className="max-w-2xl mx-auto p-10">
        <MessageForm />
        <div>データ取得中 or エラー</div>
      </main>
    );
  }
  return (
    <main className="max-w-2xl mx-auto p-10">
      <MessageForm/>
      <MessageDisplay messages={messages}/>
    </main>
  );
}

