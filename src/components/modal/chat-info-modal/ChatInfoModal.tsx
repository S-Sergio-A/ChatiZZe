import React, { useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import useWindowDimensions from "../../../utils/hooks/useWindowDimensions";
import { ChatInfoContext } from "../../../context/chat-info/ChatInfoContext";
import useOutsideClick from "../../../utils/hooks/useOutsideClick";
import CloseButton from "../../button/close/CloseButton";
import { Button } from "../../button/Button";

//TODO add layout as in Telegram

export default function ChatInfoModal() {
  const [t] = useTranslation();
  const { show, showChatInfo } = useContext(ChatInfoContext);
  const { height } = useWindowDimensions();
  const modalRef = useRef(null);

  useOutsideClick(modalRef, closeModal);

  function closeModal() {
    showChatInfo(false);
  }

  return (
    <Modal
      className="activation modal j-c-c a-i-c f-w f-h"
      onHide={() => closeModal()}
      onExit={() => closeModal()}
      show={show}
      centered
      ref={modalRef}
    >
      <Modal.Header className="f-w">
        <div>
          <h1>Information about the group</h1>
          <Button onClick={() => showChatInfo(show)} type="button" ariaLabel="Show chat information">
            dots
          </Button>
          <CloseButton onClick={closeModal} ariaLabel="Show chat information" />
        </div>
      </Modal.Header>
      <Modal.Body className="flex j-c-f-s a-i-c f-f-c-n f-w">
        <div>
          <img src="/bell.svg" alt="" />
          Notifications
          {/*<Button/>*/}
        </div>
        <div>
          <ul>
            <li>
              <img src="/photos.svg" alt="" />
<span>2082 photos</span>
            </li>
          </ul>
        </div>
      </Modal.Body>
    </Modal>
  );
}
