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
            src="https://res.cloudinary.com/gachi322/image/upload/v1628535190/ChatiZZe/app-store-badge_ik5o6k.png"
            alt={t("main.intro.app_st")}
            width={170}
            height={55}
          />
        </a>
        <a href="#some-link-to-google-play">
          <img
            className="btn-sm-x-w"
            src="https://res.cloudinary.com/gachi322/image/upload/v1628535189/ChatiZZe/google-play-badge_sso7hp.png"
            alt={t("main.intro.g_pl")}
            width={170}
            height={55}
          />
        </a>
      </div>
      <img
        className={`demo-img flex a-s-f-e ${width < 670 ? "j-s-c" : "j-s-s"}`}
        src="https://res.cloudinary.com/gachi322/image/upload/v1628535190/ChatiZZe/intro-chat-r-min_ezvnhz.png"
        alt={t("main.intro.ex_con")}
      />
    </section>
  );
}
