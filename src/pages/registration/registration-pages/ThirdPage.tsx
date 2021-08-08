import React, { ChangeEvent, Dispatch } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "../../../components/input/Input";

interface ThirdPageProps {
  password: string;
  passwordVerification: string;
  passwordError: string;
  passwordVerificationError: string;
  setPassword: Dispatch<React.SetStateAction<string>>;
  setPasswordVerification: Dispatch<React.SetStateAction<string>>;
}

export const ThirdPage = ({
  password,
  setPassword,
  passwordVerification,
  setPasswordVerification,
  passwordError,
  passwordVerificationError
}: ThirdPageProps) => {
  const [t] = useTranslation();

  const passwordOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const passwordVerificationOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordVerification(event.target.value);
  };

  return (
    <React.Fragment>
      <Input
        labelText={t("label.password")}
        errorIdentifier={passwordError}
        errorLabelText={passwordError}
        onChange={passwordOnChange}
        inputId="password"
        name="password"
        inputMode="text"
        autoComplete="new-password"
        type="password"
        min={8}
        max={50}
        required
        tooltipText={t("tooltip.password")}
        value={password}
      />
      <Input
        labelText={t("label.passwordVerification")}
        errorIdentifier={passwordVerificationError}
        errorLabelText={passwordVerificationError}
        onChange={passwordVerificationOnChange}
        inputId="password-verification"
        name="password-verification"
        inputMode="text"
        type="password"
        autoComplete="current-password"
        min={8}
        max={50}
        required
        tooltipText={t("tooltip.passwordVerification")}
        value={passwordVerification}
      />
    </React.Fragment>
  );
};
