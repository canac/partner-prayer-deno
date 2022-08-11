import { z } from "zod";

const partnerSchema = z.object({
  id: z.string(),
  name: z.string(),
  completed: z.boolean(),
});
const partnersSchema = z.array(partnerSchema);

export type Partner = z.infer<typeof partnerSchema>;

export function parseOne(json: unknown): Promise<Partner> {
  return partnerSchema.parseAsync(json);
}

export async function parseOneOrZero(json: unknown): Promise<Partner | null> {
  const partners = await partnersSchema.max(1).parseAsync(json);
  return partners[0] ?? null;
}

export function parseMany(json: Array<unknown>): Promise<Array<Partner>> {
  return partnersSchema.parseAsync(json);
}
