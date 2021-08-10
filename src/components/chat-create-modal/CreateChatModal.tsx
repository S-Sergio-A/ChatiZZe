import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/rootState.interface";
import { displayCreateChatModal } from "../../context/actions/chat";
import { Input } from "../input/Input";
import Checkbox from "../checkbox/Checkbox";
import Modal from "../modal/Modal";
import axios from "axios";
import { userLinks } from "../../utils/api-endpoints.enum";
import { Button } from "../button/Button";
import { useCookies } from "react-cookie";
import { setError } from "../../context/actions/error";

export default function CreateChatModal() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [isPrivate, setIsPrivate] = useState(false);

  const [cookies] = useCookies([]);
  const [t] = useTranslation();

  const showCreateChatModal = useSelector((state: RootState) => state.chat.showCreateChat);
  const dispatch = useDispatch();

  function closeModal() {
    dispatch(displayCreateChatModal(false));
  }

  async function createChat() {
    await axios
      .post(
        userLinks.createRoom,
        {
          name,
          description,
          isUser: false,
          isPrivate,
          membersCount: 1
        },
        {
          headers: {
            "Access-Token": cookies["accessToken"]?.accessToken,
            "Refresh-Token": cookies["refreshToken"]?.refreshToken
          }
        }
      )
      .then(({ data, status }) => {
        if (data.error) {
          if (data.error.name) {
            setNameError(data.error.name);
          } else {
            setNameError("");
          }

          if (data.error.description) {
            setDescriptionError(data.error.description);
          } else {
            setDescriptionError("");
          }
        } else {
          dispatch(setError(data.error.message));
        }
      });
  }

  return (
    <Modal onModalClose={closeModal} show={showCreateChatModal}>
      <Modal.Header onCloseModal={closeModal}>
        <h1 className="t-l h5-s error">{t("modal.createChat.header")}</h1>
      </Modal.Header>
      <Modal.Body className="chat">
        <div className="form-r grid">
          <div className="form-r grid">
            <Input
              labelText={t("label.name")}
              errorIdentifier={nameError}
              errorLabelText={nameError}
              onBlur={(event) => setName(event.target.value)}
              inputId="chatName"
              name="chatName"
              inputMode="text"
              autoComplete="off"
              type="text"
              min={1}
              max={50}
              showTip={false}
              required
            />
          </div>
          <Input
            labelText={t("label.description")}
            errorIdentifier={descriptionError}
            errorLabelText={descriptionError}
            onBlur={(event) => setDescription(event.target.value)}
            inputId="description"
            name="description"
            inputMode="text"
            autoComplete="off"
            type="text"
            max={240}
            showTip={false}
            required={false}
          />
          <Checkbox onClick={() => setIsPrivate(!isPrivate)}>
            <p className="h6-s">{t("modal.createChat.isPrivate")}</p>
          </Checkbox>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn-pr dark"
          type="button"
          onClick={() => {
            createChat().then(() => closeModal());
          }}
        >
          <span>{t("button.create")}</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
