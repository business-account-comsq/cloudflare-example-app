export {};

declare global {
  interface CloudflareEnv {
    DATABASE_URL: string;
    DATABASE_TOKEN: string;
  }
}