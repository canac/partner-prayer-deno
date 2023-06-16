import { parseMany, parseOne, Partner } from "./partnerModel.ts";
import { DB } from "./db.ts";

const kv = await Deno.openKv();

// Load all of the partners from the database
async function loadPartners(): Promise<Array<Partner>> {
  const partners: unknown[] = [];
  for await (const { value } of kv.list({ prefix: ["partners"] })) {
    partners.push(value);
  }
  return parseMany(partners);
}

// Change the completed state of a partner
async function setCompleted(
  id: string,
  completed: boolean,
): Promise<Partner | null> {
  const result = await kv.get(["partners", id]);
  const partner: Partner = { ...parseOne(result.value), completed };
  await kv.set(result.key, partner);
  return partner;
}

// Reset the completed state of all partners
async function resetCompleted(): Promise<Array<Partner>> {
  const promises: Promise<Partner>[] = [];
  for await (const { key, value } of kv.list({ prefix: ["partners"] })) {
    const partner: Partner = { ...parseOne(value), completed: false };
    promises.push(kv.set(key, partner).then(() => partner));
  }
  return Promise.all(promises);
}

// Replace the partners with a new list of partners
async function replacePartners(names: Array<string>): Promise<void> {
  const promises: Promise<unknown>[] = [];
  for await (const { key } of kv.list({ prefix: ["partners"] })) {
    promises.push(kv.delete(key));
  }
  await Promise.all(promises);

  await Promise.all(names.map((name, index) => {
    const partner: Partner = {
      id: ("000" + index.toString()).slice(-4),
      name,
      completed: false,
    };
    return kv.set(["partners", partner.id], partner);
  }));
}

export const db: DB = {
  loadPartners,
  setCompleted,
  resetCompleted,
  replacePartners,
};
