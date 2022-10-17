import * as argon2 from "argon2";
import { z } from "zod";
import { EmailError } from "../../utils/errortypes";
import { createRouter } from "./context";
import * as jwt from "jsonwebtoken";

export const adminRouter = createRouter().mutation("submitLogin", {
  input: z.object({
    name: z.string(),
    password: z.string(),
  }),
  resolve: async ({ input, ctx }) => {
    let errors = [];
    let token = "";
    if (input.name === "") {
      errors.push(EmailError.EmptyName);
    }
    if (input.password === "") {
      errors.push(EmailError.EmptyPassword);
    }
    if (errors.length === 0) {
      let user = await ctx.prisma.adminPassword.findUnique({
        where: { name: input.name },
      });
      if (user == null) {
        errors.push(EmailError.IncorrectUserDetails);
      } else {
        if (await argon2.verify(user.hash, input.password)) {
          console.log(process.env.SHA_SECRET);
          token = jwt.sign({ authLevel: 0 }, process.env.SHA_SECRET!!);
        } else {
          errors.push(EmailError.IncorrectUserDetails);
        }
      }
    }

    return {
      errors,
      token,
    };
  },
});
