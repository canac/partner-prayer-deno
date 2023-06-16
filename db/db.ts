import { Partner } from "./partnerModel.ts";
export { db } from "./kv.ts";

export interface DB {
  loadPartners(): Promise<Array<Partner>>;
  setCompleted(
    id: string,
    completed: boolean,
  ): Promise<Partner | null>;
  resetCompleted(): Promise<Array<Partner>>;
  replacePartners(names: Array<string>): Promise<void>;
}
