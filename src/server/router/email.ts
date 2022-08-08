import { createRouter } from "./context";
import { z } from "zod";
import nodemailer from "nodemailer";
import validator from "email-validator";
import { EmailError } from "../../utils/errortypes";

export const emailRouter = createRouter()
    .mutation("submitContact", {
        input: z.object({
            name: z.string(),
            email: z.string(),
            subject: z.string(),
        }).nullish(),
        resolve({ input }) {
            // TODO: Input validation
            console.log(process.env.GMAIL_KEY)
            let client = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "nextjsvralin@gmail.com",
                    pass: process.env.GMAIL_KEY
                }
            })

            let errors = [];
            if (input?.email === "") {
                errors.push(EmailError.EmptyEmail)
            } else if (!validator.validate(input?.email ?? "")) {
                errors.push(EmailError.InvalidEmail)
            }
            if (input?.name === "") {
                errors.push(EmailError.EmptyName)
            }
            if (input?.subject === "") {
                errors.push(EmailError.EmptyMessage)
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
                })
            }

            return {
                errors
            };
        },
    })