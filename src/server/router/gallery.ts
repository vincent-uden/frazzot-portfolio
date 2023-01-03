import { z } from "zod";
import * as jwt from "jsonwebtoken";
import { TRPCError } from "@trpc/server";

import { AuthJwt } from "./admin";
import { createRouter } from "./context";
import { S3 } from "aws-sdk";

const s3 = new S3({
  region: process.env.S3_REGION,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  signatureVersion: "v4",
});

export const galleryRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.galleryImage.findMany({
        include: { category: true },
      });
    },
  })
  .query("getImages", {
    input: z.object({
      categoryName: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      let category = await ctx.prisma.imageCategory.findUnique({
        where: {
          name: input.categoryName,
        },
      });
      return await ctx.prisma.galleryImage.findMany({
        where: {
          categoryId: category!!.id,
        },
        include: {
          category: true,
        },
      });
    },
  })
  .query("getAllCategories", {
    async resolve({ ctx }) {
      return await ctx.prisma.imageCategory.findMany();
    },
  })
  .query("getCategory", {
    input: z.object({
      name: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      return await ctx.prisma.imageCategory.findUnique({
        where: { name: input.name },
      });
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
  })
  .mutation("s3InsertOne", {
    input: z.object({
      name: z.string(),
      type: z.string(),
    }),
    async resolve({ input, ctx }) {
      const fileParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: input.name,
        Expires: 600,
        ContentType: input.type,
      };

      return await s3.createPresignedPost({
        Bucket: process.env.S3_BUCKET_NAME,
        Fields: {
          key: input.name,
          "Content-type": input.type,
        },
        Expires: 60,
        Conditions: [["content-length-range", 0, 104857600]],
      });
    },
  });
