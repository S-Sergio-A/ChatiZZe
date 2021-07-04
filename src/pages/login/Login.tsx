import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import { timer } from "rxjs";
import i18n from "i18next";
import axios from "axios";
import { ActivationContext } from "../../context/activation/ActivationContext";
import { ErrorContext } from "../../context/error/ErrorContext";
import { AuthContext } from "../../context/auth/AuthContext";
import { userLinks } from "../../utils/api-endpoints.enum";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { Card } from "../../components/card/Card";
import { Form } from "../../components/form/Form";
import { logError } from "../error/errorHandler";
import Head from "../../components/head/Head";
import "./Login.css";
import Checkbox from "../../components/checkbox/Checkbox";

// import (/* webpackChunkName: "homepage", webpackPrefetch: true */ './Homepage');

export default function Login() {
  const [userIdentifier, setUserIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [userIdentifierError, setUserIdentifierError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [animate, setAnimate] = useState(false);

  const [cookies] = useCookies(["client"]);

  const [t] = useTranslation();

  const { showErrorModal } = useContext(ErrorContext);
  const { showNotActivatedModal } = useContext(ActivationContext);
  const { login } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();

  const userIdentifierOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserIdentifier(event.target.value);
  };

  const passwordOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const validateUserIdentifierOnBlur = () => {
    setUserIdentifierError("");

    // validateTelNum()
  };

  const validatePasswordOnBlur = () => {
    setPasswordError("");

    // validateTelNum()
  };

  function rememberMe() {
    console.log("remembered");
  }

  async function handleLogin() {
    setUserIdentifierError("");
    setPasswordError("");
    const fp = await FingerprintJS.load();
    const result = await fp.get();

    await axios
      .post(
        userLinks.login,
        {
          userIdentifier,
          password,
          fingerprint: result.visitorId
        },
        {
          headers: {
            "Client-Token": cookies.accessToken,
            withCredentials: true
          }
        }
      )
      .then((response) => {
        const { errors, body } = response.data;

        if (errors) {
          if (errors.code === 500) {
            showErrorModal(500);
          } else if (errors.code === 40) {
            showNotActivatedModal(true);
          } else {
            if (errors.userIdentifier) {
              setUserIdentifierError(errors.userIdentifier);
            } else {
              setUserIdentifierError("");
            }

            if (errors.password) {
              setPasswordError(errors.password);
            } else {
              setPasswordError("");
            }
          }
        } else {
          setAnimate(true);
          timer(400).subscribe(() => setAnimate(false));

          localStorage.setItem(btoa("token"), btoa(JSON.stringify(body[0].token)));
          localStorage.setItem(btoa("refreshToken"), btoa(JSON.stringify(body[1].refreshToken)));
          localStorage.setItem(
            btoa("refreshTime"),
            btoa(
              JSON.stringify({
                now: Date.now(),
                expires: Date.now() + 840000
              })
            )
          );

          timer(500).subscribe(() => {
            login();
            if (location.pathname === `/${i18n.language}/user/login`) {
              // @ts-ignore
              history.push({
                pathname: `/${i18n.language}/user/homepage`,
                isLoggedIn: true
              });
            }
          });
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
        <header className="t-c">
          <h1>Login</h1>
        </header>
        <Form success={animate}>
          <div className="form-r grid">
            <div className="form-r grid">
              <Input
                labelText="Username / Email / Phone Number"
                errorIdentifier={userIdentifierError}
                errorLabelText={userIdentifierError}
                onBlur={validateUserIdentifierOnBlur}
                onChange={userIdentifierOnChange}
                inputId="username"
                name="username"
                inputMode="text"
                autoComplete="username"
                required={true}
                tooltipText={t("tooltip.userIdentifier")}
                value={userIdentifier}
              />
            </div>
            <Input
              labelText="Password"
              errorIdentifier={passwordError}
              errorLabelText={passwordError}
              onBlur={validatePasswordOnBlur}
              onChange={passwordOnChange}
              inputId="password"
              name="password"
              inputMode="text"
              autoComplete="new-password"
              min={8}
              max={50}
              required={true}
              tooltipText={t("tooltip.password")}
              value={password}
            />
            <Checkbox onClick={rememberMe}>
              <p className="h6-s">Remember Me</p>
            </Checkbox>
          </div>
          <div className="button-con flex a-i-c j-c-c f-f-c-n">
            <Button onClick={handleLogin} type="button" className="btn-pr dark btn-sm">
              <span className="flex a-i-c j-c-c">Sign in</span>
            </Button>
            <Button onClick={rememberMe} type="button" className="btn-pr dark btn-sm-x-w">
              <span className="flex a-i-c j-c-c">Log in with Google</span>
            </Button>
          </div>
        </Form>
      </Card>
      <section className="b-b flex j-c-c a-i-c">
        <Link to={`/${i18n.language}/user/registration`} className="h6-size font-weight_300">
          Don't have an account? Try now!
        </Link>
      </section>
    </main>
  );
}
