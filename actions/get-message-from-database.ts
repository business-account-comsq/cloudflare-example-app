"use server";
import { getDb } from "@/app/db/db";
import { messages } from "@/app/db/schema";
import { getRequestContext } from "@cloudflare/next-on-pages";

export async function getMessagesFromDatabase() {
  console.log("⑤ action start");
  let env;
  try {
    const ctx = getRequestContext();
    console.log("⑥ env", ctx.env);
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

  try {
    console.log("⑦ before select");
    const result = await db.select().from(messages);
    console.log("⑧ after select", result);
    return result ?? [];
  } catch (e) {
    console.error(e);
    return [];
  }
}