// run with "npx tsno src/db/migrate.ts"
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import dotenv from "dotenv";
import { sessionTokens } from "./schema";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString!!, { max: 1 });
const db = drizzle(sql, { logger: true });

console.log(await db.select().from(sessionTokens));

await migrate(db, { migrationsFolder: "drizzle" });

console.log("Migration Complete");