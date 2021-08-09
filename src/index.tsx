import { BrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";
import axios from "axios";
import { LoadingFallback } from "./pages/lazy-loaders/LoadingFallback";
// import reportWebVitals from "./utils/reportWebVitals";
import { store } from "./context/store";
import Wrapper from "./Wrapper";
import "./components/button/ButtonSecondary.css";
import "./components/button/ButtonTertiary.css";
import "./components/button/ButtonPrimary.css";
import "./components/button/ButtonNav.css";
import "./components/toasts/Toast.css";
import "./components/link/Link.css";
import "./pages/info-pages/InfoPage.css";
import "./styles/index.css";

axios.defaults.baseURL = "https://chatizze-public-api.herokuapp.com/public";
axios.defaults.timeout = 1500;
axios.defaults.withCredentials = true;

if ("serviceWorker" in navigator && typeof window !== "undefined") {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.ts")
      .then((registration) => {
        // console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        // console.log('SW registration failed: ', registrationError);
      });
  });
}

render(
  <BrowserRouter>
    <Suspense fallback={<LoadingFallback />}>
      <Provider store={store}>
        <Wrapper />
      </Provider>
    </Suspense>
  </BrowserRouter>,
  document.getElementById("root")
);

// reportWebVitals(console.log);
