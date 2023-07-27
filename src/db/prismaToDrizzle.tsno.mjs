import { createRequire as __$$createRequireN } from "module";
var require = __$$createRequireN(import.meta.url);
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) =>
  function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])((fn = 0))), res;
  };

// node_modules/tsno/dist/client.js
import { createRequire as __$$createRequire } from "module";
var require2;
var init_client = __esm({
  "node_modules/tsno/dist/client.js"() {
    require2 = __$$createRequire(
      "file://E:\\Github\\frazzot-portfolio\\node_modules\\tsno\\dist\\client.js"
    );
  },
});

// src/db/prismaToDrizzle.ts
init_client();

// src/server/db/client.ts
init_client();
import { PrismaClient } from "@prisma/client";
var prisma =
  global.prisma ||
  new PrismaClient({
    log: ["error"],
  });
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

// src/db/drizzle.ts
init_client();
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
var drizzle_client =
  global.drizzle_client || postgres(process.env.DATABASE_URL);
var db = global.db || drizzle(drizzle_client);

// src/db/prismaToDrizzle.ts
import "dotenv/config";

// src/db/schema.ts
init_client();
import {
  pgTable,
  text,
  integer,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
var galleryImages = pgTable("GalleryImage", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  path: text("path").notNull(),
  w: integer("w").notNull(),
  h: integer("h").notNull(),
  thmb_w: integer("thmb_w").notNull(),
  thmb_h: integer("thmb_h").notNull(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
    .defaultNow()
    .notNull(),
  categoryId: text("categoryId").references(() => imageCategories.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  url: text("url"),
  urlExpires: timestamp("urlExpires", { precision: 3, mode: "date" })
    .defaultNow()
    .notNull(),
  urlLg: text("urlLg"),
  urlLgExpires: timestamp("urlLgExpires", { precision: 3, mode: "date" })
    .defaultNow()
    .notNull(),
  displayIndex: integer("displayIndex").default(0).notNull(),
});
var adminPasswords = pgTable(
  "AdminPassword",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    hash: text("hash").notNull(),
  },
  (table) => {
    return {
      name_key: uniqueIndex("AdminPassword_name_key").on(table.name),
    };
  }
);
var imageCategories = pgTable(
  "ImageCategory",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
  },
  (table) => {
    return {
      name_key: uniqueIndex("ImageCategory_name_key").on(table.name),
    };
  }
);
var sessionTokens = pgTable(
  "SessionToken",
  {
    id: text("id").primaryKey().notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { precision: 3, mode: "date" })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      token_key: uniqueIndex("SessionToken_token_key").on(table.token),
    };
  }
);

