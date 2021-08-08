import React, { useEffect, useRef } from "react";
import "./LoadingOverlay.css";

interface LoadingOverlayProps {
  active: boolean;
  text: string;
  children?: any;
}
export const LoadingOverlay = ({ active, text, children }: LoadingOverlayProps) => {
  const spinnerRef = useRef(null);

  useEffect(() => {
    if (!active && spinnerRef.current) {
      // @ts-ignore
      setTimeout(() => spinnerRef.current && spinnerRef.current.remove(), 800);
    }
  }, [active]);

  return (
    <div className="load-ov-c f-w f-h">
      <div className={`sp flex j-c-c a-i-c f-f-c-n t-c f-w f-h ${active ? "ov-show " : "ov-hide "}`} ref={spinnerRef}>
        <svg className="sp">
          <circle cx="43" cy="43" r="38" />
        </svg>
        {text}
      </div>
      {children}
    </div>
  );
};
