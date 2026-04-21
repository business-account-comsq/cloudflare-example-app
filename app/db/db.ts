import { drizzle } from "drizzle-orm/libsql/web";
import { createClient } from "@libsql/client/web";

export const runtime = "edge"; 

export function getDb(env: {
  DATABASE_URL: string;
  DATABASE_TOKEN: string;
}) {
  console.log("getDb env:", env);
  const client = createClient({
    url: env.DATABASE_URL,
    authToken: env.DATABASE_TOKEN,
    fetch:fetch
  });

  return drizzle(client);
}