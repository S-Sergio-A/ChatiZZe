import { Dispatch, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { timer } from "rxjs";
import axios from "axios";
import { userLinks } from "../../../utils/api-endpoints.enum";
import { Button } from "../../button/Button";
import { Input } from "../../input/Input";
import { setError } from "../../../context/actions/error";
import { useDispatch } from "react-redux";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { Cookies, useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { logout } from "../../../context/actions/auth";
import i18n from "i18next";

export default function PasswordChangeForm({
  passwordChange,
  setPasswordChange
}: {
  passwordChange: boolean;
  setPasswordChange: Dispatch<boolean>;
}) {
  const [t] = useTranslation();
  const [cookies] = useCookies([]);

  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");

  const [animate, setAnimate] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (passwordChange && firstRender) {
      timer(300).subscribe(() => {
        setFirstRender(true);
      });
    }

    if (!passwordChange) {
      timer(300).subscribe(() => {
        setAnimate(true);
      });
    } else {
      setAnimate(false);
    }
  }, [passwordChange]);

  async function changePassword() {
    const fp = await FingerprintJS.load();
    const result = await fp.get();

    await axios
      .put(
        userLinks.changePassword,
        {
          oldPassword,
          newPassword
        },
        {
          headers: {
            fingerprint: result.visitorId,
            "Access-Token": cookies["accessToken"]?.accessToken,
            "Refresh-Token": cookies["refreshToken"]?.refreshToken
          }
        }
      )
      .then(({ data }) => {
        if (data.error) {
          if (data.error.oldPassword) {
            setOldPasswordError(data.error.oldPassword);
          } else {
            setOldPasswordError("");
          }
          if (data.error.newPassword) {
            setNewPasswordError(data.error.newPassword);
          } else {
            setNewPasswordError("");
          }

          if (data.error.message) {
            dispatch(setError(data.error.message));
          }
        } else {
          setPasswordChange(false);
          const cookie = new Cookies();
          dispatch(logout(cookie));
          history.push({ pathname: `/${i18n}/` });
        }
      });
  }

  return (
    <div className={`block-password ${animate ? "reduce" : "enlarge"}`}>
      <Button
        onClick={() => setPasswordChange(!passwordChange)}
        layoutType="grid"
        className={`btn-sec btn-sm ${passwordChange ? "active" : ""}`}
      >
        <span>{t("modal.settings.form.password")}</span>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          className="drop"
          width="15px"
          height="15px"
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
      <fieldset className={`${!firstRender && passwordChange ? "show-form" : "hide-form"} ${animate ? "none" : ""} password`}>
        <Input
          labelText={t("label.oldPassword")}
          errorIdentifier={oldPasswordError}
          errorLabelText={oldPasswordError}
          onBlur={(event) => setOldPassword(event.target.value)}
          inputId="old-password"
          name="old-password"
          inputMode="text"
          autoComplete="current-password"
          type="password"
          required
          showTip={false}
        />
        <Input
          labelText={t("label.newPassword")}
          errorIdentifier={newPasswordError}
          errorLabelText={newPasswordError}
          onBlur={(event) => setNewPassword(event.target.value)}
          inputId="new-password"
          name="new-password"
          inputMode="text"
          autoComplete="new-password"
          type="password"
          required
          tooltipText={t("tooltip.password")}
        />
        <Button onClick={changePassword} className="btn-pr dark">
          <span>{t("button.update")}</span>
        </Button>
      </fieldset>
    </div>
  );
}
