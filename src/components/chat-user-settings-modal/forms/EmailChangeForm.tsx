import React, { Dispatch, useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { timer } from "rxjs";
import axios from "axios";
import { RootState } from "../../../context/rootState.interface";
import { userLinks } from "../../../utils/api-endpoints.enum";
import { Button } from "../../button/Button";
import { Input } from "../../input/Input";
import { setError } from "../../../context/actions/error";
import { useCookies } from "react-cookie";
import { logout } from "../../../context/actions/auth";
import i18n from "i18next";
import { useHistory } from "react-router-dom";

export default function EmailChangeForm({ emailChange, setEmailChange }: { emailChange: boolean; setEmailChange: Dispatch<boolean> }) {
  const [t] = useTranslation();
  const [cookies, set, removeCookie] = useCookies<any>([]);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const user = useSelector((state: RootState) => state.auth.user);

  const [animate, setAnimate] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (emailChange && firstRender) {
      timer(300).subscribe(() => {
        setFirstRender(true);
      });
    }

    if (!emailChange) {
      timer(300).subscribe(() => {
        setAnimate(true);
      });
    } else {
      setAnimate(false);
    }
  }, [emailChange]);

  async function changeEmail() {
    const fp = await FingerprintJS.load();
    const result = await fp.get();

    await axios
      .put(
        userLinks.changeEmail,
        {
          oldEmail: user.email,
          newEmail: email
        },
        {
          headers: {
            "x-fingerprint": result.visitorId,
            "x-access-token": cookies["accessToken"]?.accessToken,
            "x-refresh-token": cookies["refreshToken"]?.refreshToken
          }
        }
      )
      .then(({ data }) => {
        if (data.error) {
          if (data.error.email) {
            setEmailError(data.error.email);
          } else {
            setEmailError("");
          }

          if (data.error.message) {
            dispatch(setError(data.error.message));
          }
        } else {
          setEmailChange(false);
          new Promise(() => {
            dispatch(logout());
            removeCookie("user-auth");
            removeCookie("user-data");
            removeCookie("x-access-token");
            removeCookie("x-refresh-token");
          }).then(() => history.push({ pathname: `/${i18n.language}` }));
        }
      });
  }

  return (
    <div className={`block-email ${animate ? "reduce" : "enlarge"}`}>
      <Button onClick={() => setEmailChange(!emailChange)} layoutType="grid" className={`btn-sec btn-sm ${emailChange ? "active" : ""}`}>
        <span>{t("modal.settings.form.email")}</span>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="15px"
          height="15px"
          className="drop j-s-e"
          viewBox="0 0 451.847 451.847"
          xmlSpace="preserve"
        >
          <path
            d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751
                  c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0
                  c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"
          />
        </svg>
      </Button>
      <fieldset className={`${!firstRender && emailChange ? "show-form" : "hide-form"} ${animate ? "none" : ""} email`}>
        <Input labelText={t("label.oldEmail")} inputId="old-email" showTip={false} disabled value={user.email} />
        <Input
          labelText={t("label.newEmail")}
          errorIdentifier={emailError}
          errorLabelText={emailError}
          onBlur={(event) => setEmail(event.target.value)}
          inputId="new-email"
          name="new-email"
          inputMode="email"
          autoComplete="email"
          type="email"
          required
          tooltipText={t("tooltip.email")}
        />
        <Button onClick={changeEmail} className="btn-pr dark">
          <span>{t("button.update")}</span>
        </Button>
      </fieldset>
    </div>
  );
}
