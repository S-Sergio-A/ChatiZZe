import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../Button";
import "./LanguageButton.css";
import { changeLang } from "../../../utils/i18n/i18n";
import { languages } from "../../../utils/i18n/Langs";

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
        className={`${buttonActive ? "active" : ""} btn-pr btn-lang d-t`}
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
          <img src="http://localhost:3000/icons/world.svg" alt="" className="icon" />
        </span>
      </Button>
      <div className={`lang-drop ${toggle ? "flex j-c-c a-i-c f-f-c-n" : "none"}`} ref={menuRef ? menuRef : undefined}>
        {languages.map((item, index) => (
          <button
            key={index}
            aria-label={t(`navbar.ariaLabel.langButton.${item}}`)}
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

export const setLanguageCookie = (event: React.MouseEvent<HTMLButtonElement>, history: any) => {
  const target = event.target;
  let language = "en";

  // @ts-ignore
  if (target.matches("button img")) {
    // @ts-ignore
    language = target.parentElement.getAttribute("data-lang");

    changeLang(language);
  } else {
    // @ts-ignore
    if (target.matches("button")) {
      // @ts-ignore
      language = target.getAttribute("data-lang");

      changeLang(language);
    }
  }

  const pathname = location.pathname.split("/");
  pathname[1] = language;
  history.push({ pathname: pathname.join("/") });
};
