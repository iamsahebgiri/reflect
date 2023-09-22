import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useTextToSpeech from "@/hooks/use-text-to-speech";
import { useCurrentThought } from "@/store";
import dayjs from "@/lib/dayjs";

interface ThoughtProps {
  id: string;
  timestamp: string;
  value: string;
  // speak: (text: string) => void;
}

export default function Thought({ value, id, timestamp }: ThoughtProps) {
  const { speak } = useTextToSpeech();
  const [isHovered, setHovered] = useState<boolean>(false);
  const { setCurrentThoughtId } = useCurrentThought();

  const handleSpeak = () => {
    if (value) {
      speak(value);
    }
  };

  return (
    <div
      onClick={handleSpeak}
      onMouseEnter={() => {
        setHovered(true);
        setCurrentThoughtId(id);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      role="button"
      style={{
        WebkitTapHighlightColor: "transparent",
      }}
      className="z-10 relative p-3 px-3 w-full rounded-lg select-none"
      data-id={id}
    >
      <AnimatePresence>
        {isHovered ? (
          <motion.time
            initial={{ opacity: 0, left: -50 }}
            animate={{ opacity: 1, left: -60 }}
            className="absolute text-xs -z-10 hidden md:block text-subtitle"
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, left: -50 }}
            dateTime={timestamp}
          >
            {dayjs(timestamp).fromNow(true)}
          </motion.time>
        ) : null}
      </AnimatePresence>

      <div className="whitespace-pre-wrap text-title">{value}</div>
      <AnimatePresence>
        {isHovered ? (
          <motion.div
            layoutId="bubble"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="-z-10 bg-surface absolute inset-0 rounded-lg"
            transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
            exit={{ opacity: 0, scale: 0.95 }}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
