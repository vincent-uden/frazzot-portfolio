import { prisma } from "../server/db/client";
import { db } from "./drizzle";
import "dotenv/config";
import * as dSchema from "./schema";
import { GalleryImage } from "@prisma/client";

console.log(process.env.DATABASE_URL_SUPABASE);
let categories = (await prisma.imageCategory.findMany());
let categoryIds = categories.map(({id, name, ..._}) => {return {oldId: id, newId: "", name}});
let categoriesNoId = (categories).map(({id, ...keepAttrs}) => keepAttrs);

let images = (await prisma.galleryImage.findMany()).map(({id, ...keepAttrs}) => keepAttrs);
let pws = (await prisma.adminPassword.findMany()).map(({id, ...keepAttrs}) => keepAttrs);
let sessionTokens = (await prisma.sessionToken.findMany()).map(({id, ...keepAttrs}) => keepAttrs);

await db.delete(dSchema.imageCategories);
await db.insert(dSchema.imageCategories).values(categoriesNoId);

// Translate old cuid ids to uuid
let newCategories = await db.select().from(dSchema.imageCategories);
for (let i = 0; i < categoryIds.length; i++) {
    for (let j = 0; j < newCategories.length; j++) {
        if (newCategories[j]?.name == categoryIds[i]?.name) {
            categoryIds[i]!!.newId = newCategories[j]!!.id;
        }
    }
}

// Transfer the new uuids to the images
for (let i = 0; i < images.length; i++) {
    for (let j = 0; j < categoryIds.length; j++) {
        if (images[i]!!.categoryId == categoryIds[j]!!.oldId) {
            images[i]!!.categoryId = categoryIds[j]!!.newId;
        }
    }
}

await db.insert(dSchema.galleryImages).values(images);
await db.insert(dSchema.adminPasswords).values(pws);
await db.insert(dSchema.sessionTokens).values(sessionTokens);

//console.log(await db.select().from(dSchema.galleryImages));
//console.log(await db.select().from(dSchema.adminPasswords));
//console.log(await db.select().from(dSchema.sessionTokens));
//console.log(await db.select().from(dSchema.imageCategories));
