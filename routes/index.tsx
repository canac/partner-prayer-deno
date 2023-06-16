import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Partners from "../islands/Partners.tsx";
import { db } from "../db/db.ts";
import { Partner } from "../db/partnerModel.ts";

interface IndexData {
  partners: Partner[];
}

export const handler: Handlers<IndexData> = {
  async GET(_, ctx) {
    return ctx.render({ partners: await db.loadPartners() });
  },
};

export default function Index({ data }: PageProps<IndexData>) {
  return (
    <>
      <Head>
        <title>Partner Prayer</title>
      </Head>
      <main class="bg-gray-800 text-center text-gray-200">
        <h1 class="text-4xl font-bold py-8">Partner Prayer</h1>
        <Partners
          partners={data.partners}
        />
      </main>
    </>
  );
}
