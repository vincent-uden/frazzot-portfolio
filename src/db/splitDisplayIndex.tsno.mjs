import {createRequire as __$$createRequireN} from 'module';var require=__$$createRequireN(import.meta.url);
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};

// node_modules/tsno/dist/client.js
import { createRequire as __$$createRequire } from "module";
var require2;
var init_client = __esm({
  "node_modules/tsno/dist/client.js"() {
    require2 = __$$createRequire("file:///media/hdd/github/frazzot-portfolio/node_modules/tsno/dist/client.js");
  }
});

// src/db/splitDisplayIndex.ts
init_client();
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";

// src/db/schema.ts
init_client();
import {
  pgTable,
  text,
  integer,
  timestamp,
  uniqueIndex,
  uuid
} from "drizzle-orm/pg-core";
var galleryImages = pgTable("GalleryImage", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  path: text("path").notNull(),
  w: integer("w").notNull(),
  h: integer("h").notNull(),
  thmb_w: integer("thmb_w").notNull(),
  thmb_h: integer("thmb_h").notNull(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "date" }).defaultNow().notNull(),
  categoryId: uuid("categoryId").references(() => imageCategories.id, {
    onDelete: "cascade",
    onUpdate: "cascade"
  }),
  url: text("url"),
  urlExpires: timestamp("urlExpires", { precision: 3, mode: "date" }).defaultNow().notNull(),
  urlLg: text("urlLg"),
  urlLgExpires: timestamp("urlLgExpires", { precision: 3, mode: "date" }).defaultNow().notNull(),
  displayIndex: integer("displayIndex").default(0).notNull()
});
var adminPasswords = pgTable(
  "AdminPassword",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    hash: text("hash").notNull()
  },
  (table) => {
    return {
      name_key: uniqueIndex("AdminPassword_name_key").on(table.name)
    };
  }
);
var imageCategories = pgTable(
  "ImageCategory",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull()
  },
  (table) => {
    return {
      name_key: uniqueIndex("ImageCategory_name_key").on(table.name)
    };
  }
);
var sessionTokens = pgTable(
  "SessionToken",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    token: text("token").notNull(),
    expires: timestamp("expires", { precision: 3, mode: "date" }).defaultNow().notNull()
  },
  (table) => {
    return {
      token_key: uniqueIndex("SessionToken_token_key").on(table.token)
    };
  }
);
var blogLikes = pgTable("BlogLikes", {
  id: uuid("id").defaultRandom().primaryKey(),
  fingerprint: text("fingerprint").notNull(),
  blogPost: text("blogPost").notNull(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "date" }).defaultNow().notNull()
});

