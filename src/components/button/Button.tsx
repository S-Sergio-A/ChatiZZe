import React from "react";
import "./Button.css";

interface ButtonProps {
  ariaLabel?: string;
  buttonRef?: any;
  className?: string;
  disabled?: boolean;
  name?: string;
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
  onClick = undefined,
  onMouseEnter = undefined,
  onMouseLeave = undefined,
  tabIndex = 1,
  type = "button",
  children
}: ButtonProps) => {
  return (
    <button
      aria-label={ariaLabel}
      className={`btn flex j-c-c a-i-c t-c ${className}`}
      disabled={disabled}
      name={name}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={buttonRef}
      type={type}
      tabIndex={tabIndex}
    >
      {children}
    </button>
  );
};
