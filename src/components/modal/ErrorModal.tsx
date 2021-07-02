import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { ErrorContext } from "../../context/error/ErrorContext";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import { AuthContext } from "../../context/auth/AuthContext";
import error from "../../../assets/images/svg/internal-error.svg";
import CloseButton from "../button/close/CloseButton";

export default function ErrorModal() {
  const [t] = useTranslation();
  const { errorCode, showModal, showErrorModal } = useContext(ErrorContext);
  const authContext = useContext(AuthContext);
  const { height } = useWindowDimensions();

  function closeModal() {
    if (errorCode === 600) {
      authContext.logout();
      if (typeof window !== "undefined") {
        localStorage.removeItem("clientsToken");
      }
    }

    showErrorModal(0);
    if (errorCode === 600) {
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
  }

  return (
    <Modal className="Error-Modal Modal F-W F-H" onHide={() => closeModal()} onExit={() => closeModal()} show={showModal} centered>
      <Modal.Header className="F-W">
        <h1 className="T-L h3-size Error">
          {errorCode === 600 ? t("error.header.login") : ""}
          {errorCode === 500 ? t("error.header.internal") : ""}
          {errorCode === 50 ? t("error.header.tooManyLogins") : ""}
        </h1>
        <CloseButton onClick={() => closeModal()} ariaLabel={t("ariaLabel.close")} />
      </Modal.Header>
      <Modal.Body className="Flex J-C-S-B a-i-c F-F-C-N F-W">
        {height > 620 ? <img src={error} alt="" className="SVG-Pop-Up" /> : null}
        <p className="T-C h5-size">
          {/*{errorCode === 600 ? handleInternalServerError(600) : ''}*/}
          {/*{errorCode === 500 ? handleInternalServerError(500) : ''}*/}
          {/*{errorCode === 50 ? handleInternalServerError(50) : ''}*/}
        </p>
      </Modal.Body>
      <Modal.Footer className="Flex J-C-C a-i-c F-W">
        <button className="btn Btn-W Btn-Sm-X-W" type="button" onClick={() => closeModal()}>
          {t("button.close")}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
