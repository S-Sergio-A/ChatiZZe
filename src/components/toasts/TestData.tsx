import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../../context/rootState.interface";
import CloseButton from "../button/close/CloseButton";
import "./Cookie.css";

export const TestData = () => {
  const [t] = useTranslation();
  const location = useLocation();

  const [remove, setRemove] = useState(false);

  const cookie = useSelector((state: RootState) => state.notification.showCookie);

  if (location.pathname.includes("login") && !remove && !cookie) {
    return (
      <div className={`toast cookie ${remove ? "hide-toast" : "show-toast"}`}>
        <header className="flex a-i-c j-c-s-b">
          <h2 className="h3-s a-s-c">{t("testData.header")}</h2>
          <CloseButton
            ariaLabel={t("button.cl_toast")}
            onClick={() => {
              setRemove(true);
            }}
          />
        </header>
        <section>
          <div className="inner-container flex a-i-c j-c-c f-f-c-n">
            <p className="f-w f-w__600">{t("testData.intro")}</p>
            <p className="f-w">{t("testData.email")}</p>
            <p className="f-w">{t("testData.password")}</p>
          </div>
        </section>
      </div>
    );
  } else {
    return null;
  }
};
