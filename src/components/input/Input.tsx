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
  type = "text",
  required = false,
  labelText,
  max = undefined,
  min = undefined,
  overlayPlacement = "top",
  tooltipText,
  showTip = true,
  setInputRef,
  value
}: BasicInputProps & InputWithTooltipProps) => {
  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (setInputRef && inputRef.current) {
      setInputRef(inputRef);
    }
  }, [inputRef]);

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
            className={`${
              inputFocused || (value && value.length !== 0) || (inputRef.current && inputRef.current.value.length !== 0)
                ? "transform-label"
                : ""
            } form-l flex a-s-f-s h6-s`}
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
          type={type}
          min={min}
          max={max}
          value={
            value ? value : inputRef.current && inputRef.current.value.length !== 0 && !inputFocused ? inputRef.current.value : undefined
          }
          ref={inputRef}
          className={
            inputFocused || (value && value.length !== 0) || (inputRef.current && inputRef.current.value.length !== 0) ? "notEmpty" : ""
          }
        />
        <p className={errorIdentifier ? "form-l-e it flex a-s-f-s f-w copyright" : "none"}>{errorLabelText ? errorLabelText : null}</p>
        {showTip ? (
          <TooltipOverlay
            overlayPlacement={overlayPlacement}
            tooltipText={tooltipText ? tooltipText : ""}
            show={inputFocused}
            inputId={inputId}
          />
        ) : null}
      </div>
    </React.Fragment>
  );
};
