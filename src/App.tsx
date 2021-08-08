import { useHistory, useLocation } from "react-router-dom";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { useCookies } from "react-cookie";
import { interval, timer } from "rxjs";
import axios from "axios";
import ScrollToTopButton from "./components/button/scroll-to-top/ScrollToTopButton";
import { SuccessfulVerification } from "./components/toasts/SuccessfulVerification";
import CustomThemeModal from "./components/custom-theme-modal/CustomThemeModal";
import ActivationModal from "./components/activation-modal/ActivationModal";
import useWindowDimensions from "./utils/hooks/useWindowDimensions";
import ErrorModal from "./components/error-modal/ErrorModal";
import { showCookie } from "./context/actions/notification";
import { RootState } from "./context/rootState.interface";
import { displayUserMenu } from "./context/actions/chat";
import { clientLinks, userLinks } from "./utils/api-endpoints.enum";
import { cookieOptions } from "./utils/cookieOptions";
import { logError } from "./pages/error/errorHandler";
import { checkTheme } from "./context/actions/theme";
import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";
import { checkState } from "./context/actions/auth";
import { Cookie } from "./components/toasts/Cookie";
import { changeLang } from "./utils/i18n/i18n";
import { Routes } from "./pages/routes/Routes";
import { Menu } from "./components/menu/Menu";
import i18n from "./utils/i18n/i18n";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [firstRefresh, setFirstRefresh] = useState(true);

  const [cookies, setClientCookie] = useCookies([]);

  const location = useLocation();
  const history = useHistory();

  const { width } = useWindowDimensions();

  const logged = useSelector((state: RootState) => state.auth.logged);
  const showCreateChat = useSelector((state: RootState) => state.chat.showCreateChat);
  const showChatManageMenu = useSelector((state: RootState) => state.chat.showManageChatMenu);
  const showChatData = useSelector((state: RootState) => state.chat.showChatData);
  const showAddUser = useSelector((state: RootState) => state.chat.showAddUser);
  const showUserSettings = useSelector((state: RootState) => state.chat.showUserSettings);
  const showUserInfo = useSelector((state: RootState) => state.chat.showUserInfo);
  const showUserMenu = useSelector((state: RootState) => state.chat.showUserMenu);
  const showMenu = useSelector((state: RootState) => state.menu.showOffsideMenu);
  const showThemeModal = useSelector((state: RootState) => state.theme.showCustomThemeModal);
  const forgotPasswordModal = useSelector((state: RootState) => state.auth.showForgotPassword);
  const errorModal = useSelector((state: RootState) => state.error.show);
  const showAddUserModal = useSelector((state: RootState) => state.chat.showAddUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkTheme(cookies));
    if (firstRefresh) invoke();
    if (cookies["lang"]) changeLang(cookies["lang"].language);
  }, []);

  useEffect(() => {
    if (Object.keys(cookies).length === 0) {
      __generateClientsToken().then(({ data }) => {
        setClientCookie("client", { accessToken: data.clientToken }, cookieOptions(3600 * 24 * 60));
      });
    }

    if (!cookies["cookie-shown"]?.shown) dispatch(showCookie(true));
  }, []);

  useEffect(() => {
    const language = navigator.language ? navigator.language : "en";

    if (!localStorage.getItem(btoa("f-r"))) {
      changeLang(language);
      localStorage.setItem(btoa("f-r"), btoa("true"));
    }
  }, []);

  useEffect(() => {
    if (
      (width < 600 && showMenu) ||
      showCreateChat ||
      showChatManageMenu ||
      showChatData ||
      showAddUser ||
      showUserSettings ||
      showUserInfo ||
      showUserMenu ||
      showThemeModal ||
      errorModal ||
      showAddUserModal ||
      forgotPasswordModal) {
      // @ts-ignore
      document.getElementById("root").classList.add("block-scroll");
    } else {
      // @ts-ignore
      document.getElementById("root").classList.remove("block-scroll");
    }
  }, [
    showMenu,
    showCreateChat,
    showChatManageMenu,
    showChatData,
    showAddUser,
    showUserSettings,
    showUserInfo,
    showUserMenu,
    showThemeModal,
    errorModal,
    showAddUserModal,
    forgotPasswordModal,
  ]);
  
  useEffect(() => {
    if (
      location.pathname.includes("chat")
    ) {
      document.body.classList.add("block-scroll");
    } else {
      document.body.classList.remove("block-scroll");
    }
  }, [
    location
  ]);

  useEffect(() => {
    dispatch(displayUserMenu(false));
  }, [location]);

  useEffect(() => {
    // changeLang(i18n.language);
    setLoading(false);
  }, [location]);

  useEffect(() => {
    timer(20).subscribe(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  }, [location]);

  useEffect(() => {
    const langs = ["en", "ru", "ua"];
    const lang = location.pathname.split("/")[1];

    if (lang === "undefined" || !langs.includes(lang)) {
      history.push({ pathname: `/${i18n.language}/` });
    }
  }, [location.pathname]);

  useEffect(() => {
    dispatch(checkState(cookies));
    dispatch(checkTheme(cookies));
    if (logged && cookies["user-auth"].expTime < 300) {
      if (firstRefresh) {
        setFirstRefresh(false);
        refreshSession();
      } else {
        const timerSubscription = timer(840000).subscribe(() => {
          timerSubscription.unsubscribe();
          refreshSession();
        });
      }
    }
  }, [logged]);

  async function invoke() {
    return await axios.post(clientLinks.invoke).catch((e) => logError(e));
  }

  async function __generateClientsToken() {
    const fp = await FingerprintJS.load();
    const result = await fp.get();

    return await axios.get(clientLinks.getToken, {
      headers: {
        fingerprint: result
      }
    });
  }

  async function refreshSession() {
    const fp = await FingerprintJS.load();
    const result = await fp.get();

    timer(50).subscribe(
      async () =>
        await axios
          .post(
            userLinks.refresh,
            {
              fingerprint: result.visitorId
            },
            {
              headers: {
                "Access-Token": cookies["accessToken"]?.accessToken,
                "Refresh-Token": cookies["refreshToken"]?.refreshToken,
                withCredentials: true
              }
            }
          )
          .then((response) => {
            const { success, errors, body } = response.data;

            if (!success && errors) {
              // dispatchError({
              //   type: "SET_ERROR_CODE_AND_SHOW_ERROR_MODAL",
              //   payload: {
              //     errorCode: Number.parseInt(errors.code),
              //     showModal: true
              //   }
              // });
            } else if (typeof window !== "undefined") {
              localStorage.setItem(btoa("token"), btoa(JSON.stringify(body[0].token)));
              localStorage.setItem(btoa("refreshToken"), btoa(JSON.stringify(body[1].refreshToken)));
              let subscription = interval(840000).subscribe(() => {
                subscription.unsubscribe();
                refreshSession();
              });
            }
          })
          .catch((error) => logError(error))
    );
  }

  return (
    <div className={`grid ${location.pathname.includes("chat") ? "chat" : ""} base`}>
      {!loading && <Routes />}
      {location.pathname.includes("chat") ? null : <Menu />}
      {location.pathname.includes("chat") ? null : <Navbar />}
      {location.pathname.includes("chat") ? null : <Footer />}
      {width > 768 && !location.pathname.includes("chat") ? <ScrollToTopButton /> : null}
      <Cookie />
      <ErrorModal />
      <ActivationModal />
      <CustomThemeModal />
      <SuccessfulVerification />
    </div>
  );
};

export default withRouter(App);
