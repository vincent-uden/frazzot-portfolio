// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { NextApiRequest, NextApiResponse } from "next";

export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions
) => {
  const req = opts?.req;
  const res = opts?.res;

  const session = req && res && (await getServerSession(req, res));

  return {
    req,
    res,
    session,
  };
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();

interface Session {
  token: string;
}

async function getServerSession(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Session> {
  // Does the request contain a valid token?
  // If so, include token in session info
  // --
  // Get other interesting session info?
  // --
  // How to handle invalid tokens? Do something to the response?
  // HTTP 403?

  req;

  return {
    token: "",
  };
}
