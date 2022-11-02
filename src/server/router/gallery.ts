import { z } from "zod";
import * as jwt from "jsonwebtoken";
import { TRPCError } from "@trpc/server";

import { AuthJwt } from "./admin";
import { createRouter } from "./context";

export const galleryRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.galleryImage.findMany({include: {category: true}});
    },
  })
  .query("getAllCategories", {
    async resolve({ ctx }) {
      return await ctx.prisma.imageCategory.findMany();
    },
  })
  .middleware(async ({ ctx, next }) => {
    let token = ctx.req?.headers.session_token;
    if (token != null && typeof token === "string") {
      let server_token = await ctx.prisma.sessionToken.findUnique({
        where: {
          token,
        },
      });
      if (server_token == null || server_token!!.expires < new Date()) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      let decoded = jwt.verify(token, process.env.SHA_SECRET!!) as AuthJwt;
      if (decoded.authLevel == null || decoded.authLevel > 0) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }
    return next();
  })
  .mutation("insertOne", {
    input: z.object({
      name: z.string(),
      path: z.string(),
      w: z.number(),
      h: z.number(),
      thmb_w: z.number(),
      thmb_h: z.number(),
      categoryId: z.string().nullish(),
    }),
    resolve: async ({ input, ctx }) => {
      return await ctx.prisma.galleryImage.create({
        data: {
          name: input.name,
          path: input.path,
          w: input.w,
          h: input.h,
          thmb_w: input.thmb_w,
          thmb_h: input.thmb_h,
          categoryId: input.categoryId,
        },
      });
    },
  })
  .mutation("deleteAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.galleryImage.deleteMany();
    },
  })
  .mutation("deleteById", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.galleryImage.deleteMany({
        where: { id: { equals: input.id } },
      });
    },
  });
