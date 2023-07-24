import { prisma } from "../server/db/client";
import { db } from "./drizzle";
import "dotenv/config";
import * as dSchema from "./schema";
import { GalleryImage } from "@prisma/client";

console.log(process.env.DATABASE_URL_SUPABASE);
let categories = await prisma.imageCategory.findMany();
let images = await prisma.galleryImage.findMany();
let pws = await prisma.adminPassword.findMany();
let sessionTokens = await prisma.sessionToken.findMany();

console.log(images);

// await db.insert(dSchema.imageCategories).values(categories);
// await db.insert(dSchema.galleryImages).values(images);
// await db.insert(dSchema.adminPasswords).values(pws);
// await db.insert(dSchema.sessionTokens).values(sessionTokens);

console.log(await db.select().from(dSchema.galleryImages));
console.log(await db.select().from(dSchema.adminPasswords));
console.log(await db.select().from(dSchema.sessionTokens));
console.log(await db.select().from(dSchema.imageCategories));
