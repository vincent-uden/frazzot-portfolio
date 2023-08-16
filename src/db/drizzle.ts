import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

declare global {
  var drizzle_client: postgres.Sql | undefined;
  var db: PostgresJsDatabase<Record<string, never>> | undefined;
}

const drizzle_client =
  global.drizzle_client || postgres(process.env.DATABASE_URL!!);
export const db = global.db || drizzle(drizzle_client);
