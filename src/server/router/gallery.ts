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
    .middleware(async ({ ctx, next }) => {
        console.log("Hello");
        console.log(ctx.req?.headers.session_token);
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
                },
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