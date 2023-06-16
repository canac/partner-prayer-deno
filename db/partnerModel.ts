import { z } from "zod";

const partnerSchema = z.object({
  id: z.string(),
  name: z.string(),
  completed: z.boolean(),
});
const partnersSchema = z.array(partnerSchema);

export type Partner = z.infer<typeof partnerSchema>;

export function parseOne(json: unknown): Partner {
  return partnerSchema.parse(json);
}

export function parseOneOrZero(json: unknown): Partner | null {
  const partners = partnersSchema.max(1).parse(json);
  return partners[0] ?? null;
}

export function parseMany(json: Array<unknown>): Array<Partner> {
  return partnersSchema.parse(json);
}