// src/db/prismaToDrizzle.ts
console.log(process.env.DATABASE_URL_SUPABASE);
var categories = await prisma.imageCategory.findMany();
var images = await prisma.galleryImage.findMany();
var pws = await prisma.adminPassword.findMany();
var sessionTokens2 = await prisma.sessionToken.findMany();
console.log(images);
await db.insert(imageCategories).values(categories);
await db.insert(galleryImages).values(images);
await db.insert(adminPasswords).values(pws);
await db.insert(sessionTokens).values(sessionTokens2);
console.log(await db.select().from(galleryImages));
console.log(await db.select().from(adminPasswords));
console.log(await db.select().from(sessionTokens));
console.log(await db.select().from(imageCategories));
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL3Rzbm8vZGlzdC9jbGllbnQuanMiLCAic3JjL2RiL3ByaXNtYVRvRHJpenpsZS50cyIsICJzcmMvc2VydmVyL2RiL2NsaWVudC50cyIsICJzcmMvZGIvZHJpenpsZS50cyIsICJzcmMvZGIvc2NoZW1hLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQge2NyZWF0ZVJlcXVpcmUgYXMgX18kJGNyZWF0ZVJlcXVpcmV9IGZyb20gJ21vZHVsZSc7dmFyIHJlcXVpcmU9X18kJGNyZWF0ZVJlcXVpcmUoXCJmaWxlOi8vRTpcXFxcR2l0aHViXFxcXGZyYXp6b3QtcG9ydGZvbGlvXFxcXG5vZGVfbW9kdWxlc1xcXFx0c25vXFxcXGRpc3RcXFxcY2xpZW50LmpzXCIpO1xuaW1wb3J0IHtcbiAgY29sb3JzXG59IGZyb20gXCIuL2NodW5rLUZIRFhYT0tZLmpzXCI7XG5cblxuLy8gc3JjL2NsaWVudC50c1xudmFyIGZldGNoID0gKHVybCwgaW5pdCkgPT4gaW1wb3J0KFwiLi9zcmMtNFE3UTY3QzMuanNcIikudGhlbigocmVzKSA9PiByZXMuZGVmYXVsdCh1cmwsIGluaXQpKTtcbnZhciBheGlvcyA9IChjb25maWcpID0+IGltcG9ydChcIi4vYXhpb3MtUElaNEM1VVouanNcIikudGhlbigocmVzKSA9PiByZXMuZGVmYXVsdChjb25maWcpKTtcbmV4cG9ydCB7XG4gIGF4aW9zLFxuICBjb2xvcnMsXG4gIGZldGNoXG59O1xuIiwgImltcG9ydCB7IHByaXNtYSB9IGZyb20gXCIuLi9zZXJ2ZXIvZGIvY2xpZW50XCI7XHJcbmltcG9ydCB7IGRiIH0gZnJvbSBcIi4vZHJpenpsZVwiO1xyXG5pbXBvcnQgXCJkb3RlbnYvY29uZmlnXCI7XHJcbmltcG9ydCAqIGFzIGRTY2hlbWEgZnJvbSBcIi4vc2NoZW1hXCI7XHJcbmltcG9ydCB7IEdhbGxlcnlJbWFnZSB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xyXG5cclxuY29uc29sZS5sb2cocHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMX1NVUEFCQVNFKTtcclxubGV0IGNhdGVnb3JpZXMgPSBhd2FpdCBwcmlzbWEuaW1hZ2VDYXRlZ29yeS5maW5kTWFueSgpO1xyXG5sZXQgaW1hZ2VzID0gYXdhaXQgcHJpc21hLmdhbGxlcnlJbWFnZS5maW5kTWFueSgpO1xyXG5sZXQgcHdzID0gYXdhaXQgcHJpc21hLmFkbWluUGFzc3dvcmQuZmluZE1hbnkoKTtcclxubGV0IHNlc3Npb25Ub2tlbnMgPSBhd2FpdCBwcmlzbWEuc2Vzc2lvblRva2VuLmZpbmRNYW55KCk7XHJcblxyXG5jb25zb2xlLmxvZyhpbWFnZXMpO1xyXG5cclxuYXdhaXQgZGIuaW5zZXJ0KGRTY2hlbWEuaW1hZ2VDYXRlZ29yaWVzKS52YWx1ZXMoY2F0ZWdvcmllcyk7XHJcbmF3YWl0IGRiLmluc2VydChkU2NoZW1hLmdhbGxlcnlJbWFnZXMpLnZhbHVlcyhpbWFnZXMpO1xyXG5hd2FpdCBkYi5pbnNlcnQoZFNjaGVtYS5hZG1pblBhc3N3b3JkcykudmFsdWVzKHB3cyk7XHJcbmF3YWl0IGRiLmluc2VydChkU2NoZW1hLnNlc3Npb25Ub2tlbnMpLnZhbHVlcyhzZXNzaW9uVG9rZW5zKTtcclxuXHJcbmNvbnNvbGUubG9nKGF3YWl0IGRiLnNlbGVjdCgpLmZyb20oZFNjaGVtYS5nYWxsZXJ5SW1hZ2VzKSk7XHJcbmNvbnNvbGUubG9nKGF3YWl0IGRiLnNlbGVjdCgpLmZyb20oZFNjaGVtYS5hZG1pblBhc3N3b3JkcykpO1xyXG5jb25zb2xlLmxvZyhhd2FpdCBkYi5zZWxlY3QoKS5mcm9tKGRTY2hlbWEuc2Vzc2lvblRva2VucykpO1xyXG5jb25zb2xlLmxvZyhhd2FpdCBkYi5zZWxlY3QoKS5mcm9tKGRTY2hlbWEuaW1hZ2VDYXRlZ29yaWVzKSk7XHJcbiIsICIvLyBzcmMvc2VydmVyL2RiL2NsaWVudC50c1xuaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgdmFyIHByaXNtYTogUHJpc21hQ2xpZW50IHwgdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgY29uc3QgcHJpc21hID1cbiAgZ2xvYmFsLnByaXNtYSB8fFxuICBuZXcgUHJpc21hQ2xpZW50KHtcbiAgICBsb2c6IFtcImVycm9yXCJdLFxuICB9KTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBnbG9iYWwucHJpc21hID0gcHJpc21hO1xufVxuIiwgImltcG9ydCB7IFBvc3RncmVzSnNEYXRhYmFzZSwgZHJpenpsZSB9IGZyb20gXCJkcml6emxlLW9ybS9wb3N0Z3Jlcy1qc1wiO1xyXG5pbXBvcnQgcG9zdGdyZXMgZnJvbSBcInBvc3RncmVzXCI7XHJcblxyXG5kZWNsYXJlIGdsb2JhbCB7XHJcbiAgICB2YXIgZHJpenpsZV9jbGllbnQ6IHBvc3RncmVzLlNxbCB8IHVuZGVmaW5lZDtcclxuICAgIHZhciBkYjogUG9zdGdyZXNKc0RhdGFiYXNlPFJlY29yZDxzdHJpbmcsIG5ldmVyPj4gfCB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmNvbnN0IGRyaXp6bGVfY2xpZW50ID0gZ2xvYmFsLmRyaXp6bGVfY2xpZW50IHx8IHBvc3RncmVzKHByb2Nlc3MuZW52LkRBVEFCQVNFX1VSTCEhKTtcclxuZXhwb3J0IGNvbnN0IGRiID0gZ2xvYmFsLmRiIHx8IGRyaXp6bGUoZHJpenpsZV9jbGllbnQpOyIsICJpbXBvcnQge1xuICBwZ1RhYmxlLFxuICB0ZXh0LFxuICBpbnRlZ2VyLFxuICB0aW1lc3RhbXAsXG4gIHVuaXF1ZUluZGV4LFxufSBmcm9tIFwiZHJpenpsZS1vcm0vcGctY29yZVwiO1xuXG5pbXBvcnQgeyBJbmZlck1vZGVsLCBzcWwgfSBmcm9tIFwiZHJpenpsZS1vcm1cIjtcblxuZXhwb3J0IGNvbnN0IGdhbGxlcnlJbWFnZXMgPSBwZ1RhYmxlKFwiR2FsbGVyeUltYWdlXCIsIHtcbiAgaWQ6IHRleHQoXCJpZFwiKS5wcmltYXJ5S2V5KCkubm90TnVsbCgpLFxuICBuYW1lOiB0ZXh0KFwibmFtZVwiKS5ub3ROdWxsKCksXG4gIHBhdGg6IHRleHQoXCJwYXRoXCIpLm5vdE51bGwoKSxcbiAgdzogaW50ZWdlcihcIndcIikubm90TnVsbCgpLFxuICBoOiBpbnRlZ2VyKFwiaFwiKS5ub3ROdWxsKCksXG4gIHRobWJfdzogaW50ZWdlcihcInRobWJfd1wiKS5ub3ROdWxsKCksXG4gIHRobWJfaDogaW50ZWdlcihcInRobWJfaFwiKS5ub3ROdWxsKCksXG4gIGNyZWF0ZWRBdDogdGltZXN0YW1wKFwiY3JlYXRlZEF0XCIsIHsgcHJlY2lzaW9uOiAzLCBtb2RlOiBcImRhdGVcIiB9KVxuICAgIC5kZWZhdWx0Tm93KClcbiAgICAubm90TnVsbCgpLFxuICBjYXRlZ29yeUlkOiB0ZXh0KFwiY2F0ZWdvcnlJZFwiKS5yZWZlcmVuY2VzKCgpID0+IGltYWdlQ2F0ZWdvcmllcy5pZCwge1xuICAgIG9uRGVsZXRlOiBcImNhc2NhZGVcIixcbiAgICBvblVwZGF0ZTogXCJjYXNjYWRlXCIsXG4gIH0pLFxuICB1cmw6IHRleHQoXCJ1cmxcIiksXG4gIHVybEV4cGlyZXM6IHRpbWVzdGFtcChcInVybEV4cGlyZXNcIiwgeyBwcmVjaXNpb246IDMsIG1vZGU6IFwiZGF0ZVwiIH0pXG4gICAgLmRlZmF1bHROb3coKVxuICAgIC5ub3ROdWxsKCksXG4gIHVybExnOiB0ZXh0KFwidXJsTGdcIiksXG4gIHVybExnRXhwaXJlczogdGltZXN0YW1wKFwidXJsTGdFeHBpcmVzXCIsIHsgcHJlY2lzaW9uOiAzLCBtb2RlOiBcImRhdGVcIiB9KVxuICAgIC5kZWZhdWx0Tm93KClcbiAgICAubm90TnVsbCgpLFxuICBkaXNwbGF5SW5kZXg6IGludGVnZXIoXCJkaXNwbGF5SW5kZXhcIikuZGVmYXVsdCgwKS5ub3ROdWxsKCksXG59KTtcblxuZXhwb3J0IGNvbnN0IGFkbWluUGFzc3dvcmRzID0gcGdUYWJsZShcbiAgXCJBZG1pblBhc3N3b3JkXCIsXG4gIHtcbiAgICBpZDogdGV4dChcImlkXCIpLnByaW1hcnlLZXkoKS5ub3ROdWxsKCksXG4gICAgbmFtZTogdGV4dChcIm5hbWVcIikubm90TnVsbCgpLFxuICAgIGhhc2g6IHRleHQoXCJoYXNoXCIpLm5vdE51bGwoKSxcbiAgfSxcbiAgKHRhYmxlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWVfa2V5OiB1bmlxdWVJbmRleChcIkFkbWluUGFzc3dvcmRfbmFtZV9rZXlcIikub24odGFibGUubmFtZSksXG4gICAgfTtcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IGltYWdlQ2F0ZWdvcmllcyA9IHBnVGFibGUoXG4gIFwiSW1hZ2VDYXRlZ29yeVwiLFxuICB7XG4gICAgaWQ6IHRleHQoXCJpZFwiKS5wcmltYXJ5S2V5KCkubm90TnVsbCgpLFxuICAgIG5hbWU6IHRleHQoXCJuYW1lXCIpLm5vdE51bGwoKSxcbiAgfSxcbiAgKHRhYmxlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWVfa2V5OiB1bmlxdWVJbmRleChcIkltYWdlQ2F0ZWdvcnlfbmFtZV9rZXlcIikub24odGFibGUubmFtZSksXG4gICAgfTtcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IHNlc3Npb25Ub2tlbnMgPSBwZ1RhYmxlKFxuICBcIlNlc3Npb25Ub2tlblwiLFxuICB7XG4gICAgaWQ6IHRleHQoXCJpZFwiKS5wcmltYXJ5S2V5KCkubm90TnVsbCgpLFxuICAgIHRva2VuOiB0ZXh0KFwidG9rZW5cIikubm90TnVsbCgpLFxuICAgIGV4cGlyZXM6IHRpbWVzdGFtcChcImV4cGlyZXNcIiwgeyBwcmVjaXNpb246IDMsIG1vZGU6IFwiZGF0ZVwiIH0pXG4gICAgICAuZGVmYXVsdE5vdygpXG4gICAgICAubm90TnVsbCgpLFxuICB9LFxuICAodGFibGUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgdG9rZW5fa2V5OiB1bmlxdWVJbmRleChcIlNlc3Npb25Ub2tlbl90b2tlbl9rZXlcIikub24odGFibGUudG9rZW4pLFxuICAgIH07XG4gIH1cbik7XG5cbmV4cG9ydCB0eXBlIEdhbGxlcnlJbWFnZSA9IEluZmVyTW9kZWw8dHlwZW9mIGdhbGxlcnlJbWFnZXM+O1xuZXhwb3J0IHR5cGUgQWRtaW5QYXNzd29yZCA9IEluZmVyTW9kZWw8dHlwZW9mIGFkbWluUGFzc3dvcmRzPjtcbmV4cG9ydCB0eXBlIEltYWdlQ2F0ZWdvcnkgPSBJbmZlck1vZGVsPHR5cGVvZiBpbWFnZUNhdGVnb3JpZXM+O1xuZXhwb3J0IHR5cGUgU2Vzc2lvblRva2VuID0gSW5mZXJNb2RlbDx0eXBlb2Ygc2Vzc2lvblRva2Vucz47Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7OztBQUFBLFNBQVEsaUJBQWlCLHlCQUF3QjtBQUFqRCxJQUE4REE7QUFBOUQ7QUFBQTtBQUEwRCxJQUFJQSxXQUFRLGtCQUFrQiwyRUFBMkU7QUFBQTtBQUFBOzs7QUNBbks7OztBQ0FBO0FBQ0EsU0FBUyxvQkFBb0I7QUFNdEIsSUFBTSxTQUNYLE9BQU8sVUFDUCxJQUFJLGFBQWE7QUFBQSxFQUNmLEtBQUssQ0FBQyxPQUFPO0FBQ2YsQ0FBQztBQUVILElBQUksUUFBUSxJQUFJLGFBQWEsY0FBYztBQUN6QyxTQUFPLFNBQVM7QUFDbEI7OztBQ2ZBO0FBQUEsU0FBNkIsZUFBZTtBQUM1QyxPQUFPLGNBQWM7QUFPckIsSUFBTSxpQkFBaUIsT0FBTyxrQkFBa0IsU0FBUyxRQUFRLElBQUksWUFBYztBQUM1RSxJQUFNLEtBQUssT0FBTyxNQUFNLFFBQVEsY0FBYzs7O0FGUHJELE9BQU87OztBR0ZQO0FBQUE7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE9BQ0s7QUFJQSxJQUFNLGdCQUFnQixRQUFRLGdCQUFnQjtBQUFBLEVBQ25ELElBQUksS0FBSyxJQUFJLEVBQUUsV0FBVyxFQUFFLFFBQVE7QUFBQSxFQUNwQyxNQUFNLEtBQUssTUFBTSxFQUFFLFFBQVE7QUFBQSxFQUMzQixNQUFNLEtBQUssTUFBTSxFQUFFLFFBQVE7QUFBQSxFQUMzQixHQUFHLFFBQVEsR0FBRyxFQUFFLFFBQVE7QUFBQSxFQUN4QixHQUFHLFFBQVEsR0FBRyxFQUFFLFFBQVE7QUFBQSxFQUN4QixRQUFRLFFBQVEsUUFBUSxFQUFFLFFBQVE7QUFBQSxFQUNsQyxRQUFRLFFBQVEsUUFBUSxFQUFFLFFBQVE7QUFBQSxFQUNsQyxXQUFXLFVBQVUsYUFBYSxFQUFFLFdBQVcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxFQUM3RCxXQUFXLEVBQ1gsUUFBUTtBQUFBLEVBQ1gsWUFBWSxLQUFLLFlBQVksRUFBRSxXQUFXLE1BQU0sZ0JBQWdCLElBQUk7QUFBQSxJQUNsRSxVQUFVO0FBQUEsSUFDVixVQUFVO0FBQUEsRUFDWixDQUFDO0FBQUEsRUFDRCxLQUFLLEtBQUssS0FBSztBQUFBLEVBQ2YsWUFBWSxVQUFVLGNBQWMsRUFBRSxXQUFXLEdBQUcsTUFBTSxPQUFPLENBQUMsRUFDL0QsV0FBVyxFQUNYLFFBQVE7QUFBQSxFQUNYLE9BQU8sS0FBSyxPQUFPO0FBQUEsRUFDbkIsY0FBYyxVQUFVLGdCQUFnQixFQUFFLFdBQVcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxFQUNuRSxXQUFXLEVBQ1gsUUFBUTtBQUFBLEVBQ1gsY0FBYyxRQUFRLGNBQWMsRUFBRSxRQUFRLENBQUMsRUFBRSxRQUFRO0FBQzNELENBQUM7QUFFTSxJQUFNLGlCQUFpQjtBQUFBLEVBQzVCO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSSxLQUFLLElBQUksRUFBRSxXQUFXLEVBQUUsUUFBUTtBQUFBLElBQ3BDLE1BQU0sS0FBSyxNQUFNLEVBQUUsUUFBUTtBQUFBLElBQzNCLE1BQU0sS0FBSyxNQUFNLEVBQUUsUUFBUTtBQUFBLEVBQzdCO0FBQUEsRUFDQSxDQUFDLFVBQVU7QUFDVCxXQUFPO0FBQUEsTUFDTCxVQUFVLFlBQVksd0JBQXdCLEVBQUUsR0FBRyxNQUFNLElBQUk7QUFBQSxJQUMvRDtBQUFBLEVBQ0Y7QUFDRjtBQUVPLElBQU0sa0JBQWtCO0FBQUEsRUFDN0I7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJLEtBQUssSUFBSSxFQUFFLFdBQVcsRUFBRSxRQUFRO0FBQUEsSUFDcEMsTUFBTSxLQUFLLE1BQU0sRUFBRSxRQUFRO0FBQUEsRUFDN0I7QUFBQSxFQUNBLENBQUMsVUFBVTtBQUNULFdBQU87QUFBQSxNQUNMLFVBQVUsWUFBWSx3QkFBd0IsRUFBRSxHQUFHLE1BQU0sSUFBSTtBQUFBLElBQy9EO0FBQUEsRUFDRjtBQUNGO0FBRU8sSUFBTSxnQkFBZ0I7QUFBQSxFQUMzQjtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUksS0FBSyxJQUFJLEVBQUUsV0FBVyxFQUFFLFFBQVE7QUFBQSxJQUNwQyxPQUFPLEtBQUssT0FBTyxFQUFFLFFBQVE7QUFBQSxJQUM3QixTQUFTLFVBQVUsV0FBVyxFQUFFLFdBQVcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxFQUN6RCxXQUFXLEVBQ1gsUUFBUTtBQUFBLEVBQ2I7QUFBQSxFQUNBLENBQUMsVUFBVTtBQUNULFdBQU87QUFBQSxNQUNMLFdBQVcsWUFBWSx3QkFBd0IsRUFBRSxHQUFHLE1BQU0sS0FBSztBQUFBLElBQ2pFO0FBQUEsRUFDRjtBQUNGOzs7QUh2RUEsUUFBUSxJQUFJLFFBQVEsSUFBSSxxQkFBcUI7QUFDN0MsSUFBSSxhQUFhLE1BQU0sT0FBTyxjQUFjLFNBQVM7QUFDckQsSUFBSSxTQUFTLE1BQU0sT0FBTyxhQUFhLFNBQVM7QUFDaEQsSUFBSSxNQUFNLE1BQU0sT0FBTyxjQUFjLFNBQVM7QUFDOUMsSUFBSUMsaUJBQWdCLE1BQU0sT0FBTyxhQUFhLFNBQVM7QUFFdkQsUUFBUSxJQUFJLE1BQU07QUFFbEIsTUFBTSxHQUFHLE9BQWUsZUFBZSxFQUFFLE9BQU8sVUFBVTtBQUMxRCxNQUFNLEdBQUcsT0FBZSxhQUFhLEVBQUUsT0FBTyxNQUFNO0FBQ3BELE1BQU0sR0FBRyxPQUFlLGNBQWMsRUFBRSxPQUFPLEdBQUc7QUFDbEQsTUFBTSxHQUFHLE9BQWUsYUFBYSxFQUFFLE9BQU9BLGNBQWE7QUFFM0QsUUFBUSxJQUFJLE1BQU0sR0FBRyxPQUFPLEVBQUUsS0FBYSxhQUFhLENBQUM7QUFDekQsUUFBUSxJQUFJLE1BQU0sR0FBRyxPQUFPLEVBQUUsS0FBYSxjQUFjLENBQUM7QUFDMUQsUUFBUSxJQUFJLE1BQU0sR0FBRyxPQUFPLEVBQUUsS0FBYSxhQUFhLENBQUM7QUFDekQsUUFBUSxJQUFJLE1BQU0sR0FBRyxPQUFPLEVBQUUsS0FBYSxlQUFlLENBQUM7IiwKICAibmFtZXMiOiBbInJlcXVpcmUiLCAic2Vzc2lvblRva2VucyJdCn0K
