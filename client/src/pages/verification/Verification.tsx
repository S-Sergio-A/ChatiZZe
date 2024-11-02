import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import axios from "axios";
import { setError } from "../../context/actions/error";
import { login } from "../../context/actions/auth";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { logError } from "../error/errorHandler";
import { userLinks } from "../../utils/api-endpoints.enum";
import { cookieOptions } from "../../utils/cookieOptions";
import i18n from "../../utils/i18n/i18n";

import "./Verification.css";

export default function Verification() {
  const [showForm, setShowForm] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError] = useState("");

  const [newPasswordVerification, setNewPasswordVerification] = useState("");
  const [newPasswordVerificationError] = useState("");

  const [t] = useTranslation();
  const [cookies, setCookies] = useCookies<any>([]);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const pathname = location.pathname.split("/");
    const verificationType = pathname[3];
    const email = pathname[4];
    const verificationCode = pathname[5];

    switch (verificationType) {
      case "verify_email":
        axios
          .post(
            userLinks.verifyRegistration(atob(email), atob(verificationCode)),
            {},
            {
              headers: {
                "Access-Token": cookies["accessToken"]?.accessToken,
                "Refresh-Token": cookies["refreshToken"]?.refreshToken
              }
            }
          )
          .then(() =>
            history.push({
              pathname: `/${i18n.language}/user/login`
            })
          )
          .catch((error) => logError(error));
        break;
      case "reset_password":
        setShowForm(true);
        break;
      default:
        axios
          .post(
            userLinks.verifyChange(atob(verificationCode), verificationType),
            {},
            {
              headers: {
                "Access-Token": cookies["accessToken"]?.accessToken,
                "Refresh-Token": cookies["refreshToken"]?.refreshToken
              }
            }
          )
          .then(({ data }) => {
            if (data.error) {
              dispatch(setError(data.error.message));
            }

            if (data.user) {
              const expTime = cookies["user-auth"].expTime;
              setCookies("user-data", data.user, cookieOptions(expTime > 1800 ? 3600 * 24 * 30 : expTime));
              dispatch(login(data.user));
            }

            history.push({
              pathname: `/${i18n.language}`
            });
          })
          .catch((error) => logError(error));
        break;
    }
  }, []);

  async function resetPassword() {
    const pathname = location.pathname.split("/");

    const email = atob(pathname[4]);
    const verification = atob(pathname[5]);

    axios
      .post(
        userLinks.verifyPasswordReset(email),
        {
          newPassword,
          newPasswordVerification,
          verification
        },
        {
          headers: {
            "Access-Token": cookies["accessToken"]?.accessToken,
            "Refresh-Token": cookies["refreshToken"]?.refreshToken
          }
        }
      )
      .then(() =>
        history.push({
          pathname: `/${i18n.language}/user/login`
        })
      )
      .catch((error) => logError(error));
  }

  return (
    <main id="main" className="verification-page flex a-i-c j-c-c">
      {showForm ? (
        <form method="POST" className="flex a-i-c j-c-c f-f-c-n">
          <Input
            labelText={t("label.password")}
            errorIdentifier={newPasswordError}
            errorLabelText={newPasswordError}
            onBlur={(event) => setNewPassword(event.target.value)}
            inputId="password"
            name="password"
            inputMode="text"
            autoComplete="new-password"
            type="password"
            min={8}
            max={50}
            required
            tooltipText={t("tooltip.password")}
          />
          <Input
            labelText={t("label.passwordVerification")}
            errorIdentifier={newPasswordVerificationError}
            errorLabelText={newPasswordVerificationError}
            onBlur={(event) => setNewPasswordVerification(event.target.value)}
            inputId="password-verification"
            name="password-verification"
            inputMode="text"
            type="password"
            autoComplete="current-password"
            min={8}
            max={50}
            required
            tooltipText={t("tooltip.passwordVerification")}
          />
          <Button onClick={resetPassword} type="button" className="btn-pr dark btn-sm-x-w">
            <span className="flex a-i-c j-c-c">{t("button.resetPass")}</span>
          </Button>
        </form>
      ) : null}
    </main>
  );
}
