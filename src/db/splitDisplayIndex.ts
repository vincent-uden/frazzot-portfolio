import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
import {
  ImageCategory,
  galleryImages,
  imageCategories,
} from "./schema";
import { eq } from "drizzle-orm";
import { exit } from "process";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString!!, { max: 1 });
const db = drizzle(sql, { logger: true });

let categories = await db.select().from(imageCategories);
if (categories == null) {
  exit(1);
}
categories = categories!!;
console.log(categories);

async function generateNewDisplayOrder(category: ImageCategory) {
  console.log("Updating: ", category.name);
  let out = await db
    .select()
    .from(galleryImages)
    .where(eq(galleryImages.categoryId, category.id))
    .orderBy(galleryImages.displayIndex);

  await db.transaction(async (tx) => {
    for (let i = 0; i < out.length; i++) {
      if (out[i] != null) {
        await tx
          .update(galleryImages)
          .set({ displayIndex: i })
          .where(eq(galleryImages.id, out[i]!!.id));
      }
    }
  });

  return out;
}

for (const category of categories) {
  await generateNewDisplayOrder(category);
}
