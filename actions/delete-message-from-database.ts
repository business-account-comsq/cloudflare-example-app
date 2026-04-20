"use server";
import { getDb } from "@/app/db/db";
import { messages } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getRequestContext } from "@cloudflare/next-on-pages";

export async function deleteMessageToDatabase(id: number) {
  try {
    const ctx = getRequestContext();
    
    const db = getDb({
      DATABASE_URL: ctx.env.DATABASE_URL,
      DATABASE_TOKEN: ctx.env.DATABASE_TOKEN,
    });

    await db.delete(messages).where(eq(messages.id, id));

    revalidatePath("/");

    return { ok: true };
  } catch (e) {
    console.log("delete error:", e);

    return { ok: false };
  }
}