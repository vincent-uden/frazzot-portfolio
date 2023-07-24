import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
    driver: "pg",
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!!,
    },
} satisfies Config;