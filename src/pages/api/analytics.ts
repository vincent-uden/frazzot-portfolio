import { NextApiRequest, NextApiResponse } from "next";

export async function logRouteAccess(path: string) {
  let body = {
    path: path,
    projectId: process.env.ANALYTICS_PROJECT_ID!!,
    secret: process.env.ANALYTICS_SECRET!!,
  };

  const resp = await fetch(process.env.ANALYTICS_URL!!, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
): Promise<void> {
  const path: string | null = req.body.path;
  if (req.method != "POST") {
    res.status(405).json({
      message: "Only POST requests allowed",
    });
    return;
  } else if (path == null) {
    res.status(400).json({
      message: "The request body needs to contain a path field",
    });
    return;
  }

  await logRouteAccess(path);
  res.status(200).json({
    message: "Log complete",
  });
  return;
}
