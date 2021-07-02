import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import Head from '../../components/head/Head';

export default function InformationPage() {
  const [t] = useTranslation();
  const location = useLocation();
  const type = location.pathname.split("/")[2];
  const questions:{question: string; answer:string}[] = Array.from(t(`infoPages.${type}`, { returnObjects: true }));

  return (
    <div className="Info-Page Grid">
      <Head
        title={t(`infoPages.${type}.seo.title`)}
        description={t(`infoPages.${type}.seo.description`)}
        // structuredDataJSON={type === 'faq' ? structuredDataList.faq(
        //   t('infoPages.faq', { returnObjects: true })[0].question,
        //   t('infoPages.faq', { returnObjects: true })[0].answer,
        //   t('infoPages.faq', { returnObjects: true })[1].question,
        //   t('infoPages.faq', { returnObjects: true })[1].answer,
        //   t('infoPages.faq', { returnObjects: true })[2].question,
        //   t('infoPages.faq', { returnObjects: true })[2].answer,
        //   t('infoPages.delivery', { returnObjects: true })[3].question,
        //   t('infoPages.delivery', { returnObjects: true })[3].answer,
        //   t('infoPages.order', { returnObjects: true })[4].question,
        //   t('infoPages.order', { returnObjects: true })[4].answer
        // ) : null}
      />
      <section className="B-T flex J-C-C a-i-c T-C">
        <h1>{t(`infoPages.${type}.header`)}</h1>
      </section>
      <section className="B-M Nunito flex J-C-S-B A-I-F-S f-f-c-n">
        <ul className="flex J-C-S-B A-I-F-S f-f-c-n F-W F-H">
          {questions.map((item, index) => {
            return (
              <li key={index} className="flex J-C-S-B A-I-F-S f-f-c-n F-W F-H">
                <h2 className="h3-size">{item.question}</h2>
                <p>{item.answer}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
