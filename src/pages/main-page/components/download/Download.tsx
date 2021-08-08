import { useTranslation } from "react-i18next";
import useWindowDimensions from "../../../../utils/hooks/useWindowDimensions";
import "./Download.css";

export default function Download() {
  const [t] = useTranslation();
  const { width } = useWindowDimensions();

  return (
    <section className="download-now grid">
      <div className={`col ${width < 481 ? "j-s-c" : ""}`}>
        <img className="demo-img" src="http://localhost:3000/download-r.png" alt={t("main.download.alt")} />
      </div>
      <div className="col flex j-c-c a-i-f-s">
        <div className="grid">
          <header className="f-w flex a-i-c j-c-f-s">
            <h2 className={width > 768 ? "h1-s" : "h3-s f-w__900"}>{t("main.download.header")}</h2>
          </header>
          <p className={`${width > 768 ? "" : "h6-s"} flex a-i-f-s f-f-c-n`}>
            <span className="t-j">{t("main.download.fir")}</span>
            <span className="t-j">{t("main.download.sec")}</span>
          </p>
          <div className={`badges flex a-i-c j-c-s-b  ${width > 480 && width < 670 ? "f-f-c-n" : "f-f-r-w"}`}>
            <a href="#some-link-to-app-store">
              <img className="btn-sm-x-w" src="http://localhost:3000/app-store-badge.png" alt={t("main.alt.app_st")} />
            </a>
            <a href="#some-link-to-google-play">
              <img className="btn-sm-x-w" src="http://localhost:3000/google-play-badge.png" alt={t("main.alt.g_pl")} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
