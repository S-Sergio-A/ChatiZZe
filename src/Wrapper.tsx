import { CloudinaryContext } from "cloudinary-react";
import { I18nextProvider } from "react-i18next";
import { CookiesProvider } from "react-cookie";
import { useHistory } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./context/rootState.interface";
import ErrorBoundary from "./pages/error/ErrorBoundary";
import { GlobalStyle } from "./styles/StyledComponent";
import i18n from "./utils/i18n/i18n";
import App from "./App";
import "./styles/App.css";

export default Wrapper;

function Wrapper() {
  const history = useHistory();

  const primaryBackground = useSelector((state: RootState) => state.theme.primary);
  const secondaryBackground = useSelector((state: RootState) => state.theme.secondary);
  const primaryColor = useSelector((state: RootState) => state.theme.colorPrimary);
  const secondaryColor = useSelector((state: RootState) => state.theme.colorSecondary);
  const primaryBorderColor = useSelector((state: RootState) => state.theme.borderPrimary);
  const secondaryBorderColor = useSelector((state: RootState) => state.theme.borderSecondary);
  const layout = useSelector((state: RootState) => state.theme.layout);

  useEffect(() => {
    // console.log(i18n.language);
    // sendErrorReport();
  }, []);

  return (
    <Fragment>
      <GlobalStyle
        theme={{
          primaryBackground,
          secondaryBackground,
          primaryColor,
          secondaryColor,
          primaryBorderColor,
          secondaryBorderColor,
          layout
        }}
      />
      {/* @ts-ignore*/}
      <ErrorBoundary handleReturn={() => history.push({ pathname: `/${i18n.language}` })}>
        <CookiesProvider>
          <CloudinaryContext cloudName="gachi322">
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </CloudinaryContext>
        </CookiesProvider>
      </ErrorBoundary>
    </Fragment>
  );
}
