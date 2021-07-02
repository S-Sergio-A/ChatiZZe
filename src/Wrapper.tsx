import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { CloudinaryContext } from "cloudinary-react";
import i18n from "i18next";
import axios from "axios";
import { NotificationOverlayContextProvider } from "./context/notification-overlay/NotificationOverlayContext";
import { MenuContextProvider } from "./context/navbar-menu/NavbarMenuContext";
import { ModalContextProvider } from "./context/modal/ModalContext";
import { ToastContextProvider } from "./context/toast/ToastContext";
import { clientLinks } from "./utils/api-endpoints.enum";
import ErrorBoundary from "./pages/error/ErrorBoundary";
import { logError } from "./pages/error/errorHandler";
import { AuthContextProvider } from "./context/auth/AuthContext";
import { ActivationContextProvider } from "./context/activation/ActivationContext";
import { ErrorContextProvider } from "./context/error/ErrorContext";
import { CookiesProvider } from "react-cookie";
import App from "./App";
import "./styles/App.css";

export default Wrapper;

function Wrapper() {
  const history = useHistory();

  useEffect(() => {
    createClientsSession();
    console.log(i18n.language);
    // sendErrorReport();
  }, []);

  function createClientsSession() {
    if (!localStorage.getItem(btoa("clientsToken"))) {
      axios
        .get(clientLinks.createSession)
        .then((response) => {
          const { success, body } = response.data;

          if (success) {
            localStorage.setItem(btoa("clientsToken"), btoa(JSON.stringify(body[0].token)));
          }
        })
        .catch((error) => logError(error));
    }
  }

  return (
    // @ts-ignore
    <ErrorBoundary handleReturn={() => history.push({ pathname: `/${i18n.language}` })}>
      <CookiesProvider>
        <CloudinaryContext cloudName="gachi322">
          <I18nextProvider i18n={i18n}>
            <NotificationOverlayContextProvider>
              <ModalContextProvider>
                <MenuContextProvider>
                  <ErrorContextProvider>
                    <ActivationContextProvider>
                      <ToastContextProvider>
                        <AuthContextProvider>
                          <App />
                        </AuthContextProvider>
                      </ToastContextProvider>
                    </ActivationContextProvider>
                  </ErrorContextProvider>
                </MenuContextProvider>
              </ModalContextProvider>
            </NotificationOverlayContextProvider>
          </I18nextProvider>
        </CloudinaryContext>
      </CookiesProvider>
    </ErrorBoundary>
  );
}
