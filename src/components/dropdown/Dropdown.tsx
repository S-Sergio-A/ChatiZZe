import React, { ChangeEvent, Dispatch, useEffect, useRef, useState } from "react";
import "./Dropdown.css";
import countries from "../../utils/identification/countries.json";
import { Button } from "../button/Button";

export const CountryDropdown = ({ onClick, phoneCode }: { onClick: Dispatch<React.SetStateAction<string>>; phoneCode: string }) => {
  const [listOfCountries, setListOfCountries] = useState(countries);
  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState("");
  const [cursor, setCursor] = useState(0);

  const [inputFocused, setInputFocused] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const phoneCodeRef = useRef<string | null>(null);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  useEffect(() => {
    if (phoneCodeRef.current) {
      if (phoneCodeRef.current !== phoneCode) {
        setCountry("");
      }
    }

    let filteredCountries = countries.filter((item) => item.phone_code === phoneCode);

    if (filteredCountries.length === 0) {
      const twoDigitsPhoneCode = phoneCode.substring(0, 2);

      filteredCountries = countries.filter((item) => item.phone_code === twoDigitsPhoneCode);
    }

    if (filteredCountries.length === 0) {
      const oneDigitPhoneCode = phoneCode.substring(0, 1);

      filteredCountries = countries.filter((item) => item.phone_code === oneDigitPhoneCode);
    }

    if (filteredCountries.length !== 0) {
      setCountry(filteredCountries[0].name);
      phoneCodeRef.current = filteredCountries[0].name;
    }
  }, [phoneCode]);

  useEffect(() => {
    if (country.length === 0) {
      setListOfCountries(countries);
    }
  }, [country]);

  function useFocusListener(ref: React.MutableRefObject<any>, dropdownRef: React.MutableRefObject<any>) {
    useEffect(() => {
      function handleFocusIn() {
        if (ref.current && ref.current === document.activeElement) {
          setInputFocused(true);
        }
      }

      function handleClickOutOfDropdown(event: any) {
        if (ref.current && !ref.current.contains(event.target) && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setInputFocused(false);
        }
      }

      document.addEventListener("click", handleClickOutOfDropdown);
      document.addEventListener("focusin", handleFocusIn);
      return () => {
        document.removeEventListener("click", handleClickOutOfDropdown);
        document.removeEventListener("focusin", handleFocusIn);
      };
    }, [ref]);
  }

  useFocusListener(inputRef, dropdownRef);

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
  }

  function handleKeyDown(event: any) {
    if (event.code === "ArrowUp" && cursor > 0) {
      setCursor(cursor - 1);
    } else if (event.code === "ArrowDown" && cursor < listOfCountries.length - 1) {
      setCursor(cursor + 1);
    } else if (event.code === "Enter") {
      onListItemClick(listOfCountries[cursor].name, listOfCountries[cursor].phone_code);
    }
  }

  function onListItemClick(countryName: string, countryPhoneCode: string): void {
    setCountry(countryName);
    onClick(countryPhoneCode);
    // @ts-ignore
    inputRef.current.blur();
    setInputFocused(false);
  }

  return (
    <React.Fragment>
      <div className="form-i-r grid f-w input-con">
        <div className="label-container">
          <label
            htmlFor="country-name"
            className={`${inputFocused || country.length !== 0 ? "transform-label" : ""} form-l flex a-s-f-s h6-s`}
            tabIndex={-1}
          >
            Country
          </label>
        </div>
        <input
          id="country-name"
          ref={inputRef}
          name="country-name"
          inputMode="text"
          disabled={false}
          onChange={chooseCountry}
          onKeyDown={handleKeyDown}
          required
          value={country}
          aria-expanded={inputFocused}
        />
        <p className={countryError ? "form-l-e it flex a-s-f-s f-w copyright" : "none"}>{countryError ? countryError : null}</p>
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
          alt={`${countryName} flag`}
          className="icon-flag flex j-c-c a-i-c"
        />
        <span className="country f-h flex j-c-c a-i-c">{countryName}</span>
        <span className="tel-code f-h flex j-c-c a-i-c">{countryPhoneCode}</span>
      </Button>
    </li>
  );
};
