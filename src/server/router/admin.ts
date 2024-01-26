import * as argon2 from "argon2";
import { z } from "zod";
import { EmailError } from "../../utils/errortypes";
import { createRouter } from "./context";
import * as jwt from "jsonwebtoken";
import { db } from "../../db/drizzle";
import { adminPasswords, sessionTokens, blogLikes } from "../../db/schema";
import { and, eq, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const AuthJwtSchema = z.object({
  authLevel: z.number().int(),
  expires: z.coerce.date(),
  userId: z.string().uuid(),
});

export type AuthJwt = z.infer<typeof AuthJwtSchema>;

export function authenticate(token: string) {
    const decoded = AuthJwtSchema.parse(
      jwt.verify(token, process.env.SHA_SECRET!!)
    );

    if (decoded.expires < new Date()) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Session token has expired",
      });
    }

    return decoded;
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
  .query("hasLiked", {
    input: z.object({
      fingerprint: z.string(),
      blogPost: z.string(),
    }),
    resolve: async ({ input }) => {
      const matchingLikes = await db
        .select()
        .from(blogLikes)
        .where(
          and(
            eq(blogLikes.fingerprint, input.fingerprint),
            eq(blogLikes.blogPost, input.blogPost)
          )
        );
      return matchingLikes.length > 0;
    },
  })
  .mutation("like", {
    input: z.object({
      fingerprint: z.string(),
      blogPost: z.string(),
    }),
    resolve: async ({ input }) => {
      const matchingLikes = await db
        .select()
        .from(blogLikes)
        .where(
          and(
            eq(blogLikes.fingerprint, input.fingerprint),
            eq(blogLikes.blogPost, input.blogPost)
          )
        );

      if (matchingLikes.length == 0) {
        await db
          .insert(blogLikes)
          .values({ blogPost: input.blogPost, fingerprint: input.fingerprint });
      }
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
            let expires = new Date();
            expires.setDate(expires.getDate() + 30);
            const toEncode: AuthJwt = {
                authLevel: 0,
                expires,
                userId: user.id,
            };
            token = jwt.sign(toEncode, process.env.SHA_SECRET!!);
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
