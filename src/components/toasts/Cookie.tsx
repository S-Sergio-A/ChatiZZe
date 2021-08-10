import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { timer } from "rxjs";
import { showCookie } from "../../context/actions/notification";
import { RootState } from "../../context/rootState.interface";
import { cookieOptions } from "../../utils/cookieOptions";
import i18n from "../../utils/i18n/i18n";
import CloseButton from "../button/close/CloseButton";
import "./Cookie.css";

export const Cookie = () => {
  const [cookies, setCookies] = useCookies([]);
  const [t] = useTranslation();

  const [remove, setRemove] = useState(false);
  const [hideAfterTimeout, setHideAfterTimeout] = useState(false);

  const cookie = useSelector((state: RootState) => state.notification.showCookie);
  const dispatch = useDispatch();

  useEffect(() => {
    timer(100000).subscribe(() => {
      setHideAfterTimeout(true);
      dispatch(showCookie(false));
      setCookies("cookie-shown", { shown: true }, cookieOptions(3600 * 24 * 1000));
    });
  }, []);

  if (cookie) {
    return (
      <div className={`toast cookie ${remove ? "hide-toast" : "show-toast"} ${hideAfterTimeout ? "fade-out" : ""}`}>
        <header className="flex a-i-c j-c-s-b">
          <h2 className="h3-s a-s-c">{t("cookie.header")}</h2>
          <CloseButton
            ariaLabel={t("button.cl_toast")}
            onClick={() => {
              setRemove(true);
              dispatch(showCookie(false));
              setCookies("cookie-shown", { shown: true }, cookieOptions(3600 * 24 * 1000));
            }}
          />
        </header>
        <section>
          <div className="inner-container flex a-i-c j-c-c f-f-c-n">
            <p className="f-w">
              {t("cookie.sen.fir")}
              <br/>
              <Link to={`/${i18n.language}/cookie-policy`}>{t("cookie.sen.sec")}</Link>
            </p>
            <p className="f-w">{t("cookie.sen.thi")}</p>
          </div>
        </section>
      </div>
    );
  } else {
    return null;
  }
};
