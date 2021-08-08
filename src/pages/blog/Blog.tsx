import { useTranslation } from "react-i18next";
import { Card } from "../../components/card/Card";
import Head from "../../components/head/Head";
import "./Blog.css";

export default function Blog() {
  const [t] = useTranslation();

  return (
    <main id="main" className="blog-page grid">
      <Head title={t("blog.seo.title")} description={t("blog.seo.description")} />
      <header className="t-b flex j-c-c a-i-c">
        <h1>{t("blog.header")}</h1>
      </header>
      <section className="m-b flex j-c-c a-i-c">
        <ul className="flex a-i-c j-c-s-a f-f-r-w f-w">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
            <li key={index}>
              <Card layoutType="flex">
                <h3>Lorem ipsum</h3>
                <p>
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
                  quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique...
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
