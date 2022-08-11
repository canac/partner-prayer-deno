import { HandlerContext } from "$fresh/server.ts";
import { z } from "zod";
import { setCompleted } from "../../db.ts";

const payloadSchema = z.object({
  id: z.string(),
  completed: z.boolean(),
});

export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  if (req.method === "POST") {
    const { id, completed } = await payloadSchema.parseAsync(await req.json());
    const partner = await setCompleted(id, completed);
    if (!partner) {
      return new Response("Not Found", { status: 404 });
    }
    return Response.json(partner);
  } else {
    return new Response("Invalid Method", { status: 405 });
  }
};
