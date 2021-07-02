import React, { ChangeEvent, Dispatch, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "../../../components/input/Input";

interface SecondPageProps {
  email: string;
  username: string;
  setEmail: Dispatch<React.SetStateAction<string>>;
  setUsername: Dispatch<React.SetStateAction<string>>;
}

export const SecondPage = ({ email, setEmail, username, setUsername }: SecondPageProps) => {
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [t] = useTranslation();

  const usernameOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const emailOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const validateUsernameOnBlur = () => {
    setUsernameError("");

    // validateTelNum()
  };

  const validateEmailOnBlur = () => {
    setEmailError("");

    // validateTelNum()
  };

  return (
    <div className="Form-R Grid">
      <div className="Form-R Grid">
        <Input
          labelText="Username"
          errorIdentifier={usernameError}
          errorLabelText={usernameError}
          onBlur={validateUsernameOnBlur}
          onChange={usernameOnChange}
          inputId="username"
          name="username"
          inputMode="text"
          autoComplete="username"
          required={true}
          tooltipId={t("tooltip.header.username")}
          tooltipText={t("tooltip.username")}
          value={username}
        />
      </div>
      <Input
        labelText="Email (optional)"
        errorIdentifier={emailError}
        errorLabelText={emailError}
        onBlur={validateEmailOnBlur}
        onChange={emailOnChange}
        inputId="email"
        name="email"
        inputMode="email"
        autoComplete="email"
        min={6}
        max={254}
        required={true}
        tooltipId={t("tooltip.header.email")}
        tooltipText={t("tooltip.email")}
        value={email}
      />
    </div>
  );
};
