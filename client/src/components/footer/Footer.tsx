import { useTranslation } from "react-i18next";
import i18n from "../../utils/i18n/i18n";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import ThemeSwitch from "../switch/triple/ThemeSwitch";
import NavLink from "../link/NavLink";
import "./Footer.css";

export const Footer = () => {
  const [t] = useTranslation();
  const { width } = useWindowDimensions();

  return (
    <footer id="footer" className="footer grid">
      <nav className="footer-t grid">
        <section className="grid legal">
          <h2 className="h3-s f-w__900 t-l">{t("footer.header.legal")}</h2>
          <ul className="l-l flex a-i-f-s j-c-f-s f-f-c-n">
            <li className="btn-sm">
              <NavLink to={`/${i18n.language}/terms-of-use`} footer>
                {t("footer.links.terms")}
              </NavLink>
            </li>
            <li className="btn-sm">
              <NavLink to={`/${i18n.language}/privacy-policy`} footer>
                {t("footer.links.priv")}
              </NavLink>
            </li>
            <li className="btn-sm">
              <NavLink to={`/${i18n.language}/cookie-policy`} footer>
                {t("footer.links.cookie")}
              </NavLink>
            </li>
          </ul>
        </section>
        <section className="grid help">
          <h2 className="h3-s f-w__900 t-l">{t("footer.header.help")}</h2>
          <ul className="l-l flex a-i-f-s j-c-f-s f-f-c-n">
            <li className="btn-sm">
              <NavLink to={`/${i18n.language}/attribution`} footer>
                {t("footer.links.attr")}
              </NavLink>
            </li>
            <li className="btn-sm">
              <NavLink to={`/${i18n.language}/contact-us`} footer>
                {t("footer.links.contact")}
              </NavLink>
            </li>
            <li className="btn-sm">
              <NavLink to={`/${i18n.language}/blog`} footer>
                {t("footer.links.blog")}
              </NavLink>
            </li>
          </ul>
        </section>
        {width > 599 ? (
          <div className="a-s-f-s flex j-c-c a-i-c theme">
            <ThemeSwitch />
          </div>
        ) : null}
      </nav>
      <section className="footer-b">
        <p className="flex a-i-c j-c-f-e f-h f-w helper">&copy;{t("footer.rights")}</p>
      </section>
    </footer>
  );
};
