import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import { logError } from "../../pages/error/errorHandler";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(initReactI18next)
  .use(HttpApi)
  .use(I18nextBrowserLanguageDetector)
  .init({
    backend: {
      loadPath: "http://localhost:3000/locales/{{lng}}/{{ns}}.json"
    },
    lng: navigator.language,
    fallbackLng: "en",
    ns: navigator.language
  });

export default i18n;

export function changeLang(i18n: any, lng: string) {
  i18n.changeLanguage(lng).catch((error: Error) => logError(error));
}
