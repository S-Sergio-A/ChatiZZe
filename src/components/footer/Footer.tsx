import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import i18n from "i18next";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import "./Footer.css";
import NavLink from "../link/NavLink";

export const Footer = () => {
  const [t] = useTranslation();
  const { width } = useWindowDimensions();

  return (
    <footer id="footer" className="footer grid">
      <nav className="footer-t">
        <section className="grid legal">
          <h2 className="h3-s f-w__900 t-l">Legal</h2>
          <ul className="l-l flex f-f-c-n">
            <li className="btn-sm">
              <NavLink to={`/${i18n.language}/terms-of-use`}>
                Terms of Use
              </NavLink>
            </li>
            <li className="btn-sm">
              <NavLink to={`/${i18n.language}/privacy-policy`}>
                Privacy
              </NavLink>
            </li>
            <li className="btn-sm">
              <NavLink to={`/${i18n.language}/cookie-policy`}>
                Cookie Policy
              </NavLink>
            </li>
          </ul>
        </section>
        <section className="grid help">
          <h2  className="h3-s f-w__900 t-l">Help</h2>
          <ul className="l-l flex f-f-c-n">
            <li className="btn-sm">
              <NavLink to={`/${i18n.language}/support`}>
                Support
              </NavLink>
            </li>
            <li className="btn-sm">
              <NavLink to={`/${i18n.language}/contact-us`}>
                Contact Us
              </NavLink>
            </li>
            <li className="btn-sm">
              <NavLink to={`/${i18n.language}/blog`}>
                Blog
              </NavLink>
            </li>
          </ul>
        </section>
      </nav>
      <section className="footer-b">
        <p className="flex a-i-c j-c-f-e f-h f-w helper">&copy; All right are reserved {t("footer.rights")}</p>
      </section>
    </footer>
  );
};
