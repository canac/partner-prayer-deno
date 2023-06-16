import { createRef, JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { parseOne, Partner } from "../db/partnerModel.ts";

export function Partner(
  props: JSX.HTMLAttributes<HTMLButtonElement> & {
    partner: Partner;
    scrollTo: boolean;
  },
) {
  const [completed, setCompleted] = useState(props.partner.completed);

  // Update the completed state when the prop changes
  useEffect(() => {
    setCompleted(props.partner.completed);
  }, [props.partner]);

  // Scroll the partner into view if scrollTo is true
  useEffect(() => {
    if (props.scrollTo) {
      ref.current?.scrollIntoView();
    }
  }, [props.scrollTo]);

  const ref = createRef<HTMLButtonElement>();

  async function toggleCompleted() {
    // Optimistic update
    setCompleted(!completed);

    const res = await fetch("/api/setCompleted", {
      method: "POST",
      body: JSON.stringify({ id: props.partner.id, completed: !completed }),
    });
    const partner = await res.json();

    setCompleted(parseOne(partner).completed);
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
      {props.partner.name}
    </button>
  );
}
