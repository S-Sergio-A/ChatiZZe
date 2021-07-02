import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { MenuContext } from "../../context/navbar-menu/NavbarMenuContext";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
// import logo from "../../../assets/images/icons/logo.svg";
import useOutsideClick from "../../utils/hooks/useOutsideClick";
import "./Menu.css";

export const Menu = () => {
  const { showMenu } = useContext(MenuContext);
  const { width } = useWindowDimensions();
  const [t] = useTranslation();
  // const [elementRef] = useOutsideClick("menu", () => showMenu(false));
  const location = useLocation();

  useEffect(() => showMenu(false), [location]);

  useEffect(() => {
    if (width > 768) {
      showMenu(false);
    }
  }, [width]);

  const navbarMenuList = [
    {
      markup: (
        <React.Fragment>
          <Link to={`/${i18n.language}/`} className="btn-p f-w h6-s" aria-label={t("ariaLabel.main")}>
            <img src="" alt="" className="Icon-Logo" /> Main
          </Link>
        </React.Fragment>
      ),
      index: 1
    },
    {
      markup: (
        <React.Fragment>
          <Link to={`/${i18n.language}/shop`} className="btn-p f-w h6-s">
            {t("order")}
          </Link>
        </React.Fragment>
      ),
      index: 2
    },
    {
      markup: (
        <React.Fragment>
          <Link to={`/${i18n.language}/catering`} className="btn-p f-w h6-s">
            {t("catering")}
          </Link>
        </React.Fragment>
      ),
      index: 3
    },
    {
      markup: (
        <React.Fragment>
          <Link to={`/${i18n.language}/locations`} className="btn-p f-w h6-s">
            {t("locations")}
          </Link>
        </React.Fragment>
      ),
      index: 4
    },
    {
      markup: (
        <React.Fragment>
          <button
            className="btn-p f-w h6-s"
            onClick={() => showMenu(false)}
            aria-label={t("ariaLabel.closeMenu")}
          >
            {t("button.close")}
          </button>
        </React.Fragment>
      ),
      index: 5
    }
  ];

  return null;
  // <animated.div style={width < 769 ? { transform: show ? 'translateX(0)' : 'translateX(-100%)' } : { transform: 'translateX(-100%)' }}
  //               className={`menu flex j-c-c a-i-c f-h ${!show ? 'hidden' : ''}`} ref={elementRef}>
  //   <div className="ct f-w">
  //     <ul className="flex j-c-s-a a-i-c f-f-c-w f-w">
  //       <Trail items={navbarMenuList}
  //         config={config.gentle}
  //         keys={(item: { index: any; }) => item.index}
  //         from={{ opacity: 0, transform: 'translateX(-100%)' }}
  //         to={{ transform: `translateX(${show ? '0' : '-100%'})`, opacity: 1 }}>
  //         {(item:{ markup: React.ReactNode, index: number}) => (props:any) => (
  //           <animated.li style={props} key={item.index} className="menu-item flex j-c-c a-i-c f-w h5-s">
  //             {item.markup}
  //           </animated.li>
  //         )}
  //       </Trail>
  //     </ul>
  //   </div>
  // </animated.div>
};
