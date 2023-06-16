import { createRef, FunctionComponent, JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { parseOne, Partner as PartnerModel } from "../db/partnerModel.ts";

interface PartnerProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  partner: PartnerModel;
  scrollTo: boolean;
}

export const Partner: FunctionComponent<PartnerProps> = (
  { partner, scrollTo, ...props },
) => {
  const [completed, setCompleted] = useState(partner.completed);

  // Update the completed state when the prop changes
  useEffect(() => {
    setCompleted(partner.completed);
  }, [partner]);

  // Scroll the partner into view if scrollTo is true
  useEffect(() => {
    if (scrollTo) {
      console.log(ref.current);
      ref.current?.scrollIntoView();
    }
  }, [scrollTo]);

  const ref = createRef<HTMLButtonElement>();

  async function toggleCompleted() {
    // Optimistic update
    setCompleted(!completed);

    const res = await fetch("/api/setCompleted", {
      method: "POST",
      body: JSON.stringify({ id: partner.id, completed: !completed }),
    });
    const updatedPartner = await res.json();

    setCompleted(parseOne(updatedPartner).completed);
  }

  const completeColor = "bg-green-500 hover:bg-green-600";
  const incompleteColor = "bg-gray-200 hover:bg-gray-100";
  return (
    <button
      {...props}
      className={`text-2xl hover:cursor-pointer m-4 p-6 scroll-m-4 text-gray-800 ${
        completed ? completeColor : incompleteColor
      } rounded-xl ${props.className}`}
      // twind v0 doesn't support scroll-m-*
      style={{ "scroll-margin": "1rem" }}
      ref={ref}
      onClick={() => toggleCompleted()}
    >
      {partner.name}
    </button>
  );
};
