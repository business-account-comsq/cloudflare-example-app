"use server";

import { getDb } from "@/app/db/db";
import { messages } from "@/app/db/schema";
import { revalidatePath } from "next/cache";

export async function addMessageToDatabase(message: string) {
  const env = {
    DATABASE_URL: process.env.DATABASE_URL || "",
    DATABASE_TOKEN: process.env.DATABASE_TOKEN || "",
  };

  console.log("② env check:", env);

  const db = getDb(env);

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