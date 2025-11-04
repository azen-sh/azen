import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const connectionString = process.env.DATABASE_URL;

const sql = neon(connectionString as string);
export const db = drizzle({ client: sql });

export * as schema from "./db/schema";
export * from "drizzle-orm";