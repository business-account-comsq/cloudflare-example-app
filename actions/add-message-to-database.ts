"use server";

import { getDb } from "@/app/db/db";
import { messages } from "@/app/db/schema";
import { revalidatePath } from "next/cache";

export async function addMessageToDatabase(message: string) {
  try {
    const db = getDb({
      DATABASE_URL: process.env.DATABASE_URL || "",
      DATABASE_TOKEN: process.env.DATABASE_TOKEN || "",
    });

    await db.insert(messages).values({
      message,
    });

    revalidatePath("/");

    return { ok: true };
  } catch (e) {
    console.log("add error:", e);

    return { ok: false };
  }
}