// src/db/splitDisplayIndex.ts
import { eq } from "drizzle-orm";
import { exit } from "process";
dotenv.config();
var connectionString = process.env.DATABASE_URL;
var sql = postgres(connectionString, { max: 1 });
var db = drizzle(sql, { logger: true });
var categories = await db.select().from(imageCategories);
if (categories == null) {
  exit(1);
}
categories = categories;
console.log(categories);
async function generateNewDisplayOrder(category) {
  console.log("Updating: ", category.name);
  let out = await db.select().from(galleryImages).where(eq(galleryImages.categoryId, category.id)).orderBy(galleryImages.displayIndex);
  await db.transaction(async (tx) => {
    for (let i = 0; i < out.length; i++) {
      if (out[i] != null) {
        await tx.update(galleryImages).set({ displayIndex: i }).where(eq(galleryImages.id, out[i].id));
      }
    }
  });
  return out;
}
for (const category of categories) {
  await generateNewDisplayOrder(category);
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL3Rzbm8vZGlzdC9jbGllbnQuanMiLCAic3JjL2RiL3NwbGl0RGlzcGxheUluZGV4LnRzIiwgInNyYy9kYi9zY2hlbWEudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7Y3JlYXRlUmVxdWlyZSBhcyBfXyQkY3JlYXRlUmVxdWlyZX0gZnJvbSAnbW9kdWxlJzt2YXIgcmVxdWlyZT1fXyQkY3JlYXRlUmVxdWlyZShcImZpbGU6Ly8vbWVkaWEvaGRkL2dpdGh1Yi9mcmF6em90LXBvcnRmb2xpby9ub2RlX21vZHVsZXMvdHNuby9kaXN0L2NsaWVudC5qc1wiKTtcbmltcG9ydCB7XG4gIGNvbG9yc1xufSBmcm9tIFwiLi9jaHVuay1GSERYWE9LWS5qc1wiO1xuXG5cbi8vIHNyYy9jbGllbnQudHNcbnZhciBmZXRjaCA9ICh1cmwsIGluaXQpID0+IGltcG9ydChcIi4vc3JjLTRRN1E2N0MzLmpzXCIpLnRoZW4oKHJlcykgPT4gcmVzLmRlZmF1bHQodXJsLCBpbml0KSk7XG52YXIgYXhpb3MgPSAoY29uZmlnKSA9PiBpbXBvcnQoXCIuL2F4aW9zLVBJWjRDNVVaLmpzXCIpLnRoZW4oKHJlcykgPT4gcmVzLmRlZmF1bHQoY29uZmlnKSk7XG5leHBvcnQge1xuICBheGlvcyxcbiAgY29sb3JzLFxuICBmZXRjaFxufTtcbiIsICJpbXBvcnQgeyBkcml6emxlIH0gZnJvbSBcImRyaXp6bGUtb3JtL3Bvc3RncmVzLWpzXCI7XG5pbXBvcnQgeyBtaWdyYXRlIH0gZnJvbSBcImRyaXp6bGUtb3JtL3Bvc3RncmVzLWpzL21pZ3JhdG9yXCI7XG5pbXBvcnQgcG9zdGdyZXMgZnJvbSBcInBvc3RncmVzXCI7XG5pbXBvcnQgZG90ZW52IGZyb20gXCJkb3RlbnZcIjtcbmltcG9ydCB7XG4gIEdhbGxlcnlJbWFnZSxcbiAgSW1hZ2VDYXRlZ29yeSxcbiAgZ2FsbGVyeUltYWdlcyxcbiAgaW1hZ2VDYXRlZ29yaWVzLFxuICBzZXNzaW9uVG9rZW5zLFxufSBmcm9tIFwiLi9zY2hlbWFcIjtcbmltcG9ydCB7IGVxIH0gZnJvbSBcImRyaXp6bGUtb3JtXCI7XG5pbXBvcnQgeyBleGl0IH0gZnJvbSBcInByb2Nlc3NcIjtcblxuZG90ZW52LmNvbmZpZygpO1xuXG5jb25zdCBjb25uZWN0aW9uU3RyaW5nID0gcHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMO1xuY29uc3Qgc3FsID0gcG9zdGdyZXMoY29ubmVjdGlvblN0cmluZyEhLCB7IG1heDogMSB9KTtcbmNvbnN0IGRiID0gZHJpenpsZShzcWwsIHsgbG9nZ2VyOiB0cnVlIH0pO1xuXG5sZXQgY2F0ZWdvcmllcyA9IGF3YWl0IGRiLnNlbGVjdCgpLmZyb20oaW1hZ2VDYXRlZ29yaWVzKTtcbmlmIChjYXRlZ29yaWVzID09IG51bGwpIHtcbiAgZXhpdCgxKTtcbn1cbmNhdGVnb3JpZXMgPSBjYXRlZ29yaWVzISE7XG5jb25zb2xlLmxvZyhjYXRlZ29yaWVzKTtcblxuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVOZXdEaXNwbGF5T3JkZXIoY2F0ZWdvcnk6IEltYWdlQ2F0ZWdvcnkpIHtcbiAgY29uc29sZS5sb2coXCJVcGRhdGluZzogXCIsIGNhdGVnb3J5Lm5hbWUpO1xuICBsZXQgb3V0ID0gYXdhaXQgZGJcbiAgICAuc2VsZWN0KClcbiAgICAuZnJvbShnYWxsZXJ5SW1hZ2VzKVxuICAgIC53aGVyZShlcShnYWxsZXJ5SW1hZ2VzLmNhdGVnb3J5SWQsIGNhdGVnb3J5LmlkKSlcbiAgICAub3JkZXJCeShnYWxsZXJ5SW1hZ2VzLmRpc3BsYXlJbmRleCk7XG5cbiAgYXdhaXQgZGIudHJhbnNhY3Rpb24oYXN5bmMgKHR4KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdXQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChvdXRbaV0gIT0gbnVsbCkge1xuICAgICAgICBhd2FpdCB0eFxuICAgICAgICAgIC51cGRhdGUoZ2FsbGVyeUltYWdlcylcbiAgICAgICAgICAuc2V0KHsgZGlzcGxheUluZGV4OiBpIH0pXG4gICAgICAgICAgLndoZXJlKGVxKGdhbGxlcnlJbWFnZXMuaWQsIG91dFtpXS5pZCkpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG91dDtcbn1cblxuZm9yIChjb25zdCBjYXRlZ29yeSBvZiBjYXRlZ29yaWVzKSB7XG4gIGF3YWl0IGdlbmVyYXRlTmV3RGlzcGxheU9yZGVyKGNhdGVnb3J5KTtcbn1cbiIsICJpbXBvcnQge1xuICBwZ1RhYmxlLFxuICB0ZXh0LFxuICBpbnRlZ2VyLFxuICB0aW1lc3RhbXAsXG4gIHVuaXF1ZUluZGV4LFxuICB1dWlkLFxufSBmcm9tIFwiZHJpenpsZS1vcm0vcGctY29yZVwiO1xuXG5pbXBvcnQgeyBJbmZlck1vZGVsLCBzcWwgfSBmcm9tIFwiZHJpenpsZS1vcm1cIjtcblxuZXhwb3J0IGNvbnN0IGdhbGxlcnlJbWFnZXMgPSBwZ1RhYmxlKFwiR2FsbGVyeUltYWdlXCIsIHtcbiAgaWQ6IHV1aWQoXCJpZFwiKS5kZWZhdWx0UmFuZG9tKCkucHJpbWFyeUtleSgpLFxuICBuYW1lOiB0ZXh0KFwibmFtZVwiKS5ub3ROdWxsKCksXG4gIHBhdGg6IHRleHQoXCJwYXRoXCIpLm5vdE51bGwoKSxcbiAgdzogaW50ZWdlcihcIndcIikubm90TnVsbCgpLFxuICBoOiBpbnRlZ2VyKFwiaFwiKS5ub3ROdWxsKCksXG4gIHRobWJfdzogaW50ZWdlcihcInRobWJfd1wiKS5ub3ROdWxsKCksXG4gIHRobWJfaDogaW50ZWdlcihcInRobWJfaFwiKS5ub3ROdWxsKCksXG4gIGNyZWF0ZWRBdDogdGltZXN0YW1wKFwiY3JlYXRlZEF0XCIsIHsgcHJlY2lzaW9uOiAzLCBtb2RlOiBcImRhdGVcIiB9KVxuICAgIC5kZWZhdWx0Tm93KClcbiAgICAubm90TnVsbCgpLFxuICBjYXRlZ29yeUlkOiB1dWlkKFwiY2F0ZWdvcnlJZFwiKS5yZWZlcmVuY2VzKCgpID0+IGltYWdlQ2F0ZWdvcmllcy5pZCwge1xuICAgIG9uRGVsZXRlOiBcImNhc2NhZGVcIixcbiAgICBvblVwZGF0ZTogXCJjYXNjYWRlXCIsXG4gIH0pLFxuICB1cmw6IHRleHQoXCJ1cmxcIiksXG4gIHVybEV4cGlyZXM6IHRpbWVzdGFtcChcInVybEV4cGlyZXNcIiwgeyBwcmVjaXNpb246IDMsIG1vZGU6IFwiZGF0ZVwiIH0pXG4gICAgLmRlZmF1bHROb3coKVxuICAgIC5ub3ROdWxsKCksXG4gIHVybExnOiB0ZXh0KFwidXJsTGdcIiksXG4gIHVybExnRXhwaXJlczogdGltZXN0YW1wKFwidXJsTGdFeHBpcmVzXCIsIHsgcHJlY2lzaW9uOiAzLCBtb2RlOiBcImRhdGVcIiB9KVxuICAgIC5kZWZhdWx0Tm93KClcbiAgICAubm90TnVsbCgpLFxuICBkaXNwbGF5SW5kZXg6IGludGVnZXIoXCJkaXNwbGF5SW5kZXhcIikuZGVmYXVsdCgwKS5ub3ROdWxsKCksXG59KTtcblxuZXhwb3J0IGNvbnN0IGFkbWluUGFzc3dvcmRzID0gcGdUYWJsZShcbiAgXCJBZG1pblBhc3N3b3JkXCIsXG4gIHtcbiAgICBpZDogdXVpZChcImlkXCIpLmRlZmF1bHRSYW5kb20oKS5wcmltYXJ5S2V5KCksXG4gICAgbmFtZTogdGV4dChcIm5hbWVcIikubm90TnVsbCgpLFxuICAgIGhhc2g6IHRleHQoXCJoYXNoXCIpLm5vdE51bGwoKSxcbiAgfSxcbiAgKHRhYmxlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWVfa2V5OiB1bmlxdWVJbmRleChcIkFkbWluUGFzc3dvcmRfbmFtZV9rZXlcIikub24odGFibGUubmFtZSksXG4gICAgfTtcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IGltYWdlQ2F0ZWdvcmllcyA9IHBnVGFibGUoXG4gIFwiSW1hZ2VDYXRlZ29yeVwiLFxuICB7XG4gICAgaWQ6IHV1aWQoXCJpZFwiKS5kZWZhdWx0UmFuZG9tKCkucHJpbWFyeUtleSgpLFxuICAgIG5hbWU6IHRleHQoXCJuYW1lXCIpLm5vdE51bGwoKSxcbiAgfSxcbiAgKHRhYmxlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWVfa2V5OiB1bmlxdWVJbmRleChcIkltYWdlQ2F0ZWdvcnlfbmFtZV9rZXlcIikub24odGFibGUubmFtZSksXG4gICAgfTtcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IHNlc3Npb25Ub2tlbnMgPSBwZ1RhYmxlKFxuICBcIlNlc3Npb25Ub2tlblwiLFxuICB7XG4gICAgaWQ6IHV1aWQoXCJpZFwiKS5kZWZhdWx0UmFuZG9tKCkucHJpbWFyeUtleSgpLFxuICAgIHRva2VuOiB0ZXh0KFwidG9rZW5cIikubm90TnVsbCgpLFxuICAgIGV4cGlyZXM6IHRpbWVzdGFtcChcImV4cGlyZXNcIiwgeyBwcmVjaXNpb246IDMsIG1vZGU6IFwiZGF0ZVwiIH0pXG4gICAgICAuZGVmYXVsdE5vdygpXG4gICAgICAubm90TnVsbCgpLFxuICB9LFxuICAodGFibGUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgdG9rZW5fa2V5OiB1bmlxdWVJbmRleChcIlNlc3Npb25Ub2tlbl90b2tlbl9rZXlcIikub24odGFibGUudG9rZW4pLFxuICAgIH07XG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBibG9nTGlrZXMgPSBwZ1RhYmxlKFwiQmxvZ0xpa2VzXCIsIHtcbiAgaWQ6IHV1aWQoXCJpZFwiKS5kZWZhdWx0UmFuZG9tKCkucHJpbWFyeUtleSgpLFxuICBmaW5nZXJwcmludDogdGV4dChcImZpbmdlcnByaW50XCIpLm5vdE51bGwoKSxcbiAgYmxvZ1Bvc3Q6IHRleHQoXCJibG9nUG9zdFwiKS5ub3ROdWxsKCksXG4gIGNyZWF0ZWRBdDogdGltZXN0YW1wKFwiY3JlYXRlZEF0XCIsIHsgcHJlY2lzaW9uOiAzLCBtb2RlOiBcImRhdGVcIiB9KVxuICAgIC5kZWZhdWx0Tm93KClcbiAgICAubm90TnVsbCgpLFxufSk7XG5cbmV4cG9ydCB0eXBlIEdhbGxlcnlJbWFnZSA9IEluZmVyTW9kZWw8dHlwZW9mIGdhbGxlcnlJbWFnZXM+O1xuZXhwb3J0IHR5cGUgQWRtaW5QYXNzd29yZCA9IEluZmVyTW9kZWw8dHlwZW9mIGFkbWluUGFzc3dvcmRzPjtcbmV4cG9ydCB0eXBlIEltYWdlQ2F0ZWdvcnkgPSBJbmZlck1vZGVsPHR5cGVvZiBpbWFnZUNhdGVnb3JpZXM+O1xuZXhwb3J0IHR5cGUgU2Vzc2lvblRva2VuID0gSW5mZXJNb2RlbDx0eXBlb2Ygc2Vzc2lvblRva2Vucz47XG5leHBvcnQgdHlwZSBCbG9nTGlrZSA9IEluZmVyTW9kZWw8dHlwZW9mIGJsb2dMaWtlcz47XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7O0FBQUEsU0FBUSxpQkFBaUIseUJBQXdCO0FBQWpELElBQThEQTtBQUE5RDtBQUFBO0FBQTBELElBQUlBLFdBQVEsa0JBQWtCLDZFQUE2RTtBQUFBO0FBQUE7OztBQ0FySztBQUFBLFNBQVMsZUFBZTtBQUV4QixPQUFPLGNBQWM7QUFDckIsT0FBTyxZQUFZOzs7QUNIbkI7QUFBQTtBQUFBLEVBQ0U7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE9BQ0s7QUFJQSxJQUFNLGdCQUFnQixRQUFRLGdCQUFnQjtBQUFBLEVBQ25ELElBQUksS0FBSyxJQUFJLEVBQUUsY0FBYyxFQUFFLFdBQVc7QUFBQSxFQUMxQyxNQUFNLEtBQUssTUFBTSxFQUFFLFFBQVE7QUFBQSxFQUMzQixNQUFNLEtBQUssTUFBTSxFQUFFLFFBQVE7QUFBQSxFQUMzQixHQUFHLFFBQVEsR0FBRyxFQUFFLFFBQVE7QUFBQSxFQUN4QixHQUFHLFFBQVEsR0FBRyxFQUFFLFFBQVE7QUFBQSxFQUN4QixRQUFRLFFBQVEsUUFBUSxFQUFFLFFBQVE7QUFBQSxFQUNsQyxRQUFRLFFBQVEsUUFBUSxFQUFFLFFBQVE7QUFBQSxFQUNsQyxXQUFXLFVBQVUsYUFBYSxFQUFFLFdBQVcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxFQUM3RCxXQUFXLEVBQ1gsUUFBUTtBQUFBLEVBQ1gsWUFBWSxLQUFLLFlBQVksRUFBRSxXQUFXLE1BQU0sZ0JBQWdCLElBQUk7QUFBQSxJQUNsRSxVQUFVO0FBQUEsSUFDVixVQUFVO0FBQUEsRUFDWixDQUFDO0FBQUEsRUFDRCxLQUFLLEtBQUssS0FBSztBQUFBLEVBQ2YsWUFBWSxVQUFVLGNBQWMsRUFBRSxXQUFXLEdBQUcsTUFBTSxPQUFPLENBQUMsRUFDL0QsV0FBVyxFQUNYLFFBQVE7QUFBQSxFQUNYLE9BQU8sS0FBSyxPQUFPO0FBQUEsRUFDbkIsY0FBYyxVQUFVLGdCQUFnQixFQUFFLFdBQVcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxFQUNuRSxXQUFXLEVBQ1gsUUFBUTtBQUFBLEVBQ1gsY0FBYyxRQUFRLGNBQWMsRUFBRSxRQUFRLENBQUMsRUFBRSxRQUFRO0FBQzNELENBQUM7QUFFTSxJQUFNLGlCQUFpQjtBQUFBLEVBQzVCO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSSxLQUFLLElBQUksRUFBRSxjQUFjLEVBQUUsV0FBVztBQUFBLElBQzFDLE1BQU0sS0FBSyxNQUFNLEVBQUUsUUFBUTtBQUFBLElBQzNCLE1BQU0sS0FBSyxNQUFNLEVBQUUsUUFBUTtBQUFBLEVBQzdCO0FBQUEsRUFDQSxDQUFDLFVBQVU7QUFDVCxXQUFPO0FBQUEsTUFDTCxVQUFVLFlBQVksd0JBQXdCLEVBQUUsR0FBRyxNQUFNLElBQUk7QUFBQSxJQUMvRDtBQUFBLEVBQ0Y7QUFDRjtBQUVPLElBQU0sa0JBQWtCO0FBQUEsRUFDN0I7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJLEtBQUssSUFBSSxFQUFFLGNBQWMsRUFBRSxXQUFXO0FBQUEsSUFDMUMsTUFBTSxLQUFLLE1BQU0sRUFBRSxRQUFRO0FBQUEsRUFDN0I7QUFBQSxFQUNBLENBQUMsVUFBVTtBQUNULFdBQU87QUFBQSxNQUNMLFVBQVUsWUFBWSx3QkFBd0IsRUFBRSxHQUFHLE1BQU0sSUFBSTtBQUFBLElBQy9EO0FBQUEsRUFDRjtBQUNGO0FBRU8sSUFBTSxnQkFBZ0I7QUFBQSxFQUMzQjtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUksS0FBSyxJQUFJLEVBQUUsY0FBYyxFQUFFLFdBQVc7QUFBQSxJQUMxQyxPQUFPLEtBQUssT0FBTyxFQUFFLFFBQVE7QUFBQSxJQUM3QixTQUFTLFVBQVUsV0FBVyxFQUFFLFdBQVcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxFQUN6RCxXQUFXLEVBQ1gsUUFBUTtBQUFBLEVBQ2I7QUFBQSxFQUNBLENBQUMsVUFBVTtBQUNULFdBQU87QUFBQSxNQUNMLFdBQVcsWUFBWSx3QkFBd0IsRUFBRSxHQUFHLE1BQU0sS0FBSztBQUFBLElBQ2pFO0FBQUEsRUFDRjtBQUNGO0FBRU8sSUFBTSxZQUFZLFFBQVEsYUFBYTtBQUFBLEVBQzVDLElBQUksS0FBSyxJQUFJLEVBQUUsY0FBYyxFQUFFLFdBQVc7QUFBQSxFQUMxQyxhQUFhLEtBQUssYUFBYSxFQUFFLFFBQVE7QUFBQSxFQUN6QyxVQUFVLEtBQUssVUFBVSxFQUFFLFFBQVE7QUFBQSxFQUNuQyxXQUFXLFVBQVUsYUFBYSxFQUFFLFdBQVcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxFQUM3RCxXQUFXLEVBQ1gsUUFBUTtBQUNiLENBQUM7OztBRDVFRCxTQUFTLFVBQVU7QUFDbkIsU0FBUyxZQUFZO0FBRXJCLE9BQU8sT0FBTztBQUVkLElBQU0sbUJBQW1CLFFBQVEsSUFBSTtBQUNyQyxJQUFNLE1BQU0sU0FBUyxrQkFBb0IsRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUNuRCxJQUFNLEtBQUssUUFBUSxLQUFLLEVBQUUsUUFBUSxLQUFLLENBQUM7QUFFeEMsSUFBSSxhQUFhLE1BQU0sR0FBRyxPQUFPLEVBQUUsS0FBSyxlQUFlO0FBQ3ZELElBQUksY0FBYyxNQUFNO0FBQ3RCLE9BQUssQ0FBQztBQUNSO0FBQ0EsYUFBYTtBQUNiLFFBQVEsSUFBSSxVQUFVO0FBRXRCLGVBQWUsd0JBQXdCLFVBQXlCO0FBQzlELFVBQVEsSUFBSSxjQUFjLFNBQVMsSUFBSTtBQUN2QyxNQUFJLE1BQU0sTUFBTSxHQUNiLE9BQU8sRUFDUCxLQUFLLGFBQWEsRUFDbEIsTUFBTSxHQUFHLGNBQWMsWUFBWSxTQUFTLEVBQUUsQ0FBQyxFQUMvQyxRQUFRLGNBQWMsWUFBWTtBQUVyQyxRQUFNLEdBQUcsWUFBWSxPQUFPLE9BQU87QUFDakMsYUFBUyxJQUFJLEdBQUcsSUFBSSxJQUFJLFFBQVEsS0FBSztBQUNuQyxVQUFJLElBQUksTUFBTSxNQUFNO0FBQ2xCLGNBQU0sR0FDSCxPQUFPLGFBQWEsRUFDcEIsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQ3ZCLE1BQU0sR0FBRyxjQUFjLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUFBLE1BQzFDO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUVELFNBQU87QUFDVDtBQUVBLFdBQVcsWUFBWSxZQUFZO0FBQ2pDLFFBQU0sd0JBQXdCLFFBQVE7QUFDeEM7IiwKICAibmFtZXMiOiBbInJlcXVpcmUiXQp9Cg==
