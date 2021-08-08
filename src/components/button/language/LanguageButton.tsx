import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { changeLang } from "../../../utils/i18n/i18n";
import { languages } from "../../../utils/i18n/Langs";
import { Button } from "../Button";
import "./LanguageButton.css";
import { Cookies } from "react-cookie";
import { cookieOptions } from "../../../utils/cookieOptions";

export default function LanguageButton() {
  const [toggle, setToggle] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const [clicksCount, setClicksCount] = useState(0);
  const [t] = useTranslation();
  const toggleRef = useRef(null);
  const menuRef = useRef(null);
  const location = useLocation();
  const history = useHistory();

  function useToggleListener(refOfMenu: React.MutableRefObject<any>, refOfToggle: React.MutableRefObject<any>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (refOfMenu.current && !(refOfMenu.current.contains(event.target) || refOfToggle.current.contains(event.target))) {
          setClicksCount(0);
          setToggle(false);
          setButtonActive(false);
        } else {
          setButtonActive(true);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [refOfMenu, refOfToggle]);
  }

  useToggleListener(menuRef, toggleRef);

  return (
    <React.Fragment>
      <Button
        className={`${buttonActive ? "active" : ""} btn-pr btn-r no-border btn-lang d-t`}
        type="button"
        onClick={() => {
          if (clicksCount !== 0) {
            setToggle(!(clicksCount % 2));
          } else {
            setToggle(true);
          }
          setClicksCount(clicksCount + 1);
        }}
        buttonRef={toggleRef}
        ariaLabel={t("navbar.ariaLabel.langButton")}
      >
        <span className="flex a-i-c j-c-c">
          <svg enableBackground="new 0 0 512 512" height="24px" viewBox="0 0 512 512" width="24px" xmlns="http://www.w3.org/2000/svg">
            <path d="m0 241h106.386c.985-37.555 5.577-72.935 13.235-105h-88.498c-16.938 31.615-28.909 67.24-31.123 105z" />
            <path d="m106.386 271h-106.386c2.214 37.76 14.185 73.385 31.123 105h88.499c-7.658-32.065-12.251-67.445-13.236-105z" />
            <path d="m241 241v-105h-90.361c-8.21 31.776-13.182 67.478-14.269 105z" />
            <path d="m241 106v-106c-32.847 9.174-61.943 51.143-81.145 106z" />
            <path d="m241 512v-106h-81.145c19.202 54.857 48.298 96.826 81.145 106z" />
            <path d="m271 0v106h81.145c-19.202-54.857-48.298-96.826-81.145-106z" />
            <path d="m375.63 241c-1.088-37.522-6.059-73.224-14.269-105h-90.361v105z" />
            <path d="m241 271h-104.63c1.088 37.524 6.059 73.224 14.269 105h90.361z" />
            <path d="m384.011 106h77.75c-31.049-42.473-74.76-78.355-125.684-95.257 19.571 23.104 35.94 57.847 47.934 95.257z" />
            <path d="m127.989 406h-77.75c31.049 42.473 74.76 78.355 125.684 95.257-19.571-23.104-35.94-57.847-47.934-95.257z" />
            <path d="m127.989 106c11.993-37.41 28.363-72.153 47.933-95.257-50.923 16.902-94.634 52.784-125.683 95.257z" />
            <path d="m384.011 406c-11.993 37.41-28.363 72.153-47.933 95.257 50.923-16.902 94.634-52.784 125.684-95.257z" />
            <path d="m271 271v105h90.361c8.21-31.776 13.182-67.476 14.269-105z" />
            <path d="m392.379 136c7.657 32.065 12.25 67.445 13.235 105h106.386c-2.214-37.76-14.185-73.385-31.123-105z" />
            <path d="m271 406v106c32.847-9.174 61.943-51.143 81.145-106z" />
            <path d="m512 271h-106.386c-.985 37.555-5.577 72.935-13.235 105h88.499c16.937-31.615 28.908-67.24 31.122-105z" />
          </svg>
        </span>
      </Button>
      <div className={`lang-drop ${toggle ? "flex j-c-c a-i-c f-f-c-n" : "none"}`} ref={menuRef ? menuRef : undefined}>
        {languages.map((item, index) => (
          <button
            key={index}
            aria-label={t(`navbar.ariaLabel.langButton.${item}`)}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => setLanguageCookie(event, history)}
            data-lang={item}
            className={`d-i flex j-c-c a-i-c icon-nav btn-sec ${location.pathname.split("/")[1] === item ? "active" : ""}`}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>
    </React.Fragment>
  );
}

export const setLanguageCookie = (event: any, history: any) => {
  const target = event.target;
  const cookie = new Cookies();
  let language = "en";

  if (target.matches("button img")) {
    language = target.parentElement.getAttribute("data-lang");
  } else if (target.matches("button")) {
    language = target.getAttribute("data-lang");
  }
  cookie.set("lang", { language }, cookieOptions(3600 * 24 * 30));
  changeLang(language);

  const pathname = location.pathname.split("/");
  pathname[1] = language;
  history.push({ pathname: pathname.join("/") });
};
