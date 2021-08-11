import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import { useState } from "react";
import axios from "axios";
import { showForgotPassword } from "../../context/actions/auth";
import { RootState } from "../../context/rootState.interface";
import { userLinks } from "../../utils/api-endpoints.enum";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import Modal from "../modal/Modal";

export default function ForgotPasswordModal() {
  const [t] = useTranslation();
  const [cookies] = useCookies([]);

  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const forgor = useSelector((state: RootState) => state.auth.showForgotPassword);

  const dispatch = useDispatch();

  async function requestPasswordReset() {
    axios
      .post(
        userLinks.resetPassword,
        { email },
        {
          headers: {
            "Access-Token": cookies["accessToken"]?.accessToken,
            "Refresh-Token": cookies["refreshToken"]?.refreshToken,
            withCredentials: true
          }
        }
      )
      .then(({ data, status }) => {
        if (data.error.email) {
          setEmailError(data.error.email);
        } else {
          setEmailError("");
        }

        if (!data.error && status === 200) setPage(2);
      });
  }

  return (
    <Modal onModalClose={() => dispatch(showForgotPassword(false))} show={forgor} className="chat error">
      <Modal.Header onCloseModal={() => dispatch(showForgotPassword(false))} layoutType="flex">
        <h1 className="h6-s">{t("modal.forgot.header")}</h1>
      </Modal.Header>
      <Modal.Body className="flex t-c">
        {page === 1 ? (
          <Input
            inputId="email-to-verify"
            labelText={t("label.email")}
            onBlur={(event) => setEmail(event.target.value)}
            inputMode="email"
            name="email"
            errorIdentifier={emailError}
            errorLabelText={emailError}
            autoComplete="email"
            type="email"
            showTip={false}
          />
        ) : (
          <p className="h6-s">{t("modal.forgot.message")}</p>
        )}
      </Modal.Body>
      {page === 1 ? (
        <Modal.Footer>
          <Button onClick={requestPasswordReset} className="btn-sec btn-sm-x-w">
            {t("button.reset")}
          </Button>
        </Modal.Footer>
      ) : null}
    </Modal>
  );
}
