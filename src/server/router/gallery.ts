import { z } from "zod";
import { createRouter } from "./context";

import { writeFile, appendFileSync, unlinkSync, existsSync } from "fs";
import { resolve } from "path";

export const galleryRouter = createRouter()
    .query("getAll", {
        async resolve({ ctx }) {
            return await ctx.prisma.galleryImage.findMany();
        }
    })
    .mutation("insertOne", {
        input: z.object({
            name: z.string(),
            path: z.string(),
        }),
        resolve: async ({ input, ctx }) => {
            return await ctx.prisma.galleryImage.create({
                data: { name: input.name, path: input.path },
            });
        }
    }).mutation("deleteAll", {
        async resolve({ ctx }) {
            return await ctx.prisma.galleryImage.deleteMany();
        }
    }).mutation("deleteById", {
        input: z.object({
            id: z.string(),
        }),
        async resolve({ input, ctx }) {
            return await ctx.prisma.galleryImage.deleteMany({ where: { id: { equals: input.id } } });
        }
    });