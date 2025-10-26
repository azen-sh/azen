import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const connectionString = process.env.DATABASE_URL;
if(!connectionString) {
    throw new Error("DATABASE_URL is not set. Set it in .env or as an env var.");
};

export function createDb() {
    const sql = neon(connectionString as string);
    return drizzle({ client: sql });
}

export * as schema from "./db/schema";
export * from "drizzle-orm";