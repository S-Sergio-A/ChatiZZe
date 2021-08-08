import React, { ChangeEvent, Dispatch, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CountryDropdown } from "../../../components/dropdown/CountryDropdown";
import { Input } from "../../../components/input/Input";

interface FirstPageProps {
  phoneNumber: string;
  phoneNumberError: string;
  setPhoneNumber: Dispatch<React.SetStateAction<string>>;
}

export const FirstPage = ({ phoneNumber, setPhoneNumber, phoneNumberError }: FirstPageProps) => {
  const [t] = useTranslation();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    let targetValue = event.target.value;

    if (targetValue.substring(0, 1) !== "+") {
      targetValue = "+" + targetValue;
    }
    setPhoneNumber(targetValue.replace(/[^+0-9]+/g, ""));
  }

  return (
    <React.Fragment>
      <CountryDropdown onClick={(value) => setPhoneNumber(value)} phoneCode={phoneNumber.substring(0, 4)} />
      <Input
        labelText={t("label.phone")}
        errorIdentifier={phoneNumberError}
        errorLabelText={phoneNumberError}
        onChange={handleChange}
        inputId="tel"
        name="tel"
        inputMode="tel"
        autoComplete="tel"
        min={18}
        max={18}
        required
        tooltipText={t("tooltip.phone")}
        value={phoneNumber}
      />
    </React.Fragment>
  );
};
