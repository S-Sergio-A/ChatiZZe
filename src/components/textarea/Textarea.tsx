import React, { ChangeEventHandler, FocusEventHandler } from "react";

interface TextareaProps {
  className?: string;
  disabled?: boolean;
  errorIdentifier: string;
  errorLabelText: string;
  id?: string;
  labelText: string;
  name: string;
  onBlur: FocusEventHandler<HTMLTextAreaElement> | undefined;
  onChange: ChangeEventHandler<HTMLTextAreaElement> | undefined;
  required?: boolean;
  textareaLimit?: number;
  value: string;
}

export const Textarea = ({
  className = "",
  disabled = false,
  errorIdentifier = "",
  errorLabelText = "",
  id = "",
  labelText = "",
  name = "",
  onBlur = undefined,
  onChange = undefined,
  required = false,
  textareaLimit = 999999,
  value = ""
}: TextareaProps) => {
  return (
    <React.Fragment>
      <div className="Form-Ta-R Grid F-W">
        <label htmlFor={id} className="Form-L flex A-S-F-S F-W h6-size" tabIndex={-1}>
          {labelText}
        </label>
        <textarea
          id={id}
          className={`${errorIdentifier ? "I-E" : ""} Ta F-W ${className}`}
          disabled={disabled}
          maxLength={textareaLimit}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          value={value}
        />
      </div>
      <p className={errorIdentifier ? "Form-L-E Italic flex A-S-F-S F-W copyright" : "None"}>{errorLabelText ? errorLabelText : null}</p>
    </React.Fragment>
  );
};
