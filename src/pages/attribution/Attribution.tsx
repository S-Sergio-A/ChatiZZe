import { useTranslation } from "react-i18next";
import { iconsAttributionList } from "./attributionList";
import "./Attribution.css";
import Head from "../../components/head/Head";
import React from "react";

export default function Attribution() {
  const [t] = useTranslation();

  return (
    <main id="main" className="attr-page grid">
      <Head title={t("attr.seo.title")} description={t("attr.seo.description")} />
      <header className="t-b flex j-c-c a-i-c f-f-c-n f-w">
        <h1 className="h2-s t-c">{t("attribution.header")}</h1>
        <h2 className="h5-s t-c">
          {t("attribution.main")}
          <a className="h6-s" href="mailto:sergiom33033@gmail.com">
            {" sergiom33033@gmail.com"}
          </a>
        </h2>
      </header>
      <div className="m-b flex j-c-c a-i-c f-f-c-n f-w">
        <section className="flex j-c-c a-i-c f-f-c-n f-w">
          <header>
            <h3>{t("icons")}</h3>
          </header>
          <ul className="flex a-i-c j-c-c f-f-c-n f-w">
            {iconsAttributionList.map((item, index) => (
              <li key={index} className="f-w T-L">
                <a href={item.link} title={item?.title}>
                  {item.author}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
