"use server";
export const runtime = "edge"; 
import { getDb } from "@/app/db/db";
import { messages } from "@/app/db/schema";
import { getRequestContext } from "@cloudflare/next-on-pages";

export async function getMessagesFromDatabase() {
  const ctx = getRequestContext();
  
  const db = getDb({
    DATABASE_URL: ctx.env.DATABASE_URL,
    DATABASE_TOKEN: ctx.env.DATABASE_TOKEN,
  });

  const result = await db.select().from(messages);

  return result;
}