import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { timer } from "rxjs";
import { showVerification } from "../../context/actions/notification";
import { RootState } from "../../context/rootState.interface";
import CloseButton from "../button/close/CloseButton";
import "./Verification.css";

export const SuccessfulVerification = () => {
  const [t] = useTranslation();

  const [remove, setRemove] = useState(false);
  const [hideAfterTimeout, setHideAfterTimeout] = useState(false);

  const verification = useSelector((state: RootState) => state.notification.showVerification);
  const dispatch = useDispatch();

  useEffect(() => {
    timer(10000).subscribe(() => {
      setHideAfterTimeout(true);
      dispatch(showVerification(false));
    });
  }, []);

  if (verification) {
    return (
      <div className={`toast verification ${remove ? "hide-toast" : "show-toast"} ${hideAfterTimeout ? "fade-out" : ""}`}>
        <header className="flex a-i-c j-c-s-b">
          <h2 className="h3-s">{t("verification.header")}</h2>
          <CloseButton
            ariaLabel={t("button.cl_toast")}
            onClick={() => {
              setRemove(true);
              dispatch(showVerification(false));
            }}
          />
        </header>
        <section>
          <div className="inner-container">
            <p className="f-w">{t("verification.details")}</p>
          </div>
        </section>
      </div>
    );
  } else {
    return null;
  }
};
