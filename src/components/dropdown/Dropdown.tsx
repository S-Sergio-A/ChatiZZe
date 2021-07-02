import React, { Dispatch, useEffect, useRef, useState } from "react";
import "./Dropdown.css";

interface CountryDropdownProps {
  onClick: Dispatch<React.SetStateAction<string>>;
  required?: boolean;
}

export const CountryDropdown = ({ onClick, required = false }: CountryDropdownProps) => {
  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState("");

  const [validateCountry, setValidateCountry] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    const countryList = ["Afghanistan", "Ukraine"];

    if (!countryList.includes(country)) {
      setCountryError("Incorrect country name");
    }

    setValidateCountry(false);
  }, [validateCountry]);

  function useFocusListener(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      function handleFocusIn() {
        if (ref.current && ref.current === document.activeElement) {
          setShowDropdown(true);
        }
      }

      function handleFocusOut() {
        if (ref.current && ref.current !== document.activeElement) {
          setShowDropdown(false);
        }
      }

      document.addEventListener("focusin", handleFocusIn);
      document.addEventListener("focusout", handleFocusOut);
      return () => {
        document.removeEventListener("focusin", handleFocusIn);
        document.removeEventListener("focusout", handleFocusOut);
      };
    }, [ref]);
  }

  useFocusListener(inputRef);

  function chooseCountry(val: any): void {
    setCountry(val);
  }

  function onBlur() {
    setValidateCountry(true);
  }

  return (
    <div className="input-con">
      <label htmlFor="country-name" className="form-l flex a-s-f-s f-w h6-s" tabIndex={-1}>
        Country
      </label>
      <div className="border" />
      <input
        id="country-name"
        ref={inputRef}
        autoComplete="country-name"
        name="country-name"
        inputMode="text"
        disabled={false}
        onBlur={onBlur}
        onChange={chooseCountry}
        required={required}
        value={country}
      />
      {showDropdown ? (
        <div className="country-dropdown">
          <ul className="flex j-c-f-s a-i-c f-f-c-n">
            <ListItem countryName="Afghanistan" countryCode="+93" countryFlag="/flag" setCountry={setCountry} setCountryCode={onClick} />
          </ul>
        </div>
      ) : null}
      <p className={countryError ? "form-l-e it flex a-s-f-s f-w copyright" : "none"}>{countryError ? countryError : null}</p>
    </div>
  );
};

const ListItem = ({
  countryName,
  countryCode,
  countryFlag,
  setCountry,
  setCountryCode
}: {
  countryName: string;
  countryCode: string;
  countryFlag: string;
  setCountry: Dispatch<React.SetStateAction<string>>;
  setCountryCode: Dispatch<React.SetStateAction<string>>;
}) => {
  const listItemOnClick = () => {
    setCountry(countryName);
    setCountryCode(countryCode);
  };

  return (
    <li className="grid" onClick={listItemOnClick}>
      <img src={countryFlag} alt={`${countryName} flag`} className="icon-flag flex j-c-c a-i-c" />
      <span className="country flex j-c-c a-i-c">{countryName}</span>
      <span className="tel-code flex j-c-c a-i-c">{countryCode}</span>
    </li>
  );
};
