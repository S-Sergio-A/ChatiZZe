import React, { Dispatch, useState } from "react";
import { useTranslation } from "react-i18next";
import { CountryDropdown } from "../../../components/dropdown/Dropdown";
import { Input } from "../../../components/input/Input";

interface FirstPageProps {
  telNum: string;
  setTelNum: Dispatch<React.SetStateAction<string>>;
}

export const FirstPage = ({ telNum, setTelNum }: FirstPageProps) => {
  const [countryCode, setCountryCode] = useState("");
  const [telNumError, setTelNumError] = useState("");

  const [t] = useTranslation();

  const validateOnBlur = () => {
    setTelNumError("");

    // validateTelNum()
  };
  
  return (
    <React.Fragment>
      <CountryDropdown onClick={(value) => setCountryCode(value)} />
      <div className="Form-R Grid">
        <Input
          labelText="Phone number"
          errorIdentifier={telNumError}
          errorLabelText={telNumError}
          onBlur={validateOnBlur}
          onChange={(event) => setTelNum(event.target.value)}
          inputId="tel"
          name="tel"
          inputMode="tel"
          autoComplete="tel"
          min={18}
          max={18}
          required={true}
          tooltipId={t("tooltip.header.telNum")}
          tooltipText={t("tooltip.telNum")}
          value={telNum}
        />
      </div>
    </React.Fragment>
  );
};
