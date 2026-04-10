import React, { useEffect, useRef } from "react";
import { Transition } from "../Transition";

interface ModalProps {
  children: React.ReactNode;
  id?: string;
  ariaLabel?: string;
  show: boolean;
  handleClose: () => void;
}

const Modal = ({ children, id, ariaLabel, show, handleClose }: ModalProps) => {
  const modalContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!show || modalContent.current?.contains(target as Node)) return;
      handleClose();
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [show, handleClose]);

  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (key === "Escape") handleClose();
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [handleClose]);

  return (
    <>
      <Transition
        className="fixed inset-0 z-50 bg-white bg-opacity-75 transition-opacity backdrop-blur-sm"
        show={show}
        aria-hidden="true"
      />
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center transform px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabel}
        show={show}
      >
        <div
          className="bg-white overflow-auto max-w-6xl w-full max-h-full"
          ref={modalContent}
        >
          {children}
        </div>
      </Transition>
    </>
  );
};

export default Modal;
