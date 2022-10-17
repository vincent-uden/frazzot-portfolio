// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { galleryRouter } from "./gallery";
import { emailRouter } from "./email";
import { adminRouter } from "./admin";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("auth.", authRouter)
  .merge("gallery.", galleryRouter)
  .merge("admin.", adminRouter)
  .merge("email.", emailRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
