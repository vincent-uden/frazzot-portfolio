import { NextApiRequest, NextApiResponse } from "next";
import { asc, eq } from "drizzle-orm";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, S3Client, S3ClientConfig } from "@aws-sdk/client-s3";

import { db } from "../../../db/drizzle";
import { galleryImages, imageCategories } from "../../../db/schema";

type ResponseData = {};

const s3Config: S3ClientConfig = {
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!!,
    secretAccessKey: process.env.S3_SECRET_KEY!!,
  },
  region: process.env.S3_REGION!!,
};

const s3 = new S3Client(s3Config);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
): Promise<void> {
  const { imageCategory } = req.query;

  let imgs = [];
  if (imageCategory == null) {
    imgs = await db
      .select()
      .from(galleryImages)
      .orderBy(asc(galleryImages.displayIndex));
  } else if (
    typeof imageCategory === "string" ||
    imageCategory instanceof String
  ) {
    imgs = (
      await db
        .select()
        .from(galleryImages)
        .leftJoin(
          imageCategories,
          eq(galleryImages.categoryId, imageCategories.id)
        )
        .where(eq(imageCategories.name, imageCategory as string))
        .orderBy(asc(galleryImages.displayIndex))
    ).map((row: any) => row.GalleryImage);
  }

  const urlPromises = [];
  const now = new Date();
  now.setHours(now.getHours() + 1);
  for (let i = 0; i < imgs.length; i++) {
    console.log("  " + imgs[i]!!.name);
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

  res.status(200).json({});
}
