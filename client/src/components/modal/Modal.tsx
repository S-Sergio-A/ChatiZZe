import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import CloseButton from "../button/close/CloseButton";
import "./Modal.css";
import { useTranslation } from "react-i18next";

export default function Modal({
  show,
  className = "",
  onModalClose,
  children
}: {
  show: boolean;
  className?: string;
  onModalClose: any;
  children: any;
}) {
  const modalRef = useRef<any>(null);

  useEffect(() => {
    function keyListener(e: KeyboardEvent) {
      const listener = keyListenersMap.get(e.keyCode);
      return listener && listener(e);
    }

    if (show) {
      document.addEventListener("keydown", keyListener);

      return () => document.removeEventListener("keydown", keyListener);
    }
    return () => null;
  });

  const handleTabKey = (e: KeyboardEvent) => {
    const focusableModalElements = modalRef.current.querySelectorAll("a[href], button, textarea, input, select");
    const firstElement = focusableModalElements[0];
    const lastElement = focusableModalElements[focusableModalElements.length - 1];

    if (e.ctrlKey || e.altKey) {
      return;
    }

    if (e.keyCode === 9) {
      if (e.shiftKey && e.target === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }

      if (!e.shiftKey && e.target === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  const keyListenersMap = new Map([
    [27, onModalClose],
    [9, handleTabKey]
  ]);

  if (show) {
    return createPortal(
      <div className="modal-container flex a-i-c j-c-c" role="dialog" aria-modal="true">
        <div className={`modal-content flex a-i-c j-c-s-b f-f-c-n ${className}`} ref={modalRef}>
          {children}
        </div>
      </div>,
      document.body
    );
  }

  return null;
}

Modal.Header = function ModalHeader({ className = "", layoutType = "flex", onCloseModal, children }: any) {
  const [t] = useTranslation();
  return (
    <div className={`modal-header ${className} ${layoutType === "flex" ? "flex a-i-c j-c-s-b f-f-r-n" : "grid"} f-w`}>
      {children}
      <CloseButton ariaLabel={t("modal.close")} onClick={onCloseModal} />
    </div>
  );
};

Modal.Body = function ModalBody({ className = "", children }: any) {
  return <div className={`modal-body f-w ${className}`}>{children}</div>;
};

Modal.Footer = function ModalFooter({ className = "", layoutType = "flex", children }: any) {
  return <div className={`modal-footer f-w ${layoutType === "flex" ? "flex a-i-c j-c-c f-f-r-n" : "grid"} ${className}`}>{children}</div>;
};
