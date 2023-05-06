import { z } from "zod";
import * as jwt from "jsonwebtoken";
import { TRPCError } from "@trpc/server";

import { AuthJwt } from "./admin";
import { createRouter } from "./context";
import { S3 } from "aws-sdk";
import path from "path";

import * as fs from "fs";
import * as https from "https";

const sharp = require("sharp");

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
  .query("getS3ImageUrl", {
    input: z.object({
      src: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      return await s3.getSignedUrlPromise("getObject", {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: input.src,
        Expires: 900, // Default
      });
    },
  })
  .query("getAllS3Thumbnails", {
    input: z.object({
      categoryName: z.string().nullish(),
    }),
    resolve: async ({ input, ctx }) => {
      const imgs = await ctx.prisma.galleryImage.findMany();
      for (let i = 0; i < imgs.length; i++) {
        const now = new Date();
        now.setHours(now.getHours() + 1);

        if ((imgs[i]?.urlExpires ?? 0) < now) {
          const url = await s3.getSignedUrlPromise("getObject", {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `thumbnail/${imgs[i]!!.path}`,
            Expires: 604800, // 7 days, which is the max
          });

          const expires = new Date();
          expires.setDate(expires.getDate() + 7);

          await ctx.prisma.galleryImage.update({
            where: {
              id: imgs[i]!!.id,
            },
            data: {
              url: url,
              urlExpires: expires,
            },
          });
        }
        if ((imgs[i]?.urlLgExpires ?? 0) < now) {
          const url = await s3.getSignedUrlPromise("getObject", {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `thumbnail_lg/${imgs[i]!!.path}`,
            Expires: 604800, // 7 days, which is the max
          });

          const expires = new Date();
          expires.setDate(expires.getDate() + 7);

          await ctx.prisma.galleryImage.update({
            where: {
              id: imgs[i]!!.id,
            },
            data: {
              urlLg: url,
              urlLgExpires: expires,
            },
          });
        }
      }
      if (input.categoryName == null) {
        return await ctx.prisma.galleryImage.findMany({
          include: {
            category: true,
          },
        });
      } else {
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
      }
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
  })
  .mutation("s3GenThumbnails", {
    input: z.object({
      src: z.string(),
      name: z.string(),
      categoryId: z.string().nullish(),
    }),
    async resolve({ input, ctx }) {
      const url = await s3.getSignedUrlPromise("getObject", {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: input.src,
        Expires: 900, // Default
      });

      const baseName = path.basename(input.src);
      const tmpPath = `/tmp/${baseName}`;
      const fileStream = fs.createWriteStream(tmpPath);

      https.get(url, async (res) => {
        res.pipe(fileStream);

        await new Promise((fulfill) => fileStream.on("finish", fulfill));
        fileStream.close();

        await sharp(tmpPath).resize(null, 240).toFile(`/tmp/1${baseName}`);

        await sharp(tmpPath).resize(null, 400).toFile(`/tmp/2${baseName}`);

        await sharp(tmpPath).resize(null, 1000).toFile(`/tmp/3${baseName}`);

        let upFs = fs.createReadStream(`/tmp/1${baseName}`);

        let uploadParams = {
          Bucket: process.env.S3_BUCKET_NAME!!,
          Key: `thumbnail/${baseName}`,
          Body: upFs,
        };

        s3.upload(uploadParams, (err: any, _: any) => {
          if (err) {
            console.log(err);
          }
        });

        let upFs2 = fs.createReadStream(`/tmp/2${baseName}`);
        uploadParams.Key = `thumbnail_md/${baseName}`;
        uploadParams.Body = upFs2;
        s3.upload(uploadParams, (err: any, _: any) => {
          if (err) {
            console.log(err);
          }
        });

        let upFs3 = fs.createReadStream(`/tmp/3${baseName}`);
        uploadParams.Key = `thumbnail_lg/${baseName}`;
        uploadParams.Body = upFs3;
        s3.upload(uploadParams, (err: any, _: any) => {
          if (err) {
            console.log(err);
          }
        });

        const img = await sharp(tmpPath).metadata();
        const thmb = await sharp(`/tmp/1${baseName}`).metadata();

        await ctx.prisma.galleryImage.create({
          data: {
            name: input.name,
            path: baseName,
            w: img.width,
            h: img.height,
            thmb_w: thmb.width,
            thmb_h: thmb.height,
            categoryId: input.categoryId,
          },
        });

        fs.unlink(`/tmp/1${baseName}`, () => {});
        fs.unlink(`/tmp/2${baseName}`, () => {});
        fs.unlink(`/tmp/3${baseName}`, () => {});
        fs.unlink(`/tmp/${baseName}`, () => {});
      });
    },
  });
