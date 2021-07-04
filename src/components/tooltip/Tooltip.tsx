import React from "react";
import "./TooltipOverlay.css";

interface InputTooltipProps {
  overlayPlacement: "top" | "bottom" | "right" | "left";
  tooltipText: string;
  show: boolean;
  inputId: string;
}

export const TooltipOverlay = ({ show, overlayPlacement = "bottom", tooltipText = "This is a tooltip", inputId }: InputTooltipProps) => {
  return (
    <div
      role="tooltip"
      className={`${overlayPlacement} ${show ? "show-tooltip" : "hide-tooltip"} tooltip flex a-i-c j-c-s-b f-f-c-n`}
      aria-labelledby={inputId}
      aria-live="polite"
    >
      <p className="helper">{tooltipText}</p>
    </div>
  );
};
