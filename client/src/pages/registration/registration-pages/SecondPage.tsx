import React, { ChangeEvent, Dispatch } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "../../../components/input/Input";

interface SecondPageProps {
  email: string;
  username: string;
  emailError: string;
  usernameError: string;
  setEmail: Dispatch<React.SetStateAction<string>>;
  setUsername: Dispatch<React.SetStateAction<string>>;
}

export const SecondPage = ({ email, setEmail, username, setUsername, emailError, usernameError }: SecondPageProps) => {
  const [t] = useTranslation();

  const usernameOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const emailOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <React.Fragment>
      <Input
        labelText={t("label.username")}
        errorIdentifier={usernameError}
        errorLabelText={usernameError}
        onChange={usernameOnChange}
        inputId="username"
        name="username"
        inputMode="text"
        autoComplete="username"
        required
        tooltipText={t("tooltip.username")}
        value={username}
      />
      <Input
        labelText={t("label.email")}
        errorIdentifier={emailError}
        errorLabelText={emailError}
        onChange={emailOnChange}
        inputId="email"
        name="email"
        inputMode="email"
        autoComplete="email"
        min={6}
        max={254}
        required={false}
        tooltipText={t("tooltip.email")}
        value={email}
      />
    </React.Fragment>
  );
};
