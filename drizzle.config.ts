import { defineConfig } from 'drizzle-kit'

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in environment variables.");
  }
export default defineConfig({
    schema: "./app/db/schema.ts",
    dialect: "postgresql",
    out: './supabase/migrations',
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
    verbose: true,
    strict: true,
})
