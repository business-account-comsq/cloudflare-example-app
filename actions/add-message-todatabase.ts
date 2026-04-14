"use server";

//import { db } from "@/app/db/index";
//import { messages } from "@/app/db/schema";
import { revalidatePath } from "next/cache";


export async function addMessageToDatabase(input: string): Promise<{ ok: boolean }> {
    console.log("① add start", input);
  
    try {
      await Promise.race([
        //db.insert(messages).values({ message: input }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("DB timeout")), 3000)
        ),
      ]);
  
      try {
        revalidatePath("/");
      } catch (e) {
        console.log("revalidate error", e);
      }
  
      return { ok: true };
    } catch (error) {
      console.log("❌ insert error:", error);
      return { ok: false };
    }
  }