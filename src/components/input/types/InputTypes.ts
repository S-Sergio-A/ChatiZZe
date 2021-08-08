import { ChangeEventHandler, FocusEventHandler } from "react";

type BasicInputProps = {
  autoComplete?:
    | "on"
    | "off"
    | "name"
    | "honorific-prefix"
    | "given-name"
    | "additional-name"
    | "family-name"
    | "honorific-suffix"
    | "nickname"
    | "email"
    | "username"
    | "new-password"
    | "current-password"
    | "one-time-code"
    | "organization-title"
    | "organization"
    | "street-address"
    | "country"
    | "country-name"
    | "postal-code"
    | "cc-name"
    | "cc-given-name"
    | "cc-additional-name"
    | "cc-family-name"
    | "cc-number"
    | "cc-exp"
    | "cc-exp-month"
    | "cc-exp-year"
    | "cc-csc"
    | "cc-type"
    | "transaction-currency"
    | "transaction-amount"
    | "language"
    | "bday"
    | "bday-day"
    | "bday-month"
    | "bday-year"
    | "sex"
    | "tel"
    | "tel-country-code"
    | "tel-national"
    | "tel-area-code"
    | "tel-local"
    | "tel-extension"
    | "url"
    | "photo";
  disabled?: boolean;
  inputId: string;
  inputMode?:
    | "text"
    | "none"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search"
    | undefined;
  name?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  type?: "password" | "text" | "tel" | "email" | "search" | "color" | "checkbox" | "date" | "radio";
  max?: number;
  min?: number;
  setInputRef?: (value: any) => void;
  value?: string;
};

type InputWithTooltipProps = {
  showTip?: boolean;
  required?: boolean;
  labelText: string;
  errorIdentifier?: string;
  errorLabelText?: string;
  overlayPlacement?: "top" | "bottom" | "right" | "left";
  tooltipText?: string;
};

export type { BasicInputProps, InputWithTooltipProps };
