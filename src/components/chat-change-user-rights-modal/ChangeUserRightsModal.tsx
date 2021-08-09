import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import { RootState } from "../../context/rootState.interface";
import { userLinks } from "../../utils/api-endpoints.enum";
import Checkbox from "../checkbox/Checkbox";
import { Button } from "../button/Button";
import Modal from "../modal/Modal";
import "./ChangeR.css";
import { setError } from "../../context/actions/error";

export default function ChangeUserRightsModal({
  userRights,
  _id,
  username,
  show,
  onClose
}: {
  userRights: string[];
  _id: string;
  username: string;
  show: boolean;
  onClose: () => void;
}) {
  const [newRights, setNewRights] = useState<string[]>(userRights);

  const [t] = useTranslation();

  const userId = useSelector((state: RootState) => state.auth.user._id);
  const roomId = useSelector((state: RootState) => state.chat.roomId);
  const rights = useSelector((state: RootState) => state.chat.rights);

  const { width } = useWindowDimensions();

  const dispatch = useDispatch();

  const rightsList = [
    {
      right: "SEND_MESSAGES",
      description: t("modal.addUser.rights.send_m"),
      onClick: () => setNewRights((prevState) => [...prevState, "SEND_MESSAGES"])
    },
    {
      right: "SEND_ATTACHMENTS",
      description: t("modal.addUser.rights.send_a"),
      onClick: () => setNewRights((prevState) => [...prevState, "SEND_ATTACHMENTS"])
    },
    {
      right: "UPDATE_MESSAGE",
      description: t("modal.addUser.rights.upd_m"),
      onClick: () => setNewRights((prevState) => [...prevState, "UPDATE_MESSAGE"])
    },
    {
      right: "DELETE_MESSAGES",
      description: t("modal.addUser.rights.del_m"),
      onClick: () => setNewRights((prevState) => [...prevState, "DELETE_MESSAGES"])
    },
    {
      right: "ADD_USER",
      description: t("modal.addUser.rights.add_u"),
      onClick: () => setNewRights((prevState) => [...prevState, "ADD_USER"])
    },
    {
      right: "DELETE_USERS",
      description: t("modal.addUser.rights.del_u"),
      onClick: () => setNewRights((prevState) => [...prevState, "DELETE_USERS"])
    },
    {
      right: "CHANGE_USER_RIGHTS",
      description: t("modal.addUser.rights.upd_rights"),
      onClick: () => setNewRights((prevState) => [...prevState, "CHANGE_USER_RIGHTS"])
    },
    {
      right: "CHANGE_ROOM",
      description: t("modal.addUser.rights.upd_r"),
      onClick: () => setNewRights((prevState) => [...prevState, "CHANGE_ROOM"])
    },
    {
      right: "DELETE_ROOM",
      description: t("modal.addUser.rights.del_r"),
      onClick: () => setNewRights((prevState) => [...prevState, "DELETE_ROOM"])
    }
  ];

  async function changeUserRights() {
    await axios
      .put(
        userLinks.changeUserRightsInRoom(userId, _id, roomId),
        {
          userRights: newRights
        },
        {
          headers: {
            Rights: [rights]
          }
        }
      )
      .then(({ data, status }) => {
        if (data.error) {
          dispatch(setError(data.error.message));
        }
      });
  }

  return (
    <Modal onModalClose={onClose} show={show} className="change">
      <Modal.Header onCloseModal={onClose}>
        <h1 className="t-l h5-s">{t("modal.userRights.header")}</h1>
      </Modal.Header>
      <Modal.Body className="options flex f-f-c-n" useFocusListener={true}>
        <p>{username}</p>
        <ul className="flex f-f-c-n">
          {rightsList.map((item, index) => (
            <li key={index}>
              <Checkbox id={item.right} reverseLayout isChecked={userRights && userRights.includes(item.right)} onClick={item.onClick}>
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
          onClick={() => {
            changeUserRights().then(() => onClose());
          }}
        >
          <span>{t("button.ch_r")}</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
