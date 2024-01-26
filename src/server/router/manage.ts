import { TRPCError } from "@trpc/server";
import { z } from "zod";
import path from "path";
import * as fs from "fs";
import * as https from "https";
import { asc, desc, eq, gt, gte, sql } from "drizzle-orm";
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
import { db } from "../../db/drizzle";
import { galleryImages } from "../../db/schema";

const sharp = require("sharp");

const s3Config: S3ClientConfig = {
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!!,
    secretAccessKey: process.env.S3_SECRET_KEY!!,
  },
  region: process.env.S3_REGION!!,
};

const s3 = new S3Client(s3Config);

function getSessionToken(rawHeaders: string[] | null | undefined): string | null {
  if (rawHeaders == null) {
    return null;
  }
  for (const header of rawHeaders) {
    if (header.startsWith("session_token")) {
      const [_, token] = header.split("=");
      return token ?? null;
    }
  }
  return null;
}

export const manageRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    let token = getSessionToken(ctx.req?.rawHeaders);
    if (token != null && typeof token === "string") {
      let decoded = authenticate(token);
      if (decoded.authLevel == null || decoded.authLevel > 0 || decoded.expires < new Date()) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return next();
    }
    throw new TRPCError({ code: "UNAUTHORIZED" });
  })
  .mutation("updateOne", {
    input: z.object({
      id: z.string(),
      name: z.string().optional(),
      path: z.string().optional(),
      w: z.number().optional(),
      h: z.number().optional(),
      thmb_w: z.number().optional(),
      thmb_h: z.number().optional(),
      categoryId: z.string().nullish().optional(),
      displayIndex: z.number().optional(),
    }),
    resolve: async ({ input }) => {
      const data: Record<string, any> = {};
      if (input.name != null) {
        data.name = input.name;
      }
      if (input.path != null) {
        data.path = input.path;
      }
      if (input.w != null) {
        data.w = input.w;
      }
      if (input.h != null) {
        data.h = input.h;
      }
      if (input.thmb_w != null) {
        data.thmb_w = input.thmb_w;
      }
      if (input.thmb_h != null) {
        data.thmb_h = input.thmb_h;
      }
      if (input.categoryId != null) {
        data.categoryId = input.categoryId;
      }
      if (input.displayIndex != null) {
        data.displayIndex = input.displayIndex;
      }

      return await db
        .update(galleryImages)
        .set(data)
        .where(eq(galleryImages.id, input.id));
    },
  })
  .mutation("deleteAll", {
    async resolve({}) {
      return await db.delete(galleryImages);
    },
  })
  .mutation("deleteById", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      return await db
        .delete(galleryImages)
        .where(eq(galleryImages.id, input.id));
    },
  })
  .mutation("s3InsertOne", {
    input: z.object({
      name: z.string(),
      type: z.string(),
    }),
    async resolve({ input }) {
      return await createPresignedPost(s3, {
        Bucket: process.env.S3_BUCKET_NAME!!,
        Key: input.name,
        Fields: {
          "Content-Type": input.type,
        },
        Conditions: [["content-length-range", 0, 100485760]],
      });
    },
  })
  .mutation("s3GenThumbnails", {
    input: z.object({
      src: z.string(),
      name: z.string(),
      categoryId: z.string().nullish(),
    }),
    async resolve({ input }) {
      const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME!!,
        Key: input.src,
      });
      const url = await getSignedUrl(s3, command, { expiresIn: 900 });

      const baseName = path.basename(input.src);
      const tmpPath = `/tmp/${baseName}`;
      const fileStream = fs.createWriteStream(tmpPath);

      await convertThumbnails(
        url,
        fileStream,
        baseName,
        tmpPath,
        input.name,
        input.categoryId!!
      );
    },
  })
  .mutation("moveImageDisplayOrder", {
    input: z.object({
      id: z.string().uuid(),
      newI: z.number().int(),
    }),
    async resolve({ input }) {
      await db.transaction(async (tx) => {
        let img = await tx.select().from(galleryImages).where(eq(galleryImages.id, input.id));
        if (img.length > 0) {
          await tx.update(galleryImages).set({ displayIndex: sql`${galleryImages.displayIndex} - 1` }).where(gt(galleryImages.displayIndex, img[0]!!.displayIndex));
          await tx.update(galleryImages).set({ displayIndex: sql`${galleryImages.displayIndex} + 1` }).where(gte(galleryImages.displayIndex, input.newI));
          await tx.update(galleryImages).set({ displayIndex: input.newI }).where(eq(galleryImages.id, img[0]!!.id));
        }
      });
    }
  })
  ;

async function convertThumbnails(
  url: string,
  fileStream: fs.WriteStream,
  baseName: string,
  tmpPath: string,
  inputName: string,
  categoryId: string
) {
  return new Promise((resolve) => {
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
      try {
        await s3.send(new PutObjectCommand(uploadParams));
      } catch (err) {
        console.log(err);
      }

      let upFs2 = fs.createReadStream(`/tmp/2${baseName}`);
      uploadParams.Key = `thumbnail_md/${baseName}`;
      uploadParams.Body = upFs2;
      try {
        await s3.send(new PutObjectCommand(uploadParams));
      } catch (err) {
        console.log(err);
      }

      let upFs3 = fs.createReadStream(`/tmp/3${baseName}`);
      uploadParams.Key = `thumbnail_lg/${baseName}`;
      uploadParams.Body = upFs3;
      try {
        await s3.send(new PutObjectCommand(uploadParams));
      } catch (err) {
        console.log(err);
      }

      const img = await sharp(tmpPath).metadata();
      const thmb = await sharp(`/tmp/1${baseName}`).metadata();

      const biggestDisplayIndex = (
        await db
          .select()
          .from(galleryImages)
          .orderBy(desc(galleryImages.displayIndex))
          .where(eq(galleryImages.categoryId, categoryId))
          .limit(1)
      )[0];

      await db.insert(galleryImages).values({
        name: inputName,
        path: baseName,
        w: img.width as number,
        h: img.height as number,
        thmb_w: thmb.width as number,
        thmb_h: thmb.height as number,
        categoryId: categoryId,
        displayIndex: (biggestDisplayIndex?.displayIndex ?? -1) + 1,
      });

      fs.unlink(`/tmp/1${baseName}`, () => {});
      fs.unlink(`/tmp/2${baseName}`, () => {});
      fs.unlink(`/tmp/3${baseName}`, () => {});
      fs.unlink(`/tmp/${baseName}`, () => {});

      resolve(() => {});
    });
  });
}
