"use server";

import { getDb } from "@/app/db/db";
import { messages } from "@/app/db/schema";
import { revalidatePath } from "next/cache";
import { getRequestContext } from "@cloudflare/next-on-pages";

export async function addMessageToDatabase(message: string) {
  const ctx = getRequestContext();

  const db = getDb({
    DATABASE_URL: ctx.env.DATABASE_URL,
    DATABASE_TOKEN: ctx.env.DATABASE_TOKEN,
  });

  try {
    console.log("① add start", message);

    await db.insert(messages).values({
      message,
    });

    console.log("② add success");

    revalidatePath("/");

    return { ok: true };
  } catch (e) {
    console.error("❌ add error:", e);
    return { ok: false };
  }
}