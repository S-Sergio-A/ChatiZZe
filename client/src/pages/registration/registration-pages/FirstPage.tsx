import { ChangeEvent, Dispatch, Fragment, SetStateAction, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { CountryDropdown } from "../../../components/dropdown/CountryDropdown";
import { Input } from "../../../components/input/Input";

interface FirstPageProps {
  phoneNumber: string;
  phoneNumberError: string;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
}

export const FirstPage = ({ phoneNumber, setPhoneNumber, phoneNumberError }: FirstPageProps) => {
  const [t] = useTranslation();
  const userStartedToInputRef = useRef<any>(null);

  useEffect(() => {
    userStartedToInputRef.current = "false";
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (phoneNumber.length > 4) userStartedToInputRef.current = "true";

    let targetValue = event.target.value;

    if (targetValue.substring(0, 1) !== "+") {
      targetValue = "+" + targetValue;
    }
    setPhoneNumber(targetValue.replace(/[^+0-9]+/g, ""));
  }

  return (
    <Fragment>
      <CountryDropdown
        onClick={(value) => {
          if (userStartedToInputRef.current && userStartedToInputRef.current === "false") setPhoneNumber(value);
        }}
        phoneCode={phoneNumber.substring(0, 4)}
      />
      <Input
        labelText={t("label.phone")}
        errorIdentifier={phoneNumberError}
        errorLabelText={phoneNumberError}
        onChange={handleChange}
        inputId="tel"
        name="tel"
        inputMode="tel"
        autoComplete="tel"
        max={18}
        required
        tooltipText={t("tooltip.phone")}
        value={phoneNumber}
      />
    </Fragment>
  );
};
