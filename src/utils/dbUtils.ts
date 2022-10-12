// Run with "npx tsno run src/utils/dbUtils.ts"

import { GalleryImage, AdminPassword } from "@prisma/client";
import { prisma } from "../server/db/client";
import inquirer from "inquirer";
import { hash } from "argon2";

console.log("Welcome to the database utility script!");
console.log("---------------------------------------");

inquirer
  .prompt([
    {
      name: "action",
      message: "What do you want to do?",
      type: "list",
      choices: ["Create new admin password", "List admin password info"],
    },
  ])
  .then(async (actionAnswer) => {
    if (actionAnswer.action === "Create new admin password") {
      inquirer
        .prompt([
          {
            name: "password",
            message: "Enter a new admin password",
            type: "password",
            mask: "*",
          },
          {
            name: "passwordConfirm",
            message: "Confirm the new password",
            type: "password",
            mask: "*",
          },
        ])
        .then(async (answers) => {
          if (
            answers.password === answers.passwordConfirm &&
            answers.password !== ""
          ) {
            const hashedPw = await hash(answers.password);
            const newPassword = {
              hash: hashedPw,
            };
            await prisma.adminPassword.create({ data: newPassword });
          } else {
            console.log("The passwords do not match");
          }
        });
    } else if (actionAnswer.action === "List admin password info") {
      console.log(await prisma.adminPassword.findMany());
    }
  });
