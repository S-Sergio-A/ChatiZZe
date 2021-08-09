import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import i18n from "i18next";

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "https://chatizze.herokuapp.com/locale/{{lng}}.json",
      allowMultiLoading: true
    },
    load: "languageOnly",
    supportedLngs: ["en", "ru", "ua"],
    ns: ["common"],
    defaultNS: "common",
    fallbackLng: "en",
    debug: false,
    keySeparator: false,
    interpolation: {
      escapeValue: false
    },
    react: {
      wait: true,
      useSuspense: false
    }
  });

export default i18n;

export function changeLang(lng: string) {
  i18n.changeLanguage(lng);
}
