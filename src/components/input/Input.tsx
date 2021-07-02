import React from "react";
import { InputTooltip } from "../tooltip/Tooltip";
import { BasicInputProps, InputWithTooltipProps } from "./types/InputTypes";
import "./Input.css";

export const Input = ({
  autoComplete = "off",
  errorIdentifier,
  errorLabelText,
  disabled = false,
  inputId,
  inputMode = "text",
  name = "",
  onBlur,
  onChange,
  required = false,
  labelText,
  max = undefined,
  min = undefined,
  overlayPlacement = "top",
  tooltipId,
  tooltipText,
  value
}: BasicInputProps & InputWithTooltipProps) => {
  return (
    <React.Fragment>
      <label htmlFor={inputId} className="form-l flex a-s-f-s f-w h6-s" tabIndex={-1}>
        {labelText}
      </label>
      <div className={`form-i-r grid f-w ${inputMode === "tel" ? "tel-i" : ""}`}>
        <input
          autoComplete={autoComplete}
          name={name}
          inputMode={inputMode}
          disabled={disabled}
          onBlur={onBlur}
          onChange={onChange}
          required={required}
          min={min}
          max={max}
          value={value}
        />
        <InputTooltip tooltipId={tooltipId} tooltipText={tooltipText} overlayPlacement={overlayPlacement} />
      </div>
      <p className={errorIdentifier ? "form-l-e it flex a-s-f-s f-w copyright" : "none"}>{errorLabelText ? errorLabelText : null}</p>
    </React.Fragment>
  );
};
