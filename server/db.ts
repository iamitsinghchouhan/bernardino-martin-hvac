import { Pool, type PoolConfig } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

let connectionString = process.env.DATABASE_URL;
if (!/[?&]sslmode=/.test(connectionString)) {
  const separator = connectionString.includes("?") ? "&" : "?";
  connectionString += `${separator}sslmode=no-verify`;
}

const poolConfig: PoolConfig = {
  connectionString,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
};

export const pool = new Pool(poolConfig);
export const db = drizzle(pool, { schema });
