import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import { RootState } from "../../context/rootState.interface";
import { displayUserInfo } from "../../context/actions/chat";
import { options } from "../chat-data-modal/options";
import Modal from "../modal/Modal";
import "./UserInfo.css";

export default function UserInfoModal({ user }: { user: { [key: string]: any } }) {
  const [t] = useTranslation();

  const showUserInfo = useSelector((state: RootState) => state.chat.showUserInfo);
  const dispatch = useDispatch();

  const { width } = useWindowDimensions();

  function closeModal() {
    dispatch(displayUserInfo(false));
  }

  return (
    <Modal onModalClose={closeModal} show={showUserInfo} className="user">
      <Modal.Header onCloseModal={closeModal} layoutType="grid">
        <h1 className="h6-s">{user.username}</h1>
        <img width={60} height={60} src={user.photo} alt={`${user.username}`} className="user-photo j-s-c a-s-c" />
        <div className="personal-info flex a-i-f-s j-c-s-a f-f-c-n">
          {user.firstName && user.lastName ? (
            <div className="name flex j-c-c a-i-c f-w">
              <p className="h6-s">{user.firstName}</p>
              <p className="h6-s">{user.lastName}</p>
            </div>
          ) : null}
          {user.birthday ? (
            <p className={`${width < 480 ? "copyright" : "h6-s"} f-w flex j-c-s-b a-i-c`}>
              <span>{t("label.birthday")}</span> <span>{user.birthday}</span>
            </p>
          ) : null}
        </div>
      </Modal.Header>
      <Modal.Body className="chat-options grid">
        <div className="ruler f-w" />
        <div className="data flex a-i-c j-c-f-s f-f-c-n">
          <div className="flex a-i-c j-c-f-s f-w">
            <p className="helper">{t("label.phone")}</p>
            <p className="helper">{user.phoneNumber}</p>
          </div>
          <div className="flex a-i-c j-c-f-s f-w">
            <p className="helper">{t("label.email")}</p>
            <p className="helper">{user.email}</p>
          </div>
        </div>
        <div className="ruler" />
        <div className="files">
          <ul className="flex a-i-c j-c-f-s f-f-c-n f-w">
            {options.map(({ src, label }, index) => (
              <li key={index} className="f-w flex a-i-c j-c-f-s f-f-r-n">
                <a href="#" className="flex a-i-c j-c-f-s f-f-r-n f-w btn-sec no-border">
                  {src}
                  <p>{t(label)}</p>
                  {/*<p>{chatData.attachments[label]}</p>*/}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Modal.Body>
    </Modal>
  );
}
