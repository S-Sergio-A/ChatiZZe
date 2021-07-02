import React, { MouseEventHandler, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Toast } from "react-bootstrap";
import { timer } from "rxjs";
import CloseButton from "../button/close/CloseButton";
import "./ToastMessage.css";

interface ToastMessageProps {
  className?: string;
  onClose: () => void;
  show: boolean;
  showTime?: number;
  toastHeader: string;
  toastText: string;
}

export const ToastMessage = ({
  className = undefined,
  onClose,
  show = false,
  showTime = 999999,
  toastHeader = '',
  toastText = ''
}: ToastMessageProps) => {
  const [t] = useTranslation();
  const [activateAnimation, setActivateAnimation] = useState(false);

  const toastAnimation = {
    transform: activateAnimation ? "translateY(0)" : "translateY(1000px)"
  };

  useEffect(() => {
    timer(1000).subscribe(() => setActivateAnimation(true));
  }, [show]);

  return (
    <div className="Toast-Wrapper Nunito" style={toastAnimation}>
      <Toast onClose={onClose} show={show} animation delay={showTime} className={className}>
        <Toast.Header className="J-C-S-B" closeButton={false}>
          <h2 className="h3-size">{toastHeader}</h2>
          <CloseButton onClick={onClose} ariaLabel={t("aria-label.removeItem")} />
        </Toast.Header>
        <Toast.Body className="helper Flex J-C-C a-i-c F-F-C-N">{toastText}</Toast.Body>
      </Toast>
    </div>
  );
};
