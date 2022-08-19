/** @jsx h */
import { createRef, h, RefObject } from "preact";
import { useEffect, useState } from "preact/hooks";
import { tw } from "@twind";
import { Partner } from "../components/Partner.tsx";
import { parseMany, Partner as PartnerModel } from "../partnerModel.ts";

interface PartnersProps {
  partners: Array<PartnerModel>;
}

export default function Partners(props: PartnersProps) {
  const [partners, setPartners] = useState(props.partners);
  const [startPartner, setStartPartner] = useState<PartnerModel | null>(null);

  async function reset() {
    const res = await fetch("/api/reset", { method: "POST" });
    const partners = await res.json();
    setPartners(await parseMany(partners));
  }

  useEffect(() => {
    // Find the first incomplete partner
    setStartPartner(partners.find((partner) => !partner.completed) ?? null);
  }, [partners]);

  return (
    <div className={tw`flex flex-col`}>
      {partners.map((partner) => (
        <Partner
          className={tw`md:self-center md:w-1/2`}
          key={partner.id}
          partner={partner}
          scrollTo={startPartner === partner}
        />
      ))}
      <button
        className={tw`md:self-center md:w-1/2 text-2xl hover:cursor-pointer m-4 p-6 bg-red-500 hover:bg-red-600 rounded-xl`}
        onClick={() => reset()}
      >
        Reset
      </button>
    </div>
  );
}
