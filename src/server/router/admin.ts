import * as argon2 from "argon2";
import { z } from "zod";
import { EmailError } from "../../utils/errortypes";
import { createRouter } from "./context";
import * as jwt from "jsonwebtoken";
import { db } from "../../db/drizzle";
import { adminPasswords, sessionTokens, blogLikes } from "../../db/schema";
import { eq, sql } from "drizzle-orm";

export interface AuthJwt {
  authLevel: number;
  iat: number;
}

export const adminRouter = createRouter()
  .query("getLikes", {
    input: z.object({
      blogPost: z.string(),
    }),
    resolve: async ({ input }) => {
      return await db
        .select({ count: sql<number>`count(*)` })
        .from(blogLikes)
        .where(eq(blogLikes.blogPost, input.blogPost));
    },
  })
  .mutation("like", {
    input: z.object({
      fingerprint: z.string(),
      blogPost: z.string(),
    }),
    resolve: async ({ input }) => {
      const matchingLikes = db.select().from(blogLikes).where(eq(blogLikes.fingerprint, input.fingerprint));
    },
  })
  .mutation("submitLogin", {
    input: z.object({
      name: z.string(),
      password: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      let errors = [];
      let token = "";
      if (input.name === "") {
        errors.push(EmailError.EmptyName);
      }
      if (input.password === "") {
        errors.push(EmailError.EmptyPassword);
      }
      if (errors.length === 0) {
        let users = await db
          .select()
          .from(adminPasswords)
          .where(eq(adminPasswords.name, input.name))
          .limit(1);
        if (users.length == 0) {
          errors.push(EmailError.IncorrectUserDetails);
        } else {
          let user = users[0]!!;
          if (await argon2.verify(user.hash, input.password)) {
            token = jwt.sign({ authLevel: 0 }, process.env.SHA_SECRET!!);

            let expires = new Date();
            expires.setHours(expires.getHours() + 2);
            // WHY IS THIS INSERT NOT WORKING AND THINK IT NEEDS AN ID????
            await db.insert(sessionTokens).values({
              token: token,
              expires: expires,
            });
          } else {
            errors.push(EmailError.IncorrectUserDetails);
          }
        }
      }

      return {
        errors,
        token,
      };
    },
  });
