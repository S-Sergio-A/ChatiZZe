import { useTranslation } from "react-i18next";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { userLinks } from "../../utils/api-endpoints.enum";
import { Button } from "../../components/button/Button";
import { Card } from "../../components/card/Card";
import Head from "../../components/head/Head";
import i18n from "../../utils/i18n/i18n";
import { logError } from "../error/errorHandler";
import { SecondPage } from "./registration-pages/SecondPage";
import { FirstPage } from "./registration-pages/FirstPage";
import { ThirdPage } from "./registration-pages/ThirdPage";
import "./Registration.css";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import { setError } from "../../context/actions/error";
import { useDispatch } from "react-redux";

// import (/* webpackChunkName: "homepage", webpackPrefetch: true */ './Homepage');

export default function Registration() {
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [passwordVerification, setPasswordVerification] = useState("");
  const [passwordVerificationError, setPasswordVerificationError] = useState("");

  const [t] = useTranslation();

  const dispatch = useDispatch();

  const { width } = useWindowDimensions();

  async function nextPage() {
    if (currentPage === 3) {
      await handleRegistration();
    } else {
      setCurrentPage(currentPage + 1);
    }
  }

  async function previousPage() {
    setCurrentPage(currentPage - 1);
  }

  async function handleRegistration() {
    await axios
      .post(userLinks.registration, {
        email,
        username,
        phoneNumber,
        password,
        passwordVerification
      })
      .then(({ data, status }) => {
        const { errors } = data;

        if (errors) {
          if (errors.email) {
            setEmailError(errors.email);
          }
          if (errors.phoneNumber) {
            setPhoneNumberError(errors.phoneNumber);
          }
          if (errors.username) {
            setUsernameError(errors.username);
          }
          if (errors.password) {
            setPasswordError(errors.password);
          }
          if (errors.passwordVerification) {
            setPasswordVerificationError(errors.passwordVerification);
          }
          // dispatch(setError(errors));
        } else {
          setPhoneNumber("");
          setUsername("");
          setEmail("");
          setPassword("");
          setPasswordVerification("");

          if (status === 201) {
            setSuccess(true);
          }
        }
      })
      .catch((error) => logError(error));
  }

  return (
    <main id="main" className="registration-page grid">
      <Head
        title={t("signUp.seo.title")}
        cardTitle={t("signUp.seo.title")}
        description={t("signUp.seo.description")}
        cardDescription={t("signUp.seo.description")}
      />
      {!success ? (
        <Fragment>
          <Card layoutType="grid">
            <header className="t-c">
              <h1>{t("signUp.header")}</h1>
            </header>
            <form className="form flex a-i-c j-c-s-b f-f-c-n f-w" method="POST">
              {currentPage === 1 ? (
                <Fragment>
                  <FirstPage phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} phoneNumberError={phoneNumberError} />
                  <div className="button-con flex a-i-c j-c-c f-f-c-n">
                    <Button onClick={nextPage} type="button" className={`btn-pr dark ${width < 769 ? "btn-sm" : "btn-sm-x-w"}`}>
                      <span className="flex a-i-c j-c-c">{t("button.continue")}</span>
                    </Button>
                  </div>
                </Fragment>
              ) : null}
              {currentPage === 2 ? (
                <Fragment>
                  <SecondPage
                    email={email}
                    username={username}
                    setEmail={setEmail}
                    setUsername={setUsername}
                    emailError={emailError}
                    usernameError={usernameError}
                  />
                  <div className="button-con flex a-i-c j-c-s-b f-f-r-n">
                    <Button onClick={previousPage} type="button" className={`btn-pr dark ${width < 769 ? "btn-sm" : "btn-sm-x-w"}`}>
                      <span className="flex a-i-c j-c-c">{t("button.prev")}</span>
                    </Button>
                    <Button onClick={nextPage} type="button" className={`btn-pr dark ${width < 769 ? "btn-sm" : "btn-sm-x-w"}`}>
                      <span className="flex a-i-c j-c-c">{t("button.continue")}</span>
                    </Button>
                  </div>
                </Fragment>
              ) : null}
              {currentPage === 3 ? (
                <Fragment>
                  <ThirdPage
                    password={password}
                    passwordVerification={passwordVerification}
                    setPassword={setPassword}
                    setPasswordVerification={setPasswordVerification}
                    passwordError={passwordError}
                    passwordVerificationError={passwordVerificationError}
                  />
                  <div className="button-con flex a-i-c j-c-s-b f-f-r-n">
                    <Button onClick={previousPage} type="button" className={`btn-pr dark ${width < 769 ? "btn-sm" : "btn-sm-x-w"}`}>
                      <span className="flex a-i-c j-c-c">{t("button.prev")}</span>
                    </Button>
                    <Button onClick={nextPage} type="button" className={`btn-pr dark ${width < 769 ? "btn-sm" : "btn-sm-x-w"}`}>
                      <span className="flex a-i-c j-c-c">{t("button.signUp")}</span>
                    </Button>
                  </div>
                </Fragment>
              ) : null}
            </form>
          </Card>
          <section className="b-b flex j-c-c a-i-c">
            <Link to={`/${i18n.language}/user/login`} className="h6-s">
              {t("signUp.link.login")}
            </Link>
          </section>
        </Fragment>
      ) : (
        <header className="flex a-i-c j-c-c">
          <h1 className="t-c">{t("signUp.created")}</h1>
        </header>
      )}
    </main>
  );
}
