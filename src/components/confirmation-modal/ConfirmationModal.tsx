import { useTranslation } from "react-i18next";
import React from "react";
import { Button } from "../button/Button";
import Modal from "../modal/Modal";
import "./ConfirmationModal.css";

export default function ConfirmationModal({
  show,
  action,
  onClose,
  message
}: {
  show: boolean;
  action: () => void;
  onClose: () => void;
  message: string;
}) {
  const [t] = useTranslation();

  return (
    <Modal onModalClose={onClose} show={show} className="confirm">
      <Modal.Header onCloseModal={onClose} layoutType="grid">
        <h1 className="h5-s">{message}</h1>
      </Modal.Header>
      <Modal.Footer className="flex j-c-s-a a-i-c">
        <Button
          onClick={() => {
            action();
            onClose();
          }}
          className="btn-sec btn-sm"
        >
          {t("button.confirm")}
        </Button>
        <Button onClick={onClose} className="btn-ter btn-sm">
          {t("modal.close")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
