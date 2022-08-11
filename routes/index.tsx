/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import Partners from "../islands/Partners.tsx";
import { loadPartners } from "../db.ts";
import { Partner } from "../partnerModel.ts";

interface IndexData {
  partners: Partner[];
}

export const handler: Handlers<IndexData> = {
  async GET(_, ctx) {
    return ctx.render({ partners: await loadPartners() });
  },
};

export default function Index({ data }: PageProps<IndexData>) {
  return (
    <main class={tw`bg-gray-800 text-center text-gray-200`}>
      <h1 class={tw`text-4xl font-bold py-8`}>Partner Prayer</h1>
      <Partners
        partners={data.partners}
      />
    </main>
  );
}
