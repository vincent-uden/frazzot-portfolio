import { NextApiRequest, NextApiResponse } from "next";
import { appendFileSync, existsSync, unlinkSync } from "fs";
import * as jwt from "jsonwebtoken";

import { AuthJwt, AuthJwtSchema } from "../../server/router/admin";

const sharp = require("sharp");

type ResponseData = {
  message: string;
};

type Chunk = {
  id: number;
  data: string;
};

type PendingImage = {
  fileName: string;
  cuid: string;
  chunks: Chunk[];
  chunkAmount: number;
};

let pendingImages: PendingImage[] = [];

/**
 * Adds a chunk to a pending image upload
 * @param cuid - PendingImage id which the cunk will be added to
 * @param chunk - The chunk
 * @returns If the pending image is complete
 */
function addChunk(cuid: string, chunk: Chunk): boolean {
  let i = pendingImages.findIndex((p) => p.cuid == cuid);
  if (i < 0) {
    return false;
  }

  // Ensure no duplication
  if (!pendingImages[i]?.chunks.find((c) => c.id == chunk.id)) {
    pendingImages[i]?.chunks.push(chunk);
  }

  return pendingImages[i]?.chunks.length == pendingImages[i]?.chunkAmount;
}

async function saveImage(
  pi: PendingImage
): Promise<[Number, Number, Number, Number]> {
  if (existsSync(`./public/gallery/${pi.fileName}`)) {
    unlinkSync(`./public/gallery/${pi.fileName}`);
  }

  pi.chunks.sort((c1, c2) => c1.id - c2.id);
  pi.chunks.map((c) => {
    appendFileSync(`./public/gallery/${pi.fileName}`, c.data, "base64");
  });

  await sharp(`./public/gallery/${pi.fileName}`)
    .resize(null, 200)
    .toFile(`./public/thumbnail/${pi.fileName}`);

  await sharp(`./public/gallery/${pi.fileName}`)
    .resize(null, 400)
    .toFile(`./public/thumbnail_md/${pi.fileName}`);

  await sharp(`./public/gallery/${pi.fileName}`)
    .resize(null, 1000)
    .toFile(`./public/thumbnail_lg/${pi.fileName}`);

  const img = await sharp(`./public/gallery/${pi.fileName}`).metadata();
  const thmb = await sharp(`./public/thumbnail/${pi.fileName}`).metadata();

  return [img.width, img.height, thmb.width, thmb.height];
}

/**
 * Expects request on the following form:
 * {
 *   body: {
 *     fileName:    string,
 *     data:        string, (base64)
 *     chunkId:     int,
 *     chunkAmount: int,
 *     cuid:        string,
 *     token:       string,
 *   }
 * }
 *
 * @remarks
 * This is to ensure data arrives from the correct source in the correct order
 * before writing it into a file
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
): Promise<void> {
  let completed = false;
  let pi;
  let decoded = AuthJwtSchema.parse(jwt.verify(
    req.body["token"],
    process.env.SHA_SECRET!!
  ));
  /* This technically doesnt check for token expiration but that's allright */
  if (decoded.authLevel == null || decoded.authLevel > 0 || decoded.expires < new Date()) {
    res.status(403).json({
      message: JSON.stringify({
        msg: "UNAUTHORIZED",
      }),
    });
    return;
  }
  if (!(pi = pendingImages.find((p) => p.cuid == req.body["cuid"]))) {
    pendingImages.push({
      fileName: req.body["fileName"],
      cuid: req.body["cuid"],
      chunks: [
        {
          id: req.body["chunkId"] as number,
          data: req.body["data"] as string,
        },
      ],
      chunkAmount: req.body["chunkAmount"],
    });
  } else {
    completed = addChunk(req.body["cuid"], {
      id: req.body["chunkId"] as number,
      data: req.body["data"] as string,
    });
  }

  let w, h, thmb_w, thmb_h;
  if (completed) {
    if (pi != null) {
      [w, h, thmb_w, thmb_h] = await saveImage(pi);
      console.log(w, h, thmb_w, thmb_h);
    }
  }

  res.status(200).json({
    message: JSON.stringify({
      completed,
      w,
      h,
      thmb_w,
      thmb_h,
    }),
  });
}
