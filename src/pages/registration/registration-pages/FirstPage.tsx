import React, { ChangeEvent, Dispatch, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CountryDropdown } from "../../../components/dropdown/Dropdown";
import { Input } from "../../../components/input/Input";

interface FirstPageProps {
  telNum: string;
  setTelNum: Dispatch<React.SetStateAction<string>>;
}

export const FirstPage = ({ telNum, setTelNum }: FirstPageProps) => {
  const [countryPhoneCode, setCountryPhoneCode] = useState("");
  const [telNumError, setTelNumError] = useState("");

  const [t] = useTranslation();

  useEffect(() => {
    setTelNum(countryPhoneCode);
  }, [countryPhoneCode]);

  const validateOnBlur = () => {
    setTelNumError("");

    // validateTelNum()
  };
  
  //TODO inspect regex errors

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    let targetValue = event.target.value;

    if (targetValue.substring(0, 1) !== "+") {
      targetValue = "+" + targetValue;
    }
    setTelNum(targetValue.replace(/[^+{0, 1}0-9]+/g, ""));
  }

  return (
    <React.Fragment>
      <CountryDropdown onClick={(value) => setCountryPhoneCode(value)} phoneCode={telNum.substring(0, 3)} />
      <Input
        labelText="Phone number"
        errorIdentifier={telNumError}
        errorLabelText={telNumError}
        onBlur={validateOnBlur}
        onChange={handleChange}
        inputId="tel"
        name="tel"
        inputMode="tel"
        autoComplete="tel"
        min={18}
        max={18}
        required
        tooltipText={t("tooltip.telNum")}
        value={telNum}
      />
    </React.Fragment>
  );
};
