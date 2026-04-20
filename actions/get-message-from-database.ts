"use server";

import { getDb } from "@/app/db/db";
import { messages } from "@/app/db/schema";

export async function getMessagesFromDatabase() {
  const env = {
    DATABASE_URL: process.env.DATABASE_URL || "",
    DATABASE_TOKEN: process.env.DATABASE_TOKEN || "",
  };

  console.log("② env check:", env);

  const db = getDb(env);

  const result = await db.select().from(messages);

  return result;
}