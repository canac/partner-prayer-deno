import postgres from "postgres";
import { parseMany, parseOneOrZero, Partner } from "./partnerModel.ts";

const dbUrl = Deno.env.get("DATABASE_URL");
if (!dbUrl) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const sql = postgres(dbUrl);

// Load all of the partners from the database
export async function loadPartners(): Promise<Array<Partner>> {
  const result = await sql`SELECT id, name, completed FROM partner`;
  return parseMany(result);
}

// Change the completed state of a partner
export async function setCompleted(
  id: string,
  completed: boolean,
): Promise<Partner | null> {
  const result =
    await sql`UPDATE partner SET completed=${completed} WHERE id=${id} RETURNING id, name, completed`;
  return parseOneOrZero(result);
}

// Reset the completed state of all partners
export async function resetCompleted(): Promise<Array<Partner>> {
  const result =
    await sql`UPDATE partner SET completed=false RETURNING id, name, completed`;
  return parseMany(result);
}
