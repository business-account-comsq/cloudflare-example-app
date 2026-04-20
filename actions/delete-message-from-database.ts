"use server";

import { getDb } from "@/app/db/db";
import { messages } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteMessageToDatabase(id: number) {
  try {
    const env = {
      DATABASE_URL: process.env.DATABASE_URL || "",
      DATABASE_TOKEN: process.env.DATABASE_TOKEN || "",
    };
  
    console.log("② env check:", env);
  
    const db = getDb(env);

    await db.delete(messages).where(eq(messages.id, id));

    revalidatePath("/");

    return { ok: true };
  } catch (e) {
    console.log("delete error:", e);

    return { ok: false };
  }
}