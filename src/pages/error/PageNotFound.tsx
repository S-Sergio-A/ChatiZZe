import React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Head from "../../components/head/Head";

export default function PageNotFound() {
  const history = useHistory();
  const [t] = useTranslation();

  function handleReturn() {
    history.push("/en/");
  }

  return (
    <div className="Error-Page Grid">
      <Head title={t("error.seo.title")} description={t("error.seo.description")} />
      <header className="B-T T-C flex J-C-C a-i-c f-f-c-n">
        <h1>
          {t("error.header")}
        </h1>
      </header>
      <div className="B-M Nunito flex J-C-S-A a-i-c f-f-c-n">
        {/*<img src={notFound} alt="" className="categoryImageContainer" />*/}
        <button onClick={() => handleReturn()} type="button" className="Btn-Su Btn-Sm-X-W">
          {t("error.button")}
        </button>
      </div>
    </div>
  );
}
