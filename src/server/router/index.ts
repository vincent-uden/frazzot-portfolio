// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { galleryRouter } from "./gallery";
import { emailRouter } from "./email";
import { adminRouter } from "./admin";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("gallery.", galleryRouter)
  .merge("admin.", adminRouter)
  .merge("email.", emailRouter);

console.log(
  process.env.S3_ACCESS_KEY,
  process.env.S3_SECRET_KEY,
  process.env.S3_BUCKET_NAME,
  process.env.GMAIL_KEY,
  process.env.SHA_SECRET
);
// export type definition of API
export type AppRouter = typeof appRouter;
