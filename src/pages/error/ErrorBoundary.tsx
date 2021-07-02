import React, { ErrorInfo } from "react";
import { withTranslation } from "react-i18next";
// import error from "../../images/svg/internal-error.svg";
import Head from "../../components/head/Head";
import { logError } from "./errorHandler";

interface ErrorBoundaryProps {
  [key: string]: any;
}

class ErrorBoundary extends React.Component {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(JSON.stringify(error), JSON.stringify(errorInfo));
    logError(JSON.stringify({ error, errorInfo }));
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    // @ts-ignore
    const { t } = this.props;

    // @ts-ignore
    if (this.state.hasError) {
      return (
        <div className="Error-Page Grid">
          <Head
            title={t("errorBoundary.seo.title")}
            cardTitle={t("errorBoundary.seo.title")}
            description={t("errorBoundary.seo.description")}
            cardDescription={t("errorBoundary.seo.description")}
          />
          <header className="B-T T-C flex J-C-C a-i-c f-f-c-n">
            <h1>{t("errorBoundary.header")}</h1>
          </header>
          <div className="B-M Nunito flex J-C-S-A a-i-c f-f-c-n">
            {/*<img src={error} alt="" className="categoryImageContainer" />*/}
            {/*@ts-ignore*/}
            <button onClick={this.props.handleReturn} type="button" className="Btn-Su Btn-Sm-X-W">
              {t("error.button")}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);
