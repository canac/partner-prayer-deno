/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { tw } from "@twind";
import { parseOne, Partner } from "../partnerModel.ts";

export function Partner(
  props: h.JSX.HTMLAttributes<HTMLButtonElement> & {
    partner: Partner;
  },
) {
  const [completed, setCompleted] = useState(props.partner.completed);

  // Update the completed state when the prop changes
  useEffect(() => {
    setCompleted(props.partner.completed);
  }, [props.partner]);

  async function toggleCompleted() {
    // Optimistic update
    setCompleted(!completed);

    const res = await fetch("/api/setCompleted", {
      method: "POST",
      body: JSON.stringify({ id: props.partner.id, completed: !completed }),
    });
    const partner = await res.json();

    setCompleted((await parseOne(partner)).completed);
  }

  const completeColor = tw`bg-green-500 hover:bg-green-600 text-gray-200`;
  const incompleteColor = tw`bg-gray-200 hover:bg-gray-100 text-gray-800`;
  return (
    <button
      {...props}
      className={tw`text-2xl hover:cursor-pointer m-4 p-6 ${
        completed ? completeColor : incompleteColor
      } rounded-xl ${props.className}`}
      onClick={() => toggleCompleted()}
    >
      {props.partner.name}
    </button>
  );
}
