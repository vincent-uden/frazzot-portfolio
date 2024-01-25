import { z } from "zod";

import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  S3ClientConfig,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

import { AuthJwt, authenticate } from "./admin";
import { createRouter } from "./context";
import path from "path";
import { db } from "../../db/drizzle";

import * as fs from "fs";
import * as https from "https";
import { galleryImages, sessionTokens, imageCategories } from "../../db/schema";
import { asc, desc, eq } from "drizzle-orm";


const s3Config: S3ClientConfig = {
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!!,
    secretAccessKey: process.env.S3_SECRET_KEY!!,
  },
  region: process.env.S3_REGION!!,
};

const s3 = new S3Client(s3Config);

export const galleryRouter = createRouter()
  .query("getAll", {
    async resolve({}) {
      return await db
        .select()
        .from(galleryImages)
        .leftJoin(
          imageCategories,
          eq(galleryImages.categoryId, imageCategories.id)
        )
        .orderBy(asc(galleryImages.displayIndex));
    },
  })
  .query("getImages", {
    input: z.object({
      categoryName: z.string(),
    }),
    resolve: async ({ input }) => {
      return await db
        .select()
        .from(galleryImages)
        .leftJoin(
          imageCategories,
          eq(galleryImages.categoryId, imageCategories.id)
        )
        .where(eq(imageCategories.name, input.categoryName))
        .orderBy(asc(galleryImages.displayIndex));
    },
  })
  .query("getAllCategories", {
    async resolve({}) {
      return await db.select().from(imageCategories);
    },
  })
  .query("getCategory", {
    input: z.object({
      name: z.string(),
    }),
    resolve: async ({ input }) => {
      return (
        await db
          .select()
          .from(imageCategories)
          .where(eq(imageCategories.name, input.name))
          .limit(1)
      )[0];
    },
  })
  .query("getS3ImageUrl", {
    input: z.object({
      src: z.string(),
    }),
    resolve: async ({ input }) => {
      const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME!!,
        Key: input.src,
      });
      return await getSignedUrl(s3, command, { expiresIn: 604800 });
    },
  })
  .query("getAllS3Thumbnails", {
    input: z.object({
      categoryName: z.string().nullish(),
    }),
    resolve: async ({ input }) => {
      let imgs = [];
      if (input.categoryName == null) {
        imgs = await db
          .select()
          .from(galleryImages)
          .orderBy(asc(galleryImages.displayIndex));
      } else {
        imgs = (
          await db
            .select()
            .from(galleryImages)
            .leftJoin(
              imageCategories,
              eq(galleryImages.categoryId, imageCategories.id)
            )
            .where(eq(imageCategories.name, input.categoryName))
            .orderBy(asc(galleryImages.displayIndex))
        ).map((row: any) => row.GalleryImage);
      }

      const urlPromises = [];
      const now = new Date();
      now.setHours(now.getHours() + 1);
      for (let i = 0; i < imgs.length; i++) {
        if (
          (imgs[i]?.urlExpires ?? 0) < now ||
          (imgs[i]?.urlLgExpires ?? 0) < now
        ) {
          const command = new GetObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME!!,
            Key: `thumbnail/${imgs[i]!!.path}`,
          });
          const commandLg = new GetObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME!!,
            Key: `thumbnail_lg/${imgs[i]!!.path}`,
          });
          const requests = {
            index: i,
            url: getSignedUrl(s3, command, {
              expiresIn: 604800, // 7 days, which is the max
            }),
            urlLg: getSignedUrl(s3, commandLg, {
              expiresIn: 604800, // 7 days, which is the max
            }),
          };

          urlPromises.push(requests);
        }
      }

      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      for (let j = 0; j < urlPromises.length; j++) {
        const url = await urlPromises[j]?.url;
        const urlLg = await urlPromises[j]?.urlLg;

        await db
          .update(galleryImages)
          .set({
            url: url,
            urlLg: urlLg,
            urlExpires: expires,
            urlLgExpires: expires,
          })
          .where(eq(galleryImages.id, imgs[urlPromises[j]!!.index]!!.id));
      }

      if (urlPromises.length == 0) {
        return imgs;
      } else if (input.categoryName == null) {
        return await db
          .select()
          .from(galleryImages)
          .orderBy(asc(galleryImages.displayIndex));
      } else {
        return (
          await db
            .select()
            .from(galleryImages)
            .leftJoin(
              imageCategories,
              eq(galleryImages.categoryId, imageCategories.id)
            )
            .where(eq(imageCategories.name, input.categoryName))
            .orderBy(asc(galleryImages.displayIndex))
        ).map((row: any) => row.GalleryImage);
      }
    },
  })
  .query("getAllS3ThumbnailsFast", {
    input: z.object({
      categoryName: z.string().nullish(),
    }),
    resolve: async ({ input }) => {
      let imgs = [];
      if (input.categoryName == null) {
        imgs = await db
          .select()
          .from(galleryImages)
          .orderBy(asc(galleryImages.displayIndex));
      } else {
        imgs = (
          await db
            .select()
            .from(galleryImages)
            .leftJoin(
              imageCategories,
              eq(galleryImages.categoryId, imageCategories.id)
            )
            .where(eq(imageCategories.name, input.categoryName))
            .orderBy(asc(galleryImages.displayIndex))
        ).map((row: any) => row.GalleryImage);
      }
      return imgs;
    },
  });
