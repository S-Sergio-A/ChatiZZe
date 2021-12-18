import React from "react";
import { useTranslation } from "react-i18next";
import Head from "../../components/head/Head";
import "./Main.css";
import Intro from "./components/intro/Intro";
import Features from "./components/features/Features";
import HowItWorks from "./components/how-it-works/HowItWorks";
import Download from "./components/download/Download";

export default function Main() {
  const [t] = useTranslation();

  return (
    <main id="main" className="main-page grid">
      <Head
        title={t("main.seo.title")}
        description={t("main.seo.description")}
        cardTitle={t("main.seo.title")}
        cardDescription={t("main.seo.cardDescription")}
        imgUrl=""
        imgUrlSecure=""
        imgAlt={t("main.seo.imgAlt")}
        imgType="JPG"
      />
      <Intro />
      <Features />
      <HowItWorks />
      <Download />
    </main>
  );
}
