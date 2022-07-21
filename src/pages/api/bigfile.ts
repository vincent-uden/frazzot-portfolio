import { NextApiRequest, NextApiResponse } from "next";

import { appendFileSync, existsSync, unlinkSync } from "fs";

type ResponseData = {
    message: string,
}

type Chunk = {
    id: number,
    data: string,
}

type PendingImage = {
    fileName: string,
    cuid: string,
    chunks: Chunk[],
    chunkAmount: number,
}

let pendingImages: PendingImage[] = [];

/**
 * Adds a chunk to a pending image upload
 * @param cuid - PendingImage id which the cunk will be added to
 * @param chunk - The chunk
 * @returns If the pending image is complete
 */
function addChunk(cuid: string, chunk: Chunk): boolean {
    let i = pendingImages.findIndex((p) => p.cuid == cuid)
    if (i < 0) {
        return false;
    }

    // Ensure no duplication
    if (!pendingImages[i]?.chunks.find((c) => c.id == chunk.id)) {
        pendingImages[i]?.chunks.push(chunk);
    }

    return pendingImages[i]?.chunks.length == pendingImages[i]?.chunkAmount;
}

function saveImage(pi: PendingImage) {
    if (existsSync(`./public/gallery/${pi.fileName}`)) {
        unlinkSync(`./public/gallery/${pi.fileName}`);
    }

    pi.chunks.sort((c1, c2) => c1.id - c2.id);
    pi.chunks.map((c) => {
        appendFileSync(`./public/gallery/${pi.fileName}`, c.data, "base64");
    })
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
 *   }
 * }
 * 
 * @remarks
 * This is to ensure data arrives from the correct source in the correct order 
 * before writing it into a file
*/
export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>): void {
    // TODO: Enforce cheks on request data form

    // Is this the first request for this image?
    console.log(req.body["cuid"], req.body["chunkId"]);
    let completed = false;
    let pi;
    if (!(pi = pendingImages.find((p) => p.cuid == req.body["cuid"]))) {
        pendingImages.push({
            fileName: req.body["fileName"],
            cuid: req.body["cuid"],
            chunks: [{
                id: req.body["chunkId"] as number,
                data: req.body["data"] as string,
            }],
            chunkAmount: req.body["chunkAmount"],
        })
    } else {
        completed = addChunk(req.body["cuid"], {
            id: req.body["chunkId"] as number,
            data: req.body["data"] as string,
        });
    }

    if (completed) {
        if (pi != null) {
            saveImage(pi);
        }
    }

    res.status(200).json({ message: completed ? "Complete" : "Pending" });
}