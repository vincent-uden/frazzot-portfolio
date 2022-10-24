// Run with "npx tsno run src/utils/dbUtils.ts"

import { GalleryImage, AdminPassword } from "@prisma/client";
import { prisma } from "../server/db/client";
import inquirer from "inquirer";
import { hash } from "argon2";

console.log("Welcome to the database utility script!");
console.log("---------------------------------------");

const actions = {
  newUser: "Create a new admin user",
  listUsers: "List admin users",
  deleteUser: "Delete an admin user",
  deleteAll: "Delete ALL admin users",
};

inquirer
  .prompt([
    {
      name: "action",
      message: "What do you want to do?",
      type: "list",
      choices: Object.values(actions),
    },
  ])
  .then(async (actionAnswer) => {
    if (actionAnswer.action === actions.newUser) {
      inquirer
        .prompt([
          {
            name: "username",
            message: "Enter the username",
            type: "input",
          },
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
              name: answers.username,
              hash: hashedPw,
            };
            await prisma.adminPassword.create({ data: newPassword });
          } else {
            console.log("The passwords do not match");
          }
        });
    } else if (actionAnswer.action === actions.listUsers) {
      console.log(await prisma.adminPassword.findMany());
    } else if (actionAnswer.action === actions.deleteUser) {
      let users = await prisma.adminPassword.findMany();
      let options = [];
      for (let i = 0; i < users.length; i++) {
        options.push(users[i]!!.name);
      }
      inquirer
        .prompt([
          {
            name: "chosenUsers",
            message: "Which user(s) should be deleted?",
            type: "checkbox",
            choices: options,
          },
        ])
        .then(async (answers) => {
          console.log(answers);
          for (let i = 0; i < answers.chosenUsers.length; i++) {
            await prisma.adminPassword.delete({
              where: {
                name: answers.chosenUsers[i],
              },
            });
          }
        });
    } else if (actionAnswer.action === actions.deleteAll) {
      await prisma.adminPassword.deleteMany({});
    }
  });
