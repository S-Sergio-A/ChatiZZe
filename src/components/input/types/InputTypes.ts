import { ChangeEventHandler, Dispatch, FocusEventHandler } from "react";

type BasicInputProps = {
  autoComplete?: string;
  disabled?: boolean;
  inputId: string;
  inputMode?: "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | undefined;
  name?: string;
  onBlur: FocusEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  max?: number;
  min?: number;
  value: string;
};

type InputWithTooltipProps = {
  required?: boolean;
  labelText: string;
  errorIdentifier: string;
  errorLabelText: string;
  overlayPlacement?: "top" | "bottom" | "right" | "left";
  tooltipId: string;
  tooltipText: string;
};

export type { BasicInputProps, InputWithTooltipProps };
