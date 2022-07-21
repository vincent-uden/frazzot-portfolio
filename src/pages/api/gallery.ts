import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const gallery = async (req: NextApiRequest, res: NextApiResponse) => {
    const gallery = await prisma.galleryImage.findMany();
    res.status(200).json(gallery);
}

export default gallery;