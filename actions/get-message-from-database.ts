"use server";

import { db } from "@/app/db/db";
import { messages } from "@/app/db/schema";

type Message = {
    id: number;
    message: string;
};
  

export async function getMessagesFromDatabase(): Promise<Message[]> {
  console.log("① getMessages start");

  try {
    const result = await Promise.race([
      db.select().from(messages),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("DB timeout")), 3000)
      ),
    ]);

    console.log("② success");
    return result as Message[];
  } catch (error) {
    console.log("❌ DB error:", error);
    return [];
  }
}