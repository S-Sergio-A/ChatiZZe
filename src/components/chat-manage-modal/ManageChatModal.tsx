import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { timer } from "rxjs";
import axios from "axios";
import { displayManageChatModal, reloadChats } from "../../context/actions/chat";
import { RootState } from "../../context/rootState.interface";
import { userLinks } from "../../utils/api-endpoints.enum";
import ConfirmationModal from "../confirmation-modal/ConfirmationModal";
import ChatUsersList from "../chat-user-list/ChatUsersList";
import Checkbox from "../checkbox/Checkbox";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import Modal from "../modal/Modal";
import "./ManageChatModal.css";
import { setError } from "../../context/actions/error";

export default function ManageChatModal({ socketRef }: { socketRef: any }) {
  const userId = useSelector((state: RootState) => state.auth.user._id);
  const chatData = useSelector((state: RootState) => state.chat.data);
  const showManageChatModal = useSelector((state: RootState) => state.chat.showManageChatMenu);
  
  const [changeChat, setChangeChat] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [name, setName] = useState(chatData.chatName);
  const [nameError, setNameError] = useState("");

  const [description, setDescription] = useState(chatData?.description);
  const [descriptionError, setDescriptionError] = useState("");

  const [isPrivate, setIsPrivate] = useState(chatData?.isPrivate);

  const [nameRef, setNameRef] = useState<any>(null);
  const [descrRef, setDescrRef] = useState<any>(null);

  const [t] = useTranslation();
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (!changeChat) {
      timer(300).subscribe(() => {
        setAnimate(true);
      });
    } else {
      setAnimate(false);
    }
  }, [changeChat]);

  useEffect(() => {
    if (nameRef && nameRef?.current?.value.length === 0) {
      nameRef.current.value = chatData.chatName;
    }
  }, [nameRef]);

  useEffect(() => {
    if (descrRef && descrRef?.current?.value.length === 0) {
      descrRef.current.value = chatData?.description;
    }
  }, [descrRef]);

  function closeModal() {
    dispatch(displayManageChatModal(false));
    setAnimate(false);
    setChangeChat(false);
    setFirstRender(true);
  }

  async function updateChat() {
    await axios
      .put(userLinks.updateRoom(userId, chatData.roomId), {
        name,
        description,
        isUser: false,
        isPrivate,
        membersCount: chatData.usersID.length
      })
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

          if (data.error.message) {
            dispatch(setError(data.error.message));
          }
        } else {
          dispatch(reloadChats(true));
          closeModal();
        }
      });
  }

  async function deleteChat() {
    await axios.delete(userLinks.deleteRoom(chatData.roomId)).then(({ data, status }) => {
      if (status === 200) {
        dispatch(reloadChats(true));
        closeModal();
      }
    });
  }

  return (
    <Modal onModalClose={closeModal} show={showManageChatModal} className="manage">
      <Modal.Header onCloseModal={closeModal} layoutType="flex">
        <h1 className="h5-s">{t("modal.manageChat.header")}</h1>
      </Modal.Header>
      <Modal.Body>
        <div className="ruler f-w" />
        <div className={`wrapper flex a-i-c j-c-s-a f-f-c-n ${firstRender ? "f-r" : ""} ${animate ? "reduce" : "enlarge"}`}>
          {/*<div className={`placeholder ${changeChat ? "" : "blurred disabled"}`}/>*/}
          <div className="chat-form f-w f-h flex a-i-c j-c-s-a f-f-c-n">
            <Button
              className={`btn-sec dark ${changeChat ? "active" : ""}`}
              onClick={() => {
                if (firstRender) {
                  setFirstRender(false);
                }
                setChangeChat(!changeChat);
              }}
            >
              <span>{t("modal.manageChat.button")}</span>
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="451.847px"
                height="451.847px"
                viewBox="0 0 451.847 451.847"
                xmlSpace="preserve"
              >
                <path
                  d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751
                  c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0
                  c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"
                />
              </svg>
            </Button>
            <form className={`grid f-w ${changeChat ? "show-form" : "hide-form"} ${animate ? "none" : ""}`}>
              <Input
                labelText={t("label.name")}
                errorIdentifier={nameError}
                errorLabelText={nameError}
                onBlur={(event) => setName(event.target.value)}
                inputId="name"
                name="name"
                inputMode="text"
                autoComplete="off"
                type="text"
                setInputRef={setNameRef}
                required
                showTip={false}
                tooltipText={t("tooltip.name")}
              />
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
                setInputRef={setDescrRef}
                required={false}
                showTip={false}
                tooltipText={t("tooltip.description")}
              />
              <Checkbox reverseLayout onClick={() => setIsPrivate(!isPrivate)} isChecked={isPrivate}>
                <p className="h6-s">{t("modal.createChat.isPrivate")}</p>
              </Checkbox>
              <Button
                className="btn-pr dark j-s-c a-s-c"
                type="button"
                onClick={() => {
                  updateChat().then(() => closeModal());
                }}
              >
                <span>{t("button.addUser")}</span>
              </Button>
            </form>
          </div>
        </div>
        <div className="ruler f-w" />
        <ChatUsersList users={chatData.usersID} socketRef={socketRef} />
        <div className="ruler f-w" />
        <div className="del-cont flex j-c-c a-i-c">
          <ConfirmationModal
            show={confirmDelete}
            action={deleteChat}
            onClose={() => setConfirmDelete(false)}
            message={t("modal.confirm.del_ch")}
          />
          <Button className="btn-pr dark btn-sm-x-w" onClick={() => setConfirmDelete(true)}>
            <span>{t("button.del_ch")}</span>
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
