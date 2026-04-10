import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TransitionProps {
  show: boolean;
  children?: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

export const Transition = ({ show, children, className }: TransitionProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
