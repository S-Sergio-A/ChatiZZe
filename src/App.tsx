import React, { useContext, useEffect, useRef, useState } from "react";
import { withRouter } from "react-router";
import { useHistory, useLocation } from "react-router-dom";
import { ModalContext } from "./context/modal/ModalContext";
import useWindowDimensions from "./utils/hooks/useWindowDimensions";
import { MenuContext } from "./context/navbar-menu/NavbarMenuContext";
import { ToastContext } from "./context/toast/ToastContext";
import { AuthContext } from "./context/auth/AuthContext";
import { changeLang } from "./utils/i18n/i18n";
import i18n from "i18next";
import { interval, timer } from "rxjs";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import axios from "axios";
import { userLinks } from "./utils/api-endpoints.enum";
import { logError } from "./pages/error/errorHandler";
import NotificationButton from "./components/button/notification/NotificationButton";
import { Menu } from "./components/menu/Menu";
import { Cookie } from "./components/toasts/components/Cookie";
import { delay } from "rxjs/operators";
import { Subscribe } from "./components/toasts/components/Subscribe";
import { Verification } from "./components/toasts/components/Verification";
import { Navbar } from "./components/navbar/Navbar";
import { Routes } from "./pages/routes/Routes";
import { Footer } from "./components/footer/Footer";
import ScrollToTopButton from "./components/button/scroll-to-top/ScrollToTopButton";
import ErrorModal from "./components/modal/ErrorModal";
import ActivationModal from "./components/modal/ActivationModal";
import { ErrorContext } from "./context/error/ErrorContext";
import { useCookies } from "react-cookie";
import "./components/link/Link.css";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [firstRefresh, setFirstRefresh] = useState(true);
  const [cookies] = useCookies();
  const menuContext = useContext(MenuContext);
  const { show, showCookieInfo } = useContext(ToastContext);
  const { showErrorModal } = useContext(ErrorContext);
  const { checkState, logged } = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();
  const toastRef = useRef(null);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if ((width < 481 && menuContext.show) || (width < 768 && show && document.getElementsByClassName("Toast-Stack-Reveal").length > 0)) {
      // @ts-ignore
      document.getElementById("root").classList.add("Block-Scrolling");
    } else {
      // @ts-ignore
      document.getElementById("root").classList.remove("Block-Scrolling");
    }
  }, [menuContext, show]);

  useEffect(() => {
    const language = navigator.language ? navigator.language : "en";

    if (!localStorage.getItem(btoa("f-r"))) {
      changeLang(i18n, language);
      localStorage.setItem(btoa("f-r"), btoa("true"));
    }
  }, []);

  useEffect(() => {
    const langs = ["en", "ru", "ua"];
    const lang = location.pathname.split("/")[1];

    if (!langs.includes(lang)) {
      history.push({ pathname: `/${i18n.language}/` });
    }
  }, [location.pathname]);

  useEffect(() => {
    changeLang(i18n, i18n.language);
    setLoading(false);
  }, [location]);

  useEffect(() => {
    timer(20).subscribe(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  }, [location]);

  useEffect(() => {
    console.log(cookies);
    if (cookies.length > 0) {
      checkState();
    }
    // if (logged) {
    //   if (firstRefresh) {
    //     setFirstRefresh(false);
    //     refreshSession();
    //   } else {
    //     const timerSubscription = timer(840000).subscribe(() => {
    //       timerSubscription.unsubscribe();
    //       refreshSession();
    //     });
    //   }
    // }
  }, [logged]);

  // async function refreshSession() {
  //   const fp = await FingerprintJS.load();
  //   const result = await fp.get();
  //
  //   timer(50).subscribe(
  //     async () =>
  //       await axios
  //         .post(
  //           userLinks.refresh,
  //           {
  //             fingerprint: result.visitorId
  //           },
  //           {
  //             headers: {
  //               Token: localStorage.getItem(btoa("token")) ? atob(localStorage.getItem(btoa("token"))) : null,
  //               "Refresh-Token": localStorage.getItem(btoa("refreshToken")) ? atob(localStorage.getItem(btoa("refreshToken"))) : null,
  //               withCredentials: true
  //             }
  //           }
  //         )
  //         .then((response) => {
  //           const { success, errors, body } = response.data;
  //
  //           if (!success && errors) {
  //             dispatchError({
  //               type: "SET_ERROR_CODE_AND_SHOW_ERROR_MODAL",
  //               payload: {
  //                 errorCode: Number.parseInt(errors.code),
  //                 showModal: true
  //               }
  //             });
  //           } else if (typeof window !== "undefined") {
  //             localStorage.setItem(btoa("token"), btoa(JSON.stringify(body[0].token)));
  //             localStorage.setItem(btoa("refreshToken"), btoa(JSON.stringify(body[1].refreshToken)));
  //             let subscription = interval(840000).subscribe(() => {
  //               subscription.unsubscribe();
  //               refreshSession();
  //             });
  //           }
  //         })
  //         .catch((error) => logError(error))
  //   );
  // }

  return (
    <div className="grid base">
      <Menu />
      {/*{width < 1851 && (*/}
      {/*  <NotificationButton>*/}
      {/*    /!* eslint-disable-next-line max-len *!/*/}
      {/*    <div ref={toastRef} className="Toasts-Stack">*/}
      {/*      {showCookie ? <Cookie /> : null}*/}
      {/*      {typeof window !== "undefined" &&*/}
      {/*      localStorage.getItem(btoa("cookies")) &&*/}
      {/*      // @ts-ignore*/}
      {/*      atob(localStorage.getItem(btoa("cookies"))) === "false"*/}
      {/*        ? delay(6000) && <Subscribe />*/}
      {/*        : null}*/}
      {/*      {cookies["user-verified"].verified ? <Verification /> : null}*/}
      {/*    </div>*/}
      {/*  </NotificationButton>*/}
      {/*)}*/}
      <Navbar />
      {!loading && <Routes />}
      <Footer />
      {!(width < 769) ? <ScrollToTopButton /> : null}
      {/*<ErrorModal />*/}
      {/*<ActivationModal />*/}
      {/*{width > 1850 ? (*/}
      {/*  <div className="Toasts-Stack">*/}
      {/*    <Cookie />*/}
      {/*    {typeof window !== "undefined" &&*/}
      {/*    localStorage.getItem(btoa("cookies")) &&*/}
      {/*    // @ts-ignore*/}
      {/*    atob(localStorage.getItem(btoa("cookies"))) === "false"*/}
      {/*      ? delay(6000) && <Subscribe />*/}
      {/*      : null}*/}
      {/*    <Verification />*/}
      {/*  </div>*/}
      {/*) : null}*/}
    </div>
  );
};

export default withRouter(App);
