"use client";
import { useEffect } from "react";

export default function FormModal({ onClose, isOpen, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="w-screen h-screen fixed top-0 right-0 inset-0 flex items-center justify-center z-50">
          <div
            className="w-full h-full bg-black/80 fixed top-0 left-0 z-0"
            onClick={onClose}
          />
          <div className="z-10 max-h-screen overflow-y-auto">{children}</div>
        </div>
      )}
    </>
  );
}
