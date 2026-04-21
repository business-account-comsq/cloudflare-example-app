"use server";
import { getDb } from "@/app/db/db";
import { messages } from "@/app/db/schema";
import { getRequestContext } from "@cloudflare/next-on-pages";

export async function getMessagesFromDatabase() {
  console.log("⑤ action start");
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

  try {
    console.log("⑦ before select");
    // 【究極のデバッグ挿入点】
    // Drizzleを介さず、生のクライアントで接続テスト
    try {
      console.log("--- DEBUG START ---");
      // 1. そもそもDBに繋がるか？ (SELECT 1)
      await db.$client.execute("SELECT 1");
      console.log("✅ Connection Test (SELECT 1): Success");

      // 2. どんなテーブルが存在しているか？
      const tables = await db.$client.execute("SELECT name FROM sqlite_master WHERE type='table'");
      console.log("✅ Found Tables:", JSON.stringify(tables.rows));
      
      console.log("--- DEBUG END ---");
    } catch (debugError: any) {
      console.error("❌ DEBUG FAILED:", {
        message: debugError.message,
        code: debugError.code, // ここに 'UNAUTHORIZED' や 'SQLITE_ERROR' が出ます
        raw: debugError
      });
    }
    const result = await db.select().from(messages);
    console.log("⑧ after select", result);
    return result ?? [];
  } catch (e) {
    console.error(e);
    return [];
  }
}