import { render } from "react-dom";
import React from "react";
import * as serviceWorkerRegistration from "./utils/serwice-worker/serviceWorkerRegistration";
import reportWebVitals from "./utils/reportWebVitals";
import Wrapper from "./Wrapper";
import "./styles/index.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";

// const store = createStore(rootReducer);

render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback="loading">
        {/*<Provider store={store}>*/}
        <Wrapper />
      </Suspense>
    </BrowserRouter>
    {/*</Provider>*/}
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.unregister();

reportWebVitals(console.log);
