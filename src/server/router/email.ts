import { createRouter } from "./context";
import { z } from "zod";
import nodemailer from "nodemailer";
import validator from "email-validator";
import { CommissionError, EmailError } from "../../utils/errortypes";

export const emailRouter = createRouter()
  .mutation("submitContact", {
    input: z
      .object({
        name: z.string(),
        email: z.string(),
        subject: z.string(),
      })
      .nullish(),
    resolve({ input }) {
      console.log(process.env.GMAIL_KEY);
      let client = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "nextjsvralin@gmail.com",
          pass: process.env.GMAIL_KEY,
        },
      });

      let errors = [];
      if (input?.email === "") {
        errors.push(EmailError.EmptyEmail);
      } else if (!validator.validate(input?.email ?? "")) {
        errors.push(EmailError.InvalidEmail);
      }
      if (input?.name === "") {
        errors.push(EmailError.EmptyName);
      }
      if (input?.subject === "") {
        errors.push(EmailError.EmptyMessage);
      }

      if (errors.length == 0) {
        client.sendMail({
          from: "nextjsvralin@gmail.com",
          to: "vincentuden@gmail.com",
          subject: "Frazzot - Contact",
          text: `
                Name: ${input?.name}
                Email: ${input?.email}\n
                Message:
                ${input?.subject}
                `,
        });
      }

      return {
        errors,
      };
    },
  })
  .mutation("submitCommission", {
    input: z
      .object({
        name: z.string(),
        email: z.string(),
        category: z.string(),
        charAmount: z.string(),
        wishes: z.string(),
        background: z.string(),
        charNames: z.string(),
        charDesc: z.string(),
        additionalInfo: z.string(),
      })
      .nullish(),
    resolve({ input }) {
      console.log(process.env.GMAIL_KEY);
      let client = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "nextjsvralin@gmail.com",
          pass: process.env.GMAIL_KEY,
        },
      });

      let errors = [];

      if (input?.name == "") {
        errors.push(CommissionError.EmptyName);
      }
      if (input?.category == "") {
        errors.push(CommissionError.EmptyCategory);
      }
      if (input?.charAmount == "") {
        errors.push(CommissionError.EmptyCharAmount);
      }
      if (input?.wishes == "") {
        errors.push(CommissionError.EmptyWishes);
      }
      if (input?.background == "") {
        errors.push(CommissionError.EmptyBackground);
      }
      if (input?.charNames == "") {
        errors.push(CommissionError.EmptyCharNames);
      }
      if (input?.charDesc == "") {
        errors.push(CommissionError.EmptyCharDesc);
      }
      if (input?.additionalInfo == "") {
        errors.push(CommissionError.EmptyAddtionalInfo);
      }

      if (input?.email == "") {
        errors.push(CommissionError.EmptyEmail);
      } else if (!validator.validate(input?.email ?? "")) {
        errors.push(CommissionError.InvalidEmail);
      }

      if (errors.length == 0) {
        client.sendMail({
          from: "nextjsvralin@gmail.com",
          to: "vincentuden@gmail.com",
          subject: "Frazzot - Contact",
          text: `
                Name: ${input?.name}
                Email: ${input?.email}\n
                Type/Category of commission: ${input?.category}
                How many characters: ${input?.charAmount}
                Any specific wishes or details?: ${input?.wishes}
                Background?: ${input?.background}
                ------------------
                Character(s) name(s): ${input?.charNames}
                Character(s) personality/description: ${input?.charDesc}
                ------------------
                Additional Info: ${input?.additionalInfo}
                `,
        });
      }

      return {
        errors,
      };
    },
  });
