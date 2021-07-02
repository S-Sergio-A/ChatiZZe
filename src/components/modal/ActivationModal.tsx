import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { timer } from "rxjs";
import i18n from "i18next";
import activation from "../../../assets/images/svg/activation.svg";
import { ModalContext } from "../../context/modal/ModalContext";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import CloseButton from "../button/close/CloseButton";
import { ActivationContext } from "../../context/activation/ActivationContext";
import { useHistory } from "react-router-dom";

export default function ActivationModal() {
  const [t] = useTranslation();
  const { showModal } = useContext(ModalContext);
  const { activationModal, notActivated } = useContext(ActivationContext);
  const { height } = useWindowDimensions();
  const history = useHistory();

  function closeModal() {
    showModal(false);

    if (activationModal) {
      timer(100).subscribe(() => {
        // @ts-ignore
        history.push({
          pathname: `${i18n.language}/user/login`,
          isLoggedIn: false
        });
      });
    }
  }

  return (
    <Modal
      className="activation modal j-c-c a-i-c f-w f-h"
      onHide={() => closeModal()}
      onExit={() => closeModal()}
      show={activationModal || notActivated}
      centered
    >
      <Modal.Header className="f-w">
        <h1 className="t-l h3-s error">{notActivated ? t("modal.activation.notActive.header") : t("modal.activation.activate.header")}</h1>
        <CloseButton onClick={() => closeModal()} ariaLabel={t("button.close")} />
      </Modal.Header>
      <Modal.Body className="flex j-c-f-s a-i-c f-f-c-n f-w">
        {height > 620 ? <img src={activation} alt="" className="svg-pop-up" /> : null}
        <p className="t-j h6-s">{notActivated ? t("modal.activation.notActive.body") : t("modal.activation.activate.body")}</p>
      </Modal.Body>
      <Modal.Footer className="flex j-c-c a-i-c f-w">
        <button className="btn btn-w btn-sm-x-w" type="button" onClick={() => closeModal()}>
          {t("button.close")}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
