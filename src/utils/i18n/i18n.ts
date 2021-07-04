import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import i18n from "i18next";

i18n
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    backend: {
      loadPath: "http://localhost:3000/locales/{{lng}}.json",
      allowMultiLoading: true
    },
    load: "languageOnly",
    supportedLngs: ["en", "ru", "ua"],
    ns: ["common"],
    defaultNS: "common",
    fallbackLng: "en",
    debug: true,
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
