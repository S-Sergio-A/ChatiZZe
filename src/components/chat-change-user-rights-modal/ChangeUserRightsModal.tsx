import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import { RootState } from "../../context/rootState.interface";
import { userLinks } from "../../utils/api-endpoints.enum";
import { setError } from "../../context/actions/error";
import Checkbox from "../checkbox/Checkbox";
import { Button } from "../button/Button";
import Modal from "../modal/Modal";
import "./ChangeR.css";
import { useCookies } from "react-cookie";

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
  const [newRights, setNewRights] = useState<any>(
    userRights.reduce(
      (acc: any, val: string) => {
        if (val) {
          return { ...acc, [val.toLowerCase()]: true };
        }
      },
      {
        send_messages: false,
        send_attachments: false,
        delete_messages: false,
        add_users: false,
        delete_users: false,
        change_user_rights: false,
        change_room: false,
        delete_room: false,
        update_message: false
      }
    )
  );
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const [cookies] = useCookies<any>([]);

  const userId = useSelector((state: RootState) => state.auth.user._id);
  const roomId = useSelector((state: RootState) => state.chat.data.roomId);
  const rights = useSelector((state: RootState) => state.chat.rights);

  const onRightChoice = (right: string) => {
    if (newRights[right]) {
      setNewRights({ ...newRights, [right.toLowerCase()]: false });
    }
    setNewRights({ ...newRights, [right.toLowerCase()]: true });
  };

  const rightsList = [
    {
      right: "SEND_MESSAGES",
      description: t("modal.addUser.rights.send_m")
    },
    {
      right: "SEND_ATTACHMENTS",
      description: t("modal.addUser.rights.send_a")
    },
    {
      right: "UPDATE_MESSAGE",
      description: t("modal.addUser.rights.upd_m")
    },
    {
      right: "DELETE_MESSAGES",
      description: t("modal.addUser.rights.del_m")
    },
    {
      right: "ADD_USER",
      description: t("modal.addUser.rights.add_u")
    },
    {
      right: "DELETE_USERS",
      description: t("modal.addUser.rights.del_u")
    },
    {
      right: "CHANGE_USER_RIGHTS",
      description: t("modal.addUser.rights.upd_rights")
    },
    {
      right: "CHANGE_ROOM",
      description: t("modal.addUser.rights.upd_r")
    },
    {
      right: "DELETE_ROOM",
      description: t("modal.addUser.rights.del_r")
    }
  ];

  async function changeUserRights() {
    const rightsToStringArray = Object.entries(newRights)
      .map((val: any) => val[1] && val[0].toUpperCase())
      .filter((val) => !!val);

    await axios
      .put(
        userLinks.changeUserRightsInRoom(userId, _id, roomId),
        {
          newRights: rightsToStringArray
        },
        {
          headers: {
            "x-access-token": cookies["accessToken"]?.accessToken,
            "x-refresh-token": cookies["refreshToken"]?.refreshToken,
            "x-rights": [rights]
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
              <Checkbox
                id={item.right}
                reverseLayout
                isChecked={userRights && userRights.includes(item.right)}
                onClick={() => onRightChoice(item.right)}
              >
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
