import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../../context/rootState.interface";
import { displayChatData } from "../../context/actions/chat";
import ChangePhoto from "../button/change-photo/ChangePhoto";
import ChatUsersList from "../chat-user-list/ChatUsersList";
import Switch from "../switch/Switch";
import Modal from "../modal/Modal";
import "./ChatData.css";
import { options } from "./options";
import { getRandomColor } from "../../utils/color/shadeColor";

export default function ChatDataModal({
  users,
  chatData,
  socketRef
}: {
  users: { [key: string]: any }[];
  chatData: { [key: string]: any };
  socketRef: any;
}) {
  const [t] = useTranslation();

  const showChatDataModal = useSelector((state: RootState) => state.chat.showChatData);

  const dispatch = useDispatch();

  return (
    <Modal onModalClose={() => dispatch(displayChatData(false))} show={showChatDataModal} className="chat chat-data">
      <Modal.Header onCloseModal={() => dispatch(displayChatData(false))} layoutType="grid">
        <h1 className="h5-s">{t("modal.chatData.header")}</h1>
        <div className="group-info flex a-i-c j-c-s-b">
          <ChangePhoto
            type={chatData.logo ? "img" : "svg"}
            alt={`${chatData?.name} ${t("chatLogo")}`}
            previousState={
              chatData.logo ? (
                chatData.logo
              ) : (
                <svg height="100" viewBox="0 0 512 512" width="100" xmlns="http://www.w3.org/2000/svg" className="chat-logo">
                  <title>{chatData?.name + " " + t("chatLogo")}</title>
                  <path
                    fill={getRandomColor()}
                    d="m40.831 368.544c4.869-3.891 7.779-8.554 8.647-13.89 1.137-6.991-1.325-15.447-6.586-22.621-9.94-13.551-7.025-32.919-4.638-42.64a15.677 15.677 0 0 0 -7.952 2.591 15.492 15.492 0 0 0 -6.708 10c-3.774 19.184-5.329 45.437 8.691 61.562a15.6 15.6 0 0 0 8.546 4.998z"
                  />
                  <path
                    fill={getRandomColor()}
                    d="m324.5 148.542a168.485 168.485 0 0 1 35.8-40.975c-3.085-8.623-5.876-10.422-12.6-14.757a131.664 131.664 0 0 1 -20.679-15.976c-10.86-10.16-19.121-28.267-25.161-41.487-.624-1.367-1.281-2.807-1.944-4.237 1.5 9.834 2.24 24.5-7.73 44.32-12.925 25.7-4.388 62.611-.964 74.859 16.178-2.813 27.757-2.309 33.278-1.747z"
                  />
                  <path fill={getRandomColor()} d="m228.315 240.99a3.186 3.186 0 1 0 3.187 3.185 3.189 3.189 0 0 0 -3.187-3.185z" />
                  <path
                    fill={getRandomColor()}
                    d="m486.224 314.184-16.4-8.836a45.268 45.268 0 0 1 -20.852-23.691c-9.41-24.68-21.463-30.445-24.377-31.508a168.176 168.176 0 0 1 -28.637 1.977 5 5 0 0 1 0-10c21.3 0 38.017-1.87 50.4-11 21.864-16.11 34.466-30.226 39.659-44.422 4.665-12.755 3.222-25.137 1.552-39.474-1.5-12.842-3.193-27.4-.89-45.052 4.667-35.779 2.19-62.345-.15-76.672-1.1 1.585-2.357 3.312-3.766 5.147-7.269 24.794-42.731 71.5-83.657 90.522-11.369 5.284-22.42 17.394-28.842 31.6-5.435 12.027-9.964 30.754-.673 51.672a5 5 0 1 1 -9.138 4.059c-18.34-41.286 7.7-83.973 34.438-96.4 24.836-11.544 47.96-34.563 62.78-55.361-12.871 10.997-29.905 22.775-52.171 33.597-64.071 31.146-81.274 80.891-81.44 81.39a5 5 0 0 1 -9.487-3.162 83.591 83.591 0 0 1 4.521-10.364c-7.82-.317-21.712.148-39.9 4.946-26.659 7.036-68.226 25.086-114.868 71.121a43.587 43.587 0 0 1 -11.748 8.284l-46.706 22.47a46.629 46.629 0 0 1 8.859 32.832 5 5 0 1 1 -9.933-1.151 36.879 36.879 0 0 0 -8.098-27.262l-15.839 7.62c3.671 5.013 7.8 13.629 7.8 27.045a5 5 0 0 1 -10 0c0-12.765-4.4-19.653-7-22.615l-12.925 6.219a25.85 25.85 0 0 1 -10.35 2.513c-1.986 7.425-5.432 24.968 2.58 35.891 6.916 9.429 9.975 20.415 8.393 30.141a30.219 30.219 0 0 1 -5.625 13.3c22.613.753 61.408-2.233 94.637-26.159a5 5 0 0 1 5.843 8.116c-32.283 23.244-69.248 28.037-93.749 28.135 1.951 3.237 5.978 7.013 14.3 8.537 2.976.543 7.97-.536 13.258-1.68a104.563 104.563 0 0 1 18.39-2.789c25.4-.947 37.463 6.858 51.429 15.9 7.369 4.77 14.989 9.7 25.685 14.111 39.652 16.341 72.78 27.225 105.54 27.225h.119c36.972-.03 69.845-14.046 103.454-44.111a5 5 0 0 1 6.667 7.453c-32.063 28.682-64.928 43.89-100.164 46.306a121.941 121.941 0 0 1 34.59 32.093 9.108 9.108 0 0 0 14.14.806l140.777-155.172a9.114 9.114 0 0 0 -2.426-14.147zm-89.587-93.39a5 5 0 0 1 5.647-4.237c1.466.2 34.942 4.249 51.031-35.1a5 5 0 1 1 9.255 3.786c-9.94 24.31-26.087 34.246-37.881 38.3a58.735 58.735 0 0 1 -18.873 3.184 37.7 37.7 0 0 1 -4.943-.275 5 5 0 0 1 -4.236-5.658zm-168.322 36.567a13.186 13.186 0 1 1 13.185-13.186 13.2 13.2 0 0 1 -13.185 13.186z"
                  />
                </svg>
              )
            }
            actionType="chat-photo"
          />
          <div className="flex a-i-f-s j-c-c f-f-c-n f-w">
            <p className="helper">{chatData?.name} </p>
            <p className="helper">
              {chatData?.users} {t("users")}
            </p>
            <p className="helper">
              {chatData?.usersOnline} {t("usersOnline")}
            </p>
          </div>
        </div>
        <div className="notifications flex j-c-s-b a-i-c">
          <p>{t("notifications")}</p>
          <Switch checked={true} action={() => {}} />
        </div>
      </Modal.Header>
      <Modal.Body className="chat-options grid">
        <div className="ruler" />
        <ul className="data flex a-i-c j-c-f-s f-f-c-n f-w">
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
        <div className="ruler" />
        <ChatUsersList users={users} socketRef={socketRef} />
      </Modal.Body>
    </Modal>
  );
}
