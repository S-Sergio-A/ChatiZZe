import { Link, useHistory, useLocation } from "react-router-dom";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { timer } from "rxjs";
import axios from "axios";
import ForgotPasswordModal from "../../components/forgot-password-modal/ForgotPasswordModal";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import { login, showForgotPassword } from "../../context/actions/auth";
import { getRandomColor } from "../../utils/color/shadeColor";
import { userLinks } from "../../utils/api-endpoints.enum";
import Checkbox from "../../components/checkbox/Checkbox";
import { cookieOptions } from "../../utils/cookieOptions";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { Card } from "../../components/card/Card";
import Head from "../../components/head/Head";
import i18n from "../../utils/i18n/i18n";
import { logError } from "../error/errorHandler";
import "./Login.css";
import { setError } from "../../context/actions/error";

export default function Login() {
  const [userIdentifier, setUserIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [userIdentifierError, setUserIdentifierError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [rememberMe, setRememberMe] = useState(false);
  const [animate, setAnimate] = useState(false);

  const [cookies, setCookies] = useCookies([]);

  const [t] = useTranslation();

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { width } = useWindowDimensions();

  async function handleLogin() {
    setUserIdentifierError("");
    setPasswordError("");
    const fp = await FingerprintJS.load();
    const result = await fp.get();

    let prop: string;

    if (userIdentifier.includes("@")) {
      prop = "email";
    } else if (userIdentifier.includes("+")) {
      prop = "phoneNumber";
    } else {
      prop = "username";
    }

    await axios
      .post(
        userLinks.login,
        {
          [prop]: userIdentifier,
          password,
          rememberMe
        },
        {
          headers: {
            Fingerprint: result.visitorId
          }
        }
      )
      .then((response) => {
        const { error, accessToken, refreshToken, user } = response.data;

        if (error) {
          if (error.email) {
            setUserIdentifierError(error.email);
          } else if (error.phoneNumber) {
            setUserIdentifierError(error.phoneNumber);
          } else if (error.username) {
            setUserIdentifierError(error.username);
          } else {
            setUserIdentifierError("");
          }

          if (error.password) {
            setPasswordError(error.password);
          } else {
            setPasswordError("");
          }

          if (error.internalFailure) {
            dispatch(setError(error.internalFailure));
          }
        } else {
          setAnimate(true);
          timer(400).subscribe(() => setAnimate(false));

          setCookies(
            "dummy-photo",
            {
              photo: (
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 248.349 248.349">
                  <path
                    fill={getRandomColor()}
                    d="M9.954,241.305h228.441c3.051,0,5.896-1.246,7.805-3.416c1.659-1.882,2.393-4.27,2.078-6.723
                    c-5.357-41.734-31.019-76.511-66.15-95.053c-14.849,14.849-35.348,24.046-57.953,24.046s-43.105-9.197-57.953-24.046
                    C31.09,154.65,5.423,189.432,0.071,231.166c-0.315,2.453,0.424,4.846,2.078,6.723C4.058,240.059,6.903,241.305,9.954,241.305z"
                  />
                  <path
                    fill={getRandomColor()}
                    d="M72.699,127.09c1.333,1.398,2.725,2.73,4.166,4.019c12.586,11.259,29.137,18.166,47.309,18.166
                    s34.723-6.913,47.309-18.166c1.441-1.289,2.834-2.622,4.166-4.019c1.327-1.398,2.622-2.828,3.84-4.329
                    c9.861-12.211,15.8-27.717,15.8-44.6c0-39.216-31.906-71.116-71.116-71.116S53.059,38.95,53.059,78.16
                    c0,16.883,5.939,32.39,15.8,44.6C70.072,124.262,71.366,125.687,72.699,127.09z"
                  />
                </svg>
              )
            },
            cookieOptions(rememberMe ? 3600 * 24 * 30 : 1800)
          );
          setCookies("accessToken", { accessToken: accessToken }, cookieOptions(rememberMe ? 3600 * 24 * 30 : 1800));
          setCookies("refreshToken", { refreshToken: refreshToken }, cookieOptions(3600 * 24 * 60));
          setCookies("user-data", user, cookieOptions(rememberMe ? 3600 * 24 * 30 : 1800));
          setCookies(
            "user-auth",
            { logged: true, expTime: rememberMe ? 3600 * 24 * 30 : 1800 },
            cookieOptions(rememberMe ? 3600 * 24 * 30 : 1800)
          );

          dispatch(login(user));
          if (location.pathname === `/${i18n.language}/user/login`) {
            history.push({
              pathname: `/${i18n.language}/chat`
            });
          }
        }
      })
      .catch((error) => logError(error));
  }

  return (
    <main id="main" className="login-page grid">
      <Head
        title={t("login.seo.title")}
        cardTitle={t("login.seo.title")}
        description={t("login.seo.description")}
        cardDescription={t("login.seo.description")}
      />
      <Card layoutType="grid">
        <header className="flex a-i-c j-c-c t-c">
          <h1 className="h2-s">{t("login.header")}</h1>
        </header>
        <form className="form grid f-w" method="POST">
          <div className="form-r grid">
            <div className="form-r grid">
              <Input
                labelText={width > 700 ? t("label.userIdLong") : t("label.userId")}
                errorIdentifier={userIdentifierError}
                errorLabelText={userIdentifierError}
                onBlur={(event) => setUserIdentifier(event.target.value)}
                inputId="username"
                name="username"
                inputMode="text"
                autoComplete="username"
                type="email"
                required
                showTip={false}
                value={userIdentifier}
              />
            </div>
            <Input
              labelText={t("label.password")}
              errorIdentifier={passwordError}
              errorLabelText={passwordError}
              onBlur={(event) => setPassword(event.target.value)}
              inputId="password"
              name="password"
              inputMode="text"
              autoComplete="new-password"
              min={8}
              max={50}
              type="password"
              required
              showTip={false}
              value={password}
            />
            <Checkbox onClick={() => setRememberMe(!rememberMe)}>
              <p className="h6-s">{t("login.remember")}</p>
            </Checkbox>
          </div>
          <div className={`button-con flex a-i-c ${width < 769 ? "f-f-c-n j-c-c" : "f-f-r-n j-c-s-b"}`}>
            <Button onClick={handleLogin} type="button" className="btn-pr dark btn-sm-x-w">
              <span className="flex a-i-c j-c-c">{t("login.button")}</span>
            </Button>
            <button onClick={() => alert(t("alert.notImplYet"))} type="button" className="google" aria-label={t("login.google")} />
          </div>
        </form>
      </Card>
      <section className="b-b flex j-c-c a-i-c f-f-c-n">
        <Link to={`/${i18n.language}/user/registration`} className="h6-s">
          {t("login.link.signUp")}
        </Link>
        <Button onClick={() => dispatch(showForgotPassword(true))} type="button" className="h6-s f-w__300">
          {t("login.forgor")}
        </Button>
      </section>
      <ForgotPasswordModal />
    </main>
  );
}
