import useOutsideHover from "@/hooks/use-outside-hover";
import { useCommandMenuStore, useCurrentThought, useThoughts } from "@/store";
import React, { useRef, useState } from "react";
import Thought from "@/components/thought";

export default function Thoughts() {
  const { thoughts } = useThoughts();
  const thoughtsContainerRef = useRef<HTMLDivElement>(null);

  const { open } = useCommandMenuStore();
  const { clearCurrentThoughtId } = useCurrentThought();

  const handleOutsideHover = () => {
    if (!open) {
      clearCurrentThoughtId();
    }
  };

  useOutsideHover(thoughtsContainerRef, handleOutsideHover);

  if (thoughts.length === 0) {
    return (
      <div className="py-12 text-center text-subtitle">
        <p>Hmm, is your mind really empty?</p>
      </div>
    );
  }

  return (
    <div ref={thoughtsContainerRef} className="space-y-2">
      {thoughts.map((thought) => (
        <Thought key={thought.id} {...thought} />
      ))}
    </div>
  );
}
