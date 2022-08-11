import { HandlerContext } from "$fresh/server.ts";
import { resetCompleted } from "../../db.ts";

export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  if (req.method === "POST") {
    return Response.json(await resetCompleted());
  } else {
    return new Response("Invalid Method", { status: 405 });
  }
};
