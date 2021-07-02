import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
// import logoutImage from "../../../assets/images/icons/logout.svg";
import { useTouchDevice } from "../../utils/hooks/useTouchDevice";
import { AuthContext } from "../../context/auth/AuthContext";
import LanguageButton from "../button/language/LanguageButton";
import NavLink from "../link/NavLink";
import "./Navbar.css";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import MenuButton from "../button/menu/MenuButton";

export const Navbar = () => {
  const [translateNav, setTranslateNav] = useState(false);
  const [t] = useTranslation();
  const { logged, logout } = useContext(AuthContext);
  const { isTouchDevice } = useTouchDevice();
  const { width } = useWindowDimensions();
  const skipLinkMainRef = useRef(null);
  const skipLinkFooterRef = useRef(null);

  useFocusInFocusOut(
    skipLinkMainRef,
    () => setTranslateNav(true),
    () => setTranslateNav(false)
  );
  useFocusInFocusOut(
    skipLinkFooterRef,
    () => setTranslateNav(true),
    () => setTranslateNav(false)
  );

  return (
    <header className={`${translateNav ? "showNavTop" : "hideNavTop"} nav grid`}>
      <nav role="navigation" className="nav-t grid">
        {!isTouchDevice ? (
          <React.Fragment>
            <a className="link helper skip-link flex j-c-c a-i-c" href="#main" tabIndex={1000} ref={skipLinkMainRef}>
              Skip to main section
            </a>
            <a className="link helper skip-link flex j-c-c a-i-c" href="#footer" tabIndex={1000} ref={skipLinkFooterRef}>
              Skip to footer section
            </a>
          </React.Fragment>
        ) : null}
      </nav>
      <nav role="navigation" className="nav-b grid">
        <div className="nav-l-r">
          <ul className={`f-w f-h flex a-i-c ${width < 600 ? "j-c-f-s" : "j-c-s-a"}`}>
            {width < 600 ? (
              <img src="http://localhost:3000/logo_primary.png" alt="" className="icon-logo" />
            ) : (
              <React.Fragment>
                <li className="btn-sm">
                  <NavLink to={`/${i18n.language}/`}>Main</NavLink>
                </li>
                <li className="btn-sm">
                  <NavLink to={`/${i18n.language}/features`}>Features</NavLink>
                </li>
                <li className="btn-sm">
                  <NavLink to={`/${i18n.language}/faq`}>FAQ</NavLink>
                </li>
                <li>{!logged ? <NavLink to={`/${i18n.language}/user/login`}>Try now!</NavLink> : null}</li>
              </React.Fragment>
            )}
          </ul>
        </div>
        <div className="nav-r-r">
          <ul className="f-w f-h flex j-c-s-a a-i-c">
            <li>
              {logged ? (
                <button className="btn-nav btn-sm btn-i" onClick={() => logout()} aria-label={t("navbar.ariaLabel.logOut")}>
                  <img src="http://localhost:3000/icons/logout.svg" alt="" className="icon" />
                </button>
              ) : null}
            </li>
            <li>{width < 600 ? <MenuButton/> : <LanguageButton />}</li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

function useFocusInFocusOut(elementRef: React.MutableRefObject<any | null>, focusInAction: any, focusOutAction: any) {
  useEffect(() => {
    function handleFocusIn() {
      if (elementRef.current && elementRef.current === document.activeElement) {
        focusInAction();
      }
    }

    function handleFocusOut() {
      if (elementRef.current && elementRef.current !== document.activeElement) {
        focusOutAction();
      }
    }

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);
    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, [elementRef, focusInAction, focusOutAction]);
}
