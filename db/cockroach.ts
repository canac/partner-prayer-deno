import postgres from "postgres";
import { parseMany, parseOneOrZero, Partner } from "./partnerModel.ts";
import { DB } from "./db.ts";

const dbUrl = Deno.env.get("DATABASE_URL");
if (!dbUrl) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const sql = postgres(dbUrl);

// Load all of the partners from the database
async function loadPartners(): Promise<Array<Partner>> {
  const result = await sql`SELECT id, name, completed FROM partner`;
  return parseMany(result);
}

// Change the completed state of a partner
async function setCompleted(
  id: string,
  completed: boolean,
): Promise<Partner | null> {
  const result =
    await sql`UPDATE partner SET completed=${completed} WHERE id=${id} RETURNING id, name, completed`;
  return parseOneOrZero(result);
}

// Reset the completed state of all partners
async function resetCompleted(): Promise<Array<Partner>> {
  const result =
    await sql`UPDATE partner SET completed=false RETURNING id, name, completed`;
  return parseMany(result);
}

// Replace the partners with a new list of partners
async function replacePartners(names: Array<string>): Promise<void> {
  await sql`TRUNCATE TABLE partner`;
  const data = names.map((name) => ({ name }));
  await sql`INSERT INTO partner ${sql(data)}`;
}

export const db: DB = {
  loadPartners,
  setCompleted,
  resetCompleted,
  replacePartners,
};
