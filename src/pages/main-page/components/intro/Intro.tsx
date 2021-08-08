import { useTranslation } from "react-i18next";
import useWindowDimensions from "../../../../utils/hooks/useWindowDimensions";
import "./Intro.css";

export default function Intro() {
  const [t] = useTranslation();
  const { width } = useWindowDimensions();

  return (
    <section className="intro grid">
      <header className={`flex j-c-c ${width < 670 ? "a-i-f-s" : "a-i-c"} f-f-c-n`}>
        <h2 className={`${width < 769 ? "h4-s f-w__900" : ""} flex a-i-f-s j-c-s-b f-f-c-n`}>
          <span>{t("main.intro.fir")}</span>
          <span>{t("main.intro.sec")}</span>
        </h2>
        <p className={`${width > 768 ? "" : "h6-s"} t-j`}>{t("main.intro.thir")}</p>
      </header>
      <div className={`flex a-i-c j-c-s-b ${width < 481 ? "f-f-c-n" : "f-f-r-n"}`}>
        <a href="#some-link-to-app-store">
          <img
            className="btn-sm-x-w"
            src="http://localhost:3000/app-store-badge.png"
            alt={t("main.intro.app_st")}
            width={170}
            height={55}
          />
        </a>
        <a href="#some-link-to-google-play">
          <img
            className="btn-sm-x-w"
            src="http://localhost:3000/google-play-badge.png"
            alt={t("main.intro.g_pl")}
            width={170}
            height={55}
          />
        </a>
      </div>
      <img
        className={`demo-img flex a-s-f-e ${width < 670 ? "j-s-c" : "j-s-s"}`}
        src="http://localhost:3000/intro-chat-r.png"
        alt={t("main.intro.ex_con")}
      />
    </section>
  );
}
