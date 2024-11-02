import React from "react";
import "./Button.css";

interface ButtonProps {
  ariaLabel?: string;
  buttonRef?: any;
  className?: string;
  disabled?: boolean;
  name?: string;
  layoutType?: "flex" | "grid";
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  tabIndex?: number | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  children: any;
}

export const Button = ({
  ariaLabel = "",
  buttonRef = null,
  className = "",
  disabled = false,
  name = "",
  layoutType = "flex",
  onClick = undefined,
  onMouseEnter = undefined,
  onMouseLeave = undefined,
  tabIndex,
  type = "button",
  children
}: ButtonProps) => {
  return (
    <button
      aria-label={ariaLabel}
      className={`btn ${layoutType === "grid" ? "grid" : "flex j-c-c a-i-c"} t-c ${className}`}
      disabled={disabled}
      name={name}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={buttonRef}
      type={type}
      tabIndex={tabIndex ? tabIndex : undefined}
    >
      {children}
    </button>
  );
};
