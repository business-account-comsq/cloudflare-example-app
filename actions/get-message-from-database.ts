"use server";
import { getDb } from "@/app/db/db";
import { messages } from "@/app/db/schema";
import { getRequestContext } from "@cloudflare/next-on-pages";

export async function getMessagesFromDatabase() {
  let env;
  try {
    const ctx = getRequestContext();
    env = ctx.env;
  } catch (e) {
    // ビルド時やローカル環境用
    env = process.env;
  }
  
  if (!env?.DATABASE_URL) {
    console.error("DATABASE_URL is missing");
    return [];
  }
  
  const db = getDb({
    DATABASE_URL: env.DATABASE_URL,
    DATABASE_TOKEN: env.DATABASE_TOKEN!
  });

  const result = await db.select().from(messages);

  return result;
}