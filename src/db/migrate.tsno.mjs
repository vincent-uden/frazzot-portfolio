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
      "file:///media/hdd/github/frazzot-portfolio/node_modules/tsno/dist/client.js"
    );
  },
});

// src/db/migrate.ts
init_client();
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
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
  uuid,
} from "drizzle-orm/pg-core";
var galleryImages = pgTable("GalleryImage", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  path: text("path").notNull(),
  w: integer("w").notNull(),
  h: integer("h").notNull(),
  thmb_w: integer("thmb_w").notNull(),
  thmb_h: integer("thmb_h").notNull(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
    .defaultNow()
    .notNull(),
  categoryId: uuid("categoryId").references(() => imageCategories.id, {
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
    id: uuid("id").defaultRandom().primaryKey(),
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
    id: uuid("id").defaultRandom().primaryKey(),
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
    id: uuid("id").defaultRandom().primaryKey(),
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
var blogLikes = pgTable("BlogLikes", {
  id: uuid("id").defaultRandom().primaryKey(),
  fingerprint: text("fingerprint").notNull(),
  blogPost: text("blogPost").notNull(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
    .defaultNow()
    .notNull(),
});

// src/db/migrate.ts
dotenv.config();
var connectionString = process.env.DATABASE_URL;
var sql = postgres(connectionString, { max: 1 });
var db = drizzle(sql, { logger: true });
console.log(await db.select().from(sessionTokens));
await migrate(db, { migrationsFolder: "drizzle" });
console.log("Migration Complete");
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL3Rzbm8vZGlzdC9jbGllbnQuanMiLCAic3JjL2RiL21pZ3JhdGUudHMiLCAic3JjL2RiL3NjaGVtYS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHtjcmVhdGVSZXF1aXJlIGFzIF9fJCRjcmVhdGVSZXF1aXJlfSBmcm9tICdtb2R1bGUnO3ZhciByZXF1aXJlPV9fJCRjcmVhdGVSZXF1aXJlKFwiZmlsZTovLy9tZWRpYS9oZGQvZ2l0aHViL2ZyYXp6b3QtcG9ydGZvbGlvL25vZGVfbW9kdWxlcy90c25vL2Rpc3QvY2xpZW50LmpzXCIpO1xuaW1wb3J0IHtcbiAgY29sb3JzXG59IGZyb20gXCIuL2NodW5rLUZIRFhYT0tZLmpzXCI7XG5cblxuLy8gc3JjL2NsaWVudC50c1xudmFyIGZldGNoID0gKHVybCwgaW5pdCkgPT4gaW1wb3J0KFwiLi9zcmMtNFE3UTY3QzMuanNcIikudGhlbigocmVzKSA9PiByZXMuZGVmYXVsdCh1cmwsIGluaXQpKTtcbnZhciBheGlvcyA9IChjb25maWcpID0+IGltcG9ydChcIi4vYXhpb3MtUElaNEM1VVouanNcIikudGhlbigocmVzKSA9PiByZXMuZGVmYXVsdChjb25maWcpKTtcbmV4cG9ydCB7XG4gIGF4aW9zLFxuICBjb2xvcnMsXG4gIGZldGNoXG59O1xuIiwgIi8vIHJ1biB3aXRoIFwibnB4IHRzbm8gc3JjL2RiL21pZ3JhdGUudHNcIlxuaW1wb3J0IHsgZHJpenpsZSB9IGZyb20gXCJkcml6emxlLW9ybS9wb3N0Z3Jlcy1qc1wiO1xuaW1wb3J0IHsgbWlncmF0ZSB9IGZyb20gXCJkcml6emxlLW9ybS9wb3N0Z3Jlcy1qcy9taWdyYXRvclwiO1xuaW1wb3J0IHBvc3RncmVzIGZyb20gXCJwb3N0Z3Jlc1wiO1xuaW1wb3J0IGRvdGVudiBmcm9tIFwiZG90ZW52XCI7XG5pbXBvcnQgeyBzZXNzaW9uVG9rZW5zIH0gZnJvbSBcIi4vc2NoZW1hXCI7XG5cbmRvdGVudi5jb25maWcoKTtcblxuY29uc3QgY29ubmVjdGlvblN0cmluZyA9IHByb2Nlc3MuZW52LkRBVEFCQVNFX1VSTDtcbmNvbnN0IHNxbCA9IHBvc3RncmVzKGNvbm5lY3Rpb25TdHJpbmchISwgeyBtYXg6IDEgfSk7XG5jb25zdCBkYiA9IGRyaXp6bGUoc3FsLCB7IGxvZ2dlcjogdHJ1ZSB9KTtcblxuY29uc29sZS5sb2coYXdhaXQgZGIuc2VsZWN0KCkuZnJvbShzZXNzaW9uVG9rZW5zKSk7XG5cbmF3YWl0IG1pZ3JhdGUoZGIsIHsgbWlncmF0aW9uc0ZvbGRlcjogXCJkcml6emxlXCIgfSk7XG5cbmNvbnNvbGUubG9nKFwiTWlncmF0aW9uIENvbXBsZXRlXCIpO1xuIiwgImltcG9ydCB7XG4gIHBnVGFibGUsXG4gIHRleHQsXG4gIGludGVnZXIsXG4gIHRpbWVzdGFtcCxcbiAgdW5pcXVlSW5kZXgsXG4gIHV1aWQsXG59IGZyb20gXCJkcml6emxlLW9ybS9wZy1jb3JlXCI7XG5cbmltcG9ydCB7IEluZmVyTW9kZWwsIHNxbCB9IGZyb20gXCJkcml6emxlLW9ybVwiO1xuXG5leHBvcnQgY29uc3QgZ2FsbGVyeUltYWdlcyA9IHBnVGFibGUoXCJHYWxsZXJ5SW1hZ2VcIiwge1xuICBpZDogdXVpZChcImlkXCIpLmRlZmF1bHRSYW5kb20oKS5wcmltYXJ5S2V5KCksXG4gIG5hbWU6IHRleHQoXCJuYW1lXCIpLm5vdE51bGwoKSxcbiAgcGF0aDogdGV4dChcInBhdGhcIikubm90TnVsbCgpLFxuICB3OiBpbnRlZ2VyKFwid1wiKS5ub3ROdWxsKCksXG4gIGg6IGludGVnZXIoXCJoXCIpLm5vdE51bGwoKSxcbiAgdGhtYl93OiBpbnRlZ2VyKFwidGhtYl93XCIpLm5vdE51bGwoKSxcbiAgdGhtYl9oOiBpbnRlZ2VyKFwidGhtYl9oXCIpLm5vdE51bGwoKSxcbiAgY3JlYXRlZEF0OiB0aW1lc3RhbXAoXCJjcmVhdGVkQXRcIiwgeyBwcmVjaXNpb246IDMsIG1vZGU6IFwiZGF0ZVwiIH0pXG4gICAgLmRlZmF1bHROb3coKVxuICAgIC5ub3ROdWxsKCksXG4gIGNhdGVnb3J5SWQ6IHV1aWQoXCJjYXRlZ29yeUlkXCIpLnJlZmVyZW5jZXMoKCkgPT4gaW1hZ2VDYXRlZ29yaWVzLmlkLCB7XG4gICAgb25EZWxldGU6IFwiY2FzY2FkZVwiLFxuICAgIG9uVXBkYXRlOiBcImNhc2NhZGVcIixcbiAgfSksXG4gIHVybDogdGV4dChcInVybFwiKSxcbiAgdXJsRXhwaXJlczogdGltZXN0YW1wKFwidXJsRXhwaXJlc1wiLCB7IHByZWNpc2lvbjogMywgbW9kZTogXCJkYXRlXCIgfSlcbiAgICAuZGVmYXVsdE5vdygpXG4gICAgLm5vdE51bGwoKSxcbiAgdXJsTGc6IHRleHQoXCJ1cmxMZ1wiKSxcbiAgdXJsTGdFeHBpcmVzOiB0aW1lc3RhbXAoXCJ1cmxMZ0V4cGlyZXNcIiwgeyBwcmVjaXNpb246IDMsIG1vZGU6IFwiZGF0ZVwiIH0pXG4gICAgLmRlZmF1bHROb3coKVxuICAgIC5ub3ROdWxsKCksXG4gIGRpc3BsYXlJbmRleDogaW50ZWdlcihcImRpc3BsYXlJbmRleFwiKS5kZWZhdWx0KDApLm5vdE51bGwoKSxcbn0pO1xuXG5leHBvcnQgY29uc3QgYWRtaW5QYXNzd29yZHMgPSBwZ1RhYmxlKFxuICBcIkFkbWluUGFzc3dvcmRcIixcbiAge1xuICAgIGlkOiB1dWlkKFwiaWRcIikuZGVmYXVsdFJhbmRvbSgpLnByaW1hcnlLZXkoKSxcbiAgICBuYW1lOiB0ZXh0KFwibmFtZVwiKS5ub3ROdWxsKCksXG4gICAgaGFzaDogdGV4dChcImhhc2hcIikubm90TnVsbCgpLFxuICB9LFxuICAodGFibGUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZV9rZXk6IHVuaXF1ZUluZGV4KFwiQWRtaW5QYXNzd29yZF9uYW1lX2tleVwiKS5vbih0YWJsZS5uYW1lKSxcbiAgICB9O1xuICB9XG4pO1xuXG5leHBvcnQgY29uc3QgaW1hZ2VDYXRlZ29yaWVzID0gcGdUYWJsZShcbiAgXCJJbWFnZUNhdGVnb3J5XCIsXG4gIHtcbiAgICBpZDogdXVpZChcImlkXCIpLmRlZmF1bHRSYW5kb20oKS5wcmltYXJ5S2V5KCksXG4gICAgbmFtZTogdGV4dChcIm5hbWVcIikubm90TnVsbCgpLFxuICB9LFxuICAodGFibGUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZV9rZXk6IHVuaXF1ZUluZGV4KFwiSW1hZ2VDYXRlZ29yeV9uYW1lX2tleVwiKS5vbih0YWJsZS5uYW1lKSxcbiAgICB9O1xuICB9XG4pO1xuXG5leHBvcnQgY29uc3Qgc2Vzc2lvblRva2VucyA9IHBnVGFibGUoXG4gIFwiU2Vzc2lvblRva2VuXCIsXG4gIHtcbiAgICBpZDogdXVpZChcImlkXCIpLmRlZmF1bHRSYW5kb20oKS5wcmltYXJ5S2V5KCksXG4gICAgdG9rZW46IHRleHQoXCJ0b2tlblwiKS5ub3ROdWxsKCksXG4gICAgZXhwaXJlczogdGltZXN0YW1wKFwiZXhwaXJlc1wiLCB7IHByZWNpc2lvbjogMywgbW9kZTogXCJkYXRlXCIgfSlcbiAgICAgIC5kZWZhdWx0Tm93KClcbiAgICAgIC5ub3ROdWxsKCksXG4gIH0sXG4gICh0YWJsZSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICB0b2tlbl9rZXk6IHVuaXF1ZUluZGV4KFwiU2Vzc2lvblRva2VuX3Rva2VuX2tleVwiKS5vbih0YWJsZS50b2tlbiksXG4gICAgfTtcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IGJsb2dMaWtlcyA9IHBnVGFibGUoXG4gIFwiQmxvZ0xpa2VzXCIsXG4gIHtcbiAgICBpZDogdXVpZChcImlkXCIpLmRlZmF1bHRSYW5kb20oKS5wcmltYXJ5S2V5KCksXG4gICAgZmluZ2VycHJpbnQ6IHRleHQoXCJmaW5nZXJwcmludFwiKS5ub3ROdWxsKCksXG4gICAgYmxvZ1Bvc3Q6IHRleHQoXCJibG9nUG9zdFwiKS5ub3ROdWxsKCksXG4gICAgY3JlYXRlZEF0OiB0aW1lc3RhbXAoXCJjcmVhdGVkQXRcIiwgeyBwcmVjaXNpb246IDMsIG1vZGU6IFwiZGF0ZVwiIH0pLmRlZmF1bHROb3coKS5ub3ROdWxsKCksXG4gIH0sXG4pO1xuXG5leHBvcnQgdHlwZSBHYWxsZXJ5SW1hZ2UgPSBJbmZlck1vZGVsPHR5cGVvZiBnYWxsZXJ5SW1hZ2VzPjtcbmV4cG9ydCB0eXBlIEFkbWluUGFzc3dvcmQgPSBJbmZlck1vZGVsPHR5cGVvZiBhZG1pblBhc3N3b3Jkcz47XG5leHBvcnQgdHlwZSBJbWFnZUNhdGVnb3J5ID0gSW5mZXJNb2RlbDx0eXBlb2YgaW1hZ2VDYXRlZ29yaWVzPjtcbmV4cG9ydCB0eXBlIFNlc3Npb25Ub2tlbiA9IEluZmVyTW9kZWw8dHlwZW9mIHNlc3Npb25Ub2tlbnM+O1xuZXhwb3J0IHR5cGUgQmxvZ0xpa2UgPSBJbmZlck1vZGVsPHR5cGVvZiBibG9nTGlrZXM+O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7OztBQUFBLFNBQVEsaUJBQWlCLHlCQUF3QjtBQUFqRCxJQUE4REE7QUFBOUQ7QUFBQTtBQUEwRCxJQUFJQSxXQUFRLGtCQUFrQiw2RUFBNkU7QUFBQTtBQUFBOzs7QUNBcks7QUFDQSxTQUFTLGVBQWU7QUFDeEIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sY0FBYztBQUNyQixPQUFPLFlBQVk7OztBQ0puQjtBQUFBO0FBQUEsRUFDRTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsT0FDSztBQUlBLElBQU0sZ0JBQWdCLFFBQVEsZ0JBQWdCO0FBQUEsRUFDbkQsSUFBSSxLQUFLLElBQUksRUFBRSxjQUFjLEVBQUUsV0FBVztBQUFBLEVBQzFDLE1BQU0sS0FBSyxNQUFNLEVBQUUsUUFBUTtBQUFBLEVBQzNCLE1BQU0sS0FBSyxNQUFNLEVBQUUsUUFBUTtBQUFBLEVBQzNCLEdBQUcsUUFBUSxHQUFHLEVBQUUsUUFBUTtBQUFBLEVBQ3hCLEdBQUcsUUFBUSxHQUFHLEVBQUUsUUFBUTtBQUFBLEVBQ3hCLFFBQVEsUUFBUSxRQUFRLEVBQUUsUUFBUTtBQUFBLEVBQ2xDLFFBQVEsUUFBUSxRQUFRLEVBQUUsUUFBUTtBQUFB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
