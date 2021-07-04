import React, { useContext, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { MenuContext } from "../../context/menu/MenuContext";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import "./Menu.css";
import useOutsideClick from "../../utils/hooks/useOutsideClick";
import NavLink from "../link/NavLink";
import { Button } from "../button/Button";
import { AuthContext } from "../../context/auth/AuthContext";
import { languages } from "../../utils/i18n/Langs";
import { changeLang } from "../../utils/i18n/i18n";
import { setLanguageCookie } from "../button/language/LanguageButton";

export const Menu = () => {
  const [t] = useTranslation();
  const { show, showMenu, menuButtonRef } = useContext(MenuContext);
  const { logged } = useContext(AuthContext);
  const { width } = useWindowDimensions();
  const menuRef = useRef(null);
  const location = useLocation();
  const history = useHistory();
  
  useOutsideClick(menuRef, () => showMenu(false), menuButtonRef);

  useEffect(() => showMenu(false), [location]);

  useEffect(() => {
    if (width > 599) {
      showMenu(false);
    }
  }, [width]);

  const navbarMenuList = [
    <NavLink to={`/${i18n.language}/`}>Main</NavLink>,
    <NavLink to={`/${i18n.language}/features`}>Features</NavLink>,
    <NavLink to={`/${i18n.language}/faq`}>FAQ</NavLink>,
    !logged ? <NavLink to={`/${i18n.language}/locations`}>Try now!</NavLink> : null,
    <Button className="btn-i-l btn-sm f-w h6-s" onClick={() => showMenu(false)} aria-label={t("ariaLabel.closeMenu")}>
      {t("button.close")}
    </Button>,
    <div
      className="flex j-c-c a-i-c f-f-r-n"
      ref={menuRef ? menuRef : undefined}
    >
      {languages.map((item, index) => (
        <button
          key={index}
          aria-label={t(`navbar.ariaLabel.langButton.${item}}`)}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => setLanguageCookie(event, history)}
          data-lang={item}
          className={`d-i flex j-c-c a-i-c icon-nav lang ${location.pathname.split("/")[1] === item ? "active" : ""}`}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  ];

  return (
    <div className={`menu flex j-c-c a-i-c ${width < 600 && show ? "show-menu" : "hide-menu hidden"}`} ref={menuRef}>
      <ul className="flex j-c-s-a a-i-c f-f-c-w">
        {navbarMenuList.map((item, index) => (
          <li key={index} className="menu-item flex j-c-c a-i-c h5-s f-f-c-n">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
