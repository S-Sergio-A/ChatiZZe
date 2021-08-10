import { useTranslation } from "react-i18next";
import Head from "../../components/head/Head";

export default function InformationPage() {
  const [t] = useTranslation();
  const questions: { question: string; answer: string }[] = Array.from(t(`infoPages.faq`, { returnObjects: true }));

  return (
    <main id="main" className="faq-page grid">
      <Head
        title={t("infoPages.faq.seo.title")}
        description={t("infoPages.faq.seo.description")}
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
      <section className="t-b flex j-c-c a-i-c">
        <h1>{t(`infoPages.faq.header`)}</h1>
      </section>
      <section className="m-b flex j-c-s-b a-i-f-s f-f-c-n">
        <ul className="flex j-c-s-b a-i-f-s f-f-c-n f-w f-h">
          {questions.map((item, index) => {
            return (
              <li key={index} className="flex j-c-s-b a-i-f-s f-f-c-n">
                <h2 className="h4-s f-w__600">{item.question}</h2>
                <p className="h6-s">{item.answer}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
