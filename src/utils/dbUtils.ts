import { prisma } from "../server/db/client";
import * as argon2 from "argon2";

const args = require("args-parser")(process.argv);
console.info(args);