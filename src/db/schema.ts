import {
  pgTable,
  text,
  integer,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { InferModel, sql } from "drizzle-orm";

export const galleryImages = pgTable("GalleryImage", {
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

export const adminPasswords = pgTable(
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

export const imageCategories = pgTable(
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

export const sessionTokens = pgTable(
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

export const blogLikes = pgTable("BlogLikes", {
  id: uuid("id").defaultRandom().primaryKey(),
  fingerprint: text("fingerprint").notNull(),
  blogPost: text("blogPost").notNull(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
    .defaultNow()
    .notNull(),
});

export type GalleryImage = InferModel<typeof galleryImages>;
export type AdminPassword = InferModel<typeof adminPasswords>;
export type ImageCategory = InferModel<typeof imageCategories>;
export type SessionToken = InferModel<typeof sessionTokens>;
export type BlogLike = InferModel<typeof blogLikes>;
