import React, { ChangeEvent, Dispatch, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "../../../components/input/Input";

interface ThirdPageProps {
  password: string;
  passwordVerification: string;
  setPassword: Dispatch<React.SetStateAction<string>>;
  setPasswordVerification: Dispatch<React.SetStateAction<string>>;
}

export const ThirdPage = ({ password, setPassword, passwordVerification, setPasswordVerification }: ThirdPageProps) => {
  const [passwordError, setPasswordError] = useState("");
  const [passwordVerificationError, setPasswordVerificationError] = useState("");

  const [t] = useTranslation();

  const passwordOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const passwordVerificationOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordVerification(event.target.value);
  };

  const validatePasswordOnBlur = () => {
    setPasswordError("");

    // validateTelNum()
  };

  const validatePasswordVerificationOnBlur = () => {
    setPasswordVerificationError("");

    // validateTelNum()
  };

  return (
    <React.Fragment>
    <Input
          labelText="Password"
          errorIdentifier={passwordError}
          errorLabelText={passwordError}
          onBlur={validatePasswordOnBlur}
          onChange={passwordOnChange}
          inputId="password"
          name="password"
          inputMode="text"
          autoComplete="new-password"
          min={8}
          max={50}
          required={true}
          tooltipText={t("tooltip.password")}
          value={password}
        />
      <Input
        labelText="Password Verification"
        errorIdentifier={passwordVerificationError}
        errorLabelText={passwordVerificationError}
        onBlur={validatePasswordVerificationOnBlur}
        onChange={passwordVerificationOnChange}
        inputId="password-verification"
        name="password-verification"
        inputMode="text"
        autoComplete="current-password"
        min={8}
        max={50}
        required={true}
        tooltipText={t("tooltip.passwordVer")}
        value={passwordVerification}
      />
    </React.Fragment>
  );
};
