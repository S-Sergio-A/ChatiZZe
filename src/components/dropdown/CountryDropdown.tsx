import React, { ChangeEvent, Dispatch, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useDropdownNavigation from "../../utils/hooks/useDropdownNavigation";
import countries from "../../utils/identification/countries.json";
import useOutsideClick from "../../utils/hooks/useOutsideClick";
import { Button } from "../button/Button";
import "./CountryDropdown.css";

export const CountryDropdown = ({ onClick, phoneCode }: { onClick: Dispatch<React.SetStateAction<string>>; phoneCode: string }) => {
  const [t] = useTranslation();

  const [listOfCountries, setListOfCountries] = useState(countries);
  const [country, setCountry] = useState("");
  const [cursor, setCursor] = useState(0);

  const [inputFocused, setInputFocused] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  useEffect(() => {
    const threeDigitsPhoneCode = phoneCode.substring(0, 4);
    const twoDigitsPhoneCode = phoneCode.substring(0, 3);
    const oneDigitPhoneCode = phoneCode.substring(0, 2);

    const oneDigitCountries = countries.filter((item) => item.phone_code === oneDigitPhoneCode);
    const twoDigitsCountries = countries.filter((item) => item.phone_code === twoDigitsPhoneCode);
    const threeDigitsCountries = countries.filter((item) => item.phone_code === threeDigitsPhoneCode);

    const filteredCountries = [...threeDigitsCountries, ...twoDigitsCountries, ...oneDigitCountries];

    if (filteredCountries.length !== 0) {
      setCountry(filteredCountries[0].name);
      onClick(filteredCountries[0].phone_code);
    }
  }, [phoneCode]);

  useEffect(() => {
    if (country.length === 0) {
      setListOfCountries(countries);
    }
  }, [country]);

  function chooseCountry(event: ChangeEvent<HTMLInputElement>): void {
    let searchResults: { name: string; code: string; phone_code: string }[] = [];
    countries.filter((item) => {
      const nameParts = item.name.split(" ");

      for (let i = 0; i < nameParts.length; i++) {
        if (nameParts[i].toLowerCase().substring(0, event.target.value.length) === event.target.value.toLowerCase()) {
          searchResults.push(item);
        }
      }
    });

    setCountry(event.target.value);
    setListOfCountries(searchResults);
    setCursor(0);
  }

  function onListItemClick(countryName: string, countryPhoneCode: string): void {
    setCountry(countryName);
    onClick(countryPhoneCode);
    // @ts-ignore
    inputRef.current.blur();
    setInputFocused(false);
  }

  useDropdownNavigation({
    focused: inputFocused,
    list: listOfCountries,
    cursor,
    setCursor,
    onEnterClick: () => onListItemClick(listOfCountries[cursor].name, listOfCountries[cursor].phone_code),
    deps: []
  });

  useOutsideClick(inputRef, () => setInputFocused(false));

  return (
    <React.Fragment>
      <div className="form-i-r grid f-w input-con">
        <div className="label-container">
          <label
            htmlFor="country-name"
            className={`${inputFocused || country.length !== 0 ? "transform-label" : ""} form-l flex a-s-f-s h6-s`}
            tabIndex={-1}
          >
            {t("country")}
          </label>
        </div>
        <input
          id="country-name"
          ref={inputRef}
          name="country-name"
          inputMode="text"
          disabled={false}
          onChange={chooseCountry}
          onBlur={() => onListItemClick(listOfCountries[cursor].name, listOfCountries[cursor].phone_code)}
          onClick={() => setInputFocused(true)}
          required
          autoComplete="off"
          value={country}
          aria-expanded={inputFocused}
        />
        <div
          className={`${firstRender ? "hidden" : ""} ${inputFocused ? "show-dropdown" : "hide-dropdown"} country-dropdown`}
          ref={dropdownRef}
        >
          <ul role="menu" className="flex j-c-f-s a-i-c f-f-c-n">
            {listOfCountries.map((item, index) => (
              <ListItem
                active={cursor === index}
                key={index}
                countryName={item.name}
                countryCode={item.code}
                countryPhoneCode={item.phone_code}
                onClick={onListItemClick}
              />
            ))}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

const ListItem = ({
  active,
  countryName,
  countryPhoneCode,
  countryCode,
  onClick
}: {
  active: boolean;
  countryName: string;
  countryPhoneCode: string;
  countryCode: string;
  onClick: any;
}) => {
  const [t] = useTranslation();
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      // @ts-ignore
      ref.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }
  }, [active]);

  return (
    <li className="f-w" role="menuitem">
      <Button
        onClick={() => onClick(countryName, countryPhoneCode)}
        type="button"
        layoutType="grid"
        className={`${active ? "active" : ""} f-w btn-sec`}
        buttonRef={ref}
      >
        <img
          src={`https://www.countryflags.io/${countryCode}/flat/48.png`}
          alt={`${countryName} ${t("flag")}`}
          className="icon-flag flex j-c-c a-i-c"
        />
        <span className="country f-h flex j-c-c a-i-c">{countryName}</span>
        <span className="tel-code f-h flex j-c-c a-i-c">{countryPhoneCode}</span>
      </Button>
    </li>
  );
};
