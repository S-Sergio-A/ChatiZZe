import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import Head from "../../components/head/Head";
import { Form } from "../../components/form/Form";
import { Card } from "../../components/card/Card";
import { Button } from "../../components/button/Button";
import axios from "axios";
import { SecondPage } from "./registration-pages/SecondPage";
import { FirstPage } from "./registration-pages/FirstPage";
import { ThirdPage } from "./registration-pages/ThirdPage";
import { logError } from "../error/errorHandler";
import { userLinks } from "../../utils/api-endpoints.enum";
import { ErrorContext } from "../../context/error/ErrorContext";
import { ActivationContext } from "../../context/activation/ActivationContext";
import "./Registration.css";

// import (/* webpackChunkName: "homepage", webpackPrefetch: true */ './Homepage');

export default function Registration() {
  const [currentPage, setCurrentPage] = useState(1);
  const [animate, setAnimate] = useState(false);

  const [telNum, setTelNum] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("");

  const [t] = useTranslation();

  const { showErrorModal } = useContext(ErrorContext);
  const { showNotActivatedModal } = useContext(ActivationContext);

  async function nextPage() {
    if (currentPage === 3) {
      await handleRegistration();
    } else {
      setCurrentPage(currentPage + 1);
    }
  }

  async function handleRegistration() {
    await axios
      .post(userLinks.register, {
        telNum,
        username,
        email,
        password,
        passwordVerification
      })
      .then((response) => {
        const { errors } = response.data;

        if (errors) {
          if (errors) {
            if (errors.code === 500) {
              showErrorModal(500);
            } else if (errors.code === 40) {
              showErrorModal(500);
            }
          }
        } else {
          setAnimate(true);
          setTelNum("");
          setUsername("");
          setEmail("");
          setPassword("");
          setPasswordVerification("");
        }
      })
      .catch((error) => logError(error));
  }

  return (
    <div className="login-page flex j-c-c a-i-c">
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
          {currentPage === 1 ? (
            <React.Fragment>
              <FirstPage telNum={telNum} setTelNum={setTelNum} />
              <div className="Form-B">
                <Button onClick={nextPage}>Continue</Button>
              </div>
            </React.Fragment>
          ) : null}
          {currentPage === 2 ? (
            <React.Fragment>
              <SecondPage email={email} username={username} setEmail={setEmail} setUsername={setUsername} />
              <div className="Form-B">
                <Button onClick={nextPage}>Continue</Button>
              </div>
            </React.Fragment>
          ) : null}
          {currentPage === 3 ? (
            <React.Fragment>
              <ThirdPage
                password={password}
                passwordVerification={passwordVerification}
                setPassword={setPassword}
                setPasswordVerification={setPasswordVerification}
              />
              <div className="Form-B">
                <Button type="button" onClick={nextPage}>
                  Register
                </Button>
              </div>
            </React.Fragment>
          ) : null}
        </Form>
      </Card>
      <section className="B-B flex J-C-C a-i-c">
        <Link to={`/${i18n.language}/user/login`} className="h6-size font-weight_300">
          Already have an account? Log in!
        </Link>
      </section>
    </div>
  );
}
