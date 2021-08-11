import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import axios from "axios";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import { displayAddUserModal, reloadChats } from "../../context/actions/chat";
import { RootState } from "../../context/rootState.interface";
import { userLinks } from "../../utils/api-endpoints.enum";
import Checkbox from "../checkbox/Checkbox";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import Modal from "../modal/Modal";
import "./AddUser.css";
import { setError } from "../../context/actions/error";

export default function AddUserModal() {
  const [userRights, setUserRights] = useState<string[]>([]);
  const [newUserId, setNewUserId] = useState<string>("");
  const [newUserIdError, setNewUserIdError] = useState<string>("");

  const [t] = useTranslation();

  const showAddUserModal = useSelector((state: RootState) => state.chat.showAddUser);
  const userId = useSelector((state: RootState) => state.auth.user._id);
  const roomId = useSelector((state: RootState) => state.chat.data.roomId);
  const rights = useSelector((state: RootState) => state.chat.rights);

  const dispatch = useDispatch();

  const { width } = useWindowDimensions();

  const rightsList = [
    {
      right: "SEND_MESSAGES",
      description: t("modal.addUser.rights.send_m"),
      onClick: () => setUserRights((prevState) => [...prevState, "SEND_MESSAGES"])
    },
    {
      right: "SEND_ATTACHMENTS",
      description: t("modal.addUser.rights.send_a"),
      onClick: () => setUserRights((prevState) => [...prevState, "SEND_ATTACHMENTS"])
    },
    {
      right: "UPDATE_MESSAGE",
      description: t("modal.addUser.rights.upd_m"),
      onClick: () => setUserRights((prevState) => [...prevState, "UPDATE_MESSAGE"])
    },
    {
      right: "DELETE_MESSAGES",
      description: t("modal.addUser.rights.del_m"),
      onClick: () => setUserRights((prevState) => [...prevState, "DELETE_MESSAGES"])
    },
    {
      right: "ADD_USER",
      description: t("modal.addUser.rights.add_u"),
      onClick: () => setUserRights((prevState) => [...prevState, "ADD_USER"])
    },
    {
      right: "DELETE_USERS",
      description: t("modal.addUser.rights.del_u"),
      onClick: () => setUserRights((prevState) => [...prevState, "DELETE_USERS"])
    },
    {
      right: "CHANGE_USER_RIGHTS",
      description: t("modal.addUser.rights.upd_rights"),
      onClick: () => setUserRights((prevState) => [...prevState, "CHANGE_USER_RIGHTS"])
    },
    {
      right: "CHANGE_ROOM",
      description: t("modal.addUser.rights.upd_r"),
      onClick: () => setUserRights((prevState) => [...prevState, "CHANGE_ROOM"])
    },
    {
      right: "DELETE_ROOM",
      description: t("modal.addUser.rights.del_r"),
      onClick: () => setUserRights((prevState) => [...prevState, "DELETE_ROOM"])
    }
  ];

  function closeModal() {
    dispatch(displayAddUserModal(false));
  }

  async function addUser() {
    await axios
      .put(
        userLinks.addUserToRoom(userId, roomId, newUserId),
        {
          userRights
        },
        {
          headers: {
            Rights: [rights]
          }
        }
      )
      .then(({ data, status }) => {
        if (data.error) {
          if (data.error.newUserIdentifier) {
            setNewUserIdError(data.error.newUserIdentifier);
          } else {
            setNewUserIdError("");
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

  return (
    <Modal onModalClose={closeModal} show={showAddUserModal} className="add-user">
      <Modal.Header onCloseModal={closeModal}>
        <h1 className="t-l h5-s">{t("modal.addUser.header")}</h1>
      </Modal.Header>
      <Modal.Body className="options flex f-f-c-n" useFocusListener={true}>
        <Input
          labelText={width < 481 ? t("label.userId") : t("label.userIdLong")}
          errorIdentifier={newUserIdError}
          errorLabelText={newUserIdError}
          onBlur={(event) => setNewUserId(event.target.value)}
          inputId="newUserId"
          name="newUserId"
          inputMode="text"
          required
          overlayPlacement="bottom"
          showTip={false}
        />
        <ul className="flex f-f-c-n">
          {rightsList.map((item, index) => (
            <li key={index}>
              <Checkbox id={item.right} reverseLayout onClick={item.onClick}>
                <p className={width < 481 ? "copyright" : "helper"}>{item.description}</p>
              </Checkbox>
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn-pr dark"
          type="button"
          onClick={() => addUser()}
        >
          <span>{t("button.addUser")}</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
