import React, { useEffect, useRef, useState } from "react";
import { TooltipOverlay } from "../tooltip/Tooltip";
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
  tooltipText,
  value
}: BasicInputProps & InputWithTooltipProps) => {
  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = useRef(null);

  function useFocusListener(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      function handleFocusIn() {
        if (ref.current && ref.current === document.activeElement) {
          setInputFocused(true);
        } else {
          setInputFocused(false);
        }
      }

      function handleClickOutOfInput(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setInputFocused(false);
        }
      }

      document.addEventListener("click", handleClickOutOfInput);
      document.addEventListener("focusin", handleFocusIn);
      return () => {
        document.removeEventListener("click", handleClickOutOfInput);
        document.removeEventListener("focusin", handleFocusIn);
      };
    }, [ref]);
  }

  useFocusListener(inputRef);

  return (
    <React.Fragment>
      <div className="form-i-r grid f-w input-con">
        <div className="label-container">
          <label
            htmlFor={inputId}
            className={`${inputFocused || value.length !== 0 ? "transform-label" : ""} form-l flex a-s-f-s h6-s`}
            tabIndex={-1}
          >
            {labelText}
          </label>
        </div>
        <input
          id={inputId}
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
          ref={inputRef}
        />
        <p className={errorIdentifier ? "form-l-e it flex a-s-f-s f-w copyright" : "none"}>{errorLabelText ? errorLabelText : null}</p>
        <TooltipOverlay overlayPlacement={overlayPlacement} tooltipText={tooltipText} show={inputFocused} inputId={inputId} />
      </div>
    </React.Fragment>
  );
};
