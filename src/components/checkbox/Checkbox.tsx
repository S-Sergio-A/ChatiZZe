import React, { useEffect, useRef, useState } from "react";
import useKeyDown from "../../utils/hooks/useKeyDown";
import "./Checkbox.css";

interface CheckboxProps {
  id?: string;
  className?: string;
  onClick: any;
  reverseLayout?: boolean;
  isChecked?: boolean;
  children?: any;
}

const Checkbox = ({ id = undefined, className = "", onClick, reverseLayout = false, isChecked = false, children }: CheckboxProps) => {
  const [nativeFocused, setNativeFocused] = useState(false);
  const [checked, setChecked] = useState(false);
  const customCheckboxRef = useRef<any>(null);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  useEffect(() => {
    function nativeWasChecked(e: FocusEvent) {
      if (customCheckboxRef.current) {
        if (customCheckboxRef.current === document.activeElement) {
          setNativeFocused(true);
        } else {
          setNativeFocused(false);
        }
      }
    }

    document.addEventListener("focusin", nativeWasChecked);
    return () => {
      document.removeEventListener("focusin", nativeWasChecked);
    };
  }, [customCheckboxRef]);

  useKeyDown(
    "Space",
    () => {
      if (customCheckboxRef.current && customCheckboxRef.current === document.activeElement) {
        setNativeFocused(!nativeFocused);
        onClick();
      }
    },
    [customCheckboxRef]
  );

  return (
    <div
      id={id}
      className={`ch-wr flex a-i-c ${nativeFocused ? " focused" : ""} ${reverseLayout ? "j-c-s-b" : "j-c-f-s"} f-f-r-n ${
        reverseLayout ? "reverse" : ""
      }`}
      onClick={() => {
        setChecked(!checked);
        onClick();
      }}
    >
      <div className={`checkbox-c ${className}`}>
        <input
          type="checkbox"
          className="h-checkbox"
          checked={checked}
          tabIndex={-1}
          onChange={() => {
            setChecked(!checked);
            onClick();
          }}
        />
        <div
          className={`s-checkbox ${checked ? "checked" : ""} flex j-c-c a-i-c`}
          onClick={() => {
            setChecked(!checked);
            onClick();
          }}
          ref={customCheckboxRef}
          role="checkbox"
          aria-checked={checked}
          tabIndex={0}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 511.999 511.999"
            width="20px"
            height="20px"
            className="a-s-c j-s-c"
            style={checked ? { visibility: "visible" } : { visibility: "hidden" }}
          >
            <path
              d="M506.231,75.508c-7.689-7.69-20.158-7.69-27.849,0l-319.21,319.211L33.617,269.163c-7.689-7.691-20.158-7.691-27.849,0
              c-7.69,7.69-7.69,20.158,0,27.849l139.481,139.481c7.687,7.687,20.16,7.689,27.849,0l333.133-333.136
              C513.921,95.666,513.921,83.198,506.231,75.508z"
            />
          </svg>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Checkbox;
