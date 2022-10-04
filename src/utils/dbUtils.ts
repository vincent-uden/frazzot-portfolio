// Run with "npx tsno run src/utils/dbUtils.ts"

import { prisma } from "../server/db/client";

const args = require("args-parser")(process.argv);
console.info(args);