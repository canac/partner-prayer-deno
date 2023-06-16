import { Handler } from "$fresh/server.ts";
import { parse as parseCsv } from "std/csv/mod.ts";
import { db } from "../../db/db.ts";

export const handler: Handler = async (req): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response("Invalid Method", { status: 405 });
  }

  const form = await req.formData();
  const partners = form.get("partners");
  if (!(partners instanceof File)) {
    return new Response("partners upload is missing or is not a file", {
      status: 500,
    });
  }

  const rows = parseCsv(await partners.text(), {
    skipFirstRow: true,
  });
  const partnerNames = rows.map((row) => {
    const name = row["Envelope Greeting"];
    if (!name) {
      throw new Error("Unexpected value for Envelope Greeting");
    }
    return name;
  });
  await db.replacePartners(partnerNames);
  return new Response("Upload Succeeded");
};
