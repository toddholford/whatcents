import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TickerLetterProps {
  original: string;
  alternate: string;
  interval?: number;
  delay?: number;
  startAfter?: number;
}

export const TickerLetter = ({
  original,
  alternate,
  interval = 4000,
  delay = 0,
  startAfter = 0,
}: TickerLetterProps) => {
  const [showAlternate, setShowAlternate] = useState(false);

  useEffect(() => {
    let toggleTimer: ReturnType<typeof setInterval>;
    const totalDelay = startAfter + delay;

    const start = setTimeout(() => {
      setShowAlternate(true);
      toggleTimer = setInterval(() => {
        setShowAlternate((prev) => !prev);
      }, interval);
    }, totalDelay);

    return () => {
      clearTimeout(start);
      clearInterval(toggleTimer);
    };
  }, [interval, delay, startAfter]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={showAlternate ? alternate : original}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="inline-block"
      >
        {showAlternate ? alternate : original}
      </motion.span>
    </AnimatePresence>
  );
};
