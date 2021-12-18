import { Fragment, MutableRefObject, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import { displayUserInfo, setDeletedMessageId, setUpdatedMessageId } from "../../context/actions/chat";
import ConfirmationModal from "../confirmation-modal/ConfirmationModal";
import { RootState } from "../../context/rootState.interface";
import { Button } from "../button/Button";
import "./Message.css";

export default function Message({
  setChosenUser,
  socketRef,
  messageId,
  user,
  text,
  timestamp,
  attachments,
  nextMessageAuthorId
}: {
  setChosenUser: (user: { [key: string]: any }) => void;
  socketRef: MutableRefObject<any>;
  messageId: string;
  user: { [key: string]: any };
  text: string;
  timestamp: string;
  attachments: string[];
  nextMessageAuthorId: string;
}) {
  const [t] = useTranslation();
  const [cookies] = useCookies<any>([]);
  const [showActions, setShowActions] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [attachmentContainerClass, setAttachmentContainerClass] = useState("");

  const roomId = useSelector((state: RootState) => state.chat.data.roomId);
  const userId = useSelector((state: RootState) => state.auth.user._id);
  const rights = useSelector((state: RootState) => state.chat.rights);

  const dispatch = useDispatch();

  useEffect(() => {
    switch (attachments.length) {
      case 1:
        setAttachmentContainerClass("one");
        break;
      case 2:
        setAttachmentContainerClass("two");
        break;
      case 3:
        setAttachmentContainerClass("three");
        break;
      case 4:
        setAttachmentContainerClass("four");
        break;
      case 5:
        setAttachmentContainerClass("five");
        break;
      default:
        break;
    }
  }, [attachments]);

  const removeMessage = (messageId: string) => {
    if (socketRef.current)
      socketRef.current.emit("delete-message", {
        _id: messageId,
        user: userId,
        roomId,
        rights
      });
    dispatch(setDeletedMessageId(messageId));
  };

  return (
    <div className={`message-wrapper flex a-i-c ${user._id === userId ? "j-c-f-e" : "j-c-s-b"}`}>
      <ConfirmationModal
        show={confirmDelete}
        action={() => removeMessage(messageId)}
        onClose={() => setConfirmDelete(false)}
        message={t("modal.confirm.del_m")}
      />
      <div
        className={`message grid ${user._id === userId ? "yours" : "others"}`}
        onMouseOver={() => {
          setShowActions(rights && rights.includes("DELETE_MESSAGES") ? true : user._id === userId);
        }}
        onMouseLeave={() => setShowActions(false)}
      >
        <div className="message-user-image flex a-i-f-e j-c-c">
          {nextMessageAuthorId === user._id ? null : (
            <a
              href="#"
              onClick={() => {
                setChosenUser(user);
                dispatch(displayUserInfo(true));
              }}
            >
              <img
                width={60}
                height={60}
                src={user.photo ? user.photo : cookies["dummy-photo"] ? cookies["dummy-photo"].photo : "https://via.placeholder.com/60"}
                alt={user.username}
              />
            </a>
          )}
        </div>
        <div
          className={`grid msg ${attachments ? "has-attachment" : "no-attachment"} ${nextMessageAuthorId !== user._id ? "last-message" : ""} ${
            user._id === userId ? "message-yours" : "message-others"
          }`}
        >
          <a
            href="#"
            className="message-user copyright f-w__900 flex a-i-c j-c-f-s"
            onClick={() => {
              setChosenUser(user);
              dispatch(displayUserInfo(true));
            }}
          >
            {user.username}
          </a>
          {attachments.length > 0 && attachments[0].length > 0 ? (
            <div className={`attachments-container flex a-i-c j-c-s-a f-f-r-w ${attachmentContainerClass}`}>
              {attachments.map((link: string, key) => (
                <img key={key} className="attachment" src={link} alt="attachment" />
              ))}
            </div>
          ) : null}
          <span className={`message-timestamp copyright ${user._id === userId ? "j-s-s" : "j-s-e"}`}>{timestamp}</span>
          <p className="message-text helper flex a-i-c j-c-f-s">{text}</p>
          {nextMessageAuthorId === user._id ? null : (
            <Fragment>
              <svg className="msg-tail" width="40" height="22" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0L4.44444 6.66667L5.1629 7.74434C6.9019 10.3528 8.89431 12.7832 11.1111 15V15L12.6701 16.1693C14.5899 17.6091 16.6352 18.8732 18.7816 19.9463L22.2222 21.6667L28.8889 25L38.7254 29.4264C39.0202 29.5591 38.9255 30 38.6023 30H6C2.68629 30 0 27.3137 0 24V0Z" />
              </svg>
              <span className="back" />
            </Fragment>
          )}
        </div>
        <div className="actions flex a-i-c j-c-c f-f-c-n">
          {showActions ? (
            <Fragment>
              <Button onClick={() => setConfirmDelete(true)} ariaLabel={t("ariaLabel.deleteM")} className="btn-r btn-rem no-border">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve">
                  <path
                    d="M436,60h-90V45c0-24.813-20.187-45-45-45h-90c-24.813,0-45,20.187-45,45v15H76c-24.813,0-45,20.187-45,45v30
                    c0,8.284,6.716,15,15,15h16.183L88.57,470.945c0.003,0.043,0.007,0.086,0.011,0.129C90.703,494.406,109.97,512,133.396,512
                    h245.207c23.427,0,42.693-17.594,44.815-40.926c0.004-0.043,0.008-0.086,0.011-0.129L449.817,150H466c8.284,0,15-6.716,15-15v-30
                    C481,80.187,460.813,60,436,60z M196,45c0-8.271,6.729-15,15-15h90c8.271,0,15,6.729,15,15v15H196V45z M393.537,468.408
                    c-0.729,7.753-7.142,13.592-14.934,13.592H133.396c-7.792,0-14.204-5.839-14.934-13.592L92.284,150h327.432L393.537,468.408z
                    M451,120h-15H76H61v-15c0-8.271,6.729-15,15-15h105h150h105c8.271,0,15,6.729,15,15V120z"
                  />
                  <path d="M256,180c-8.284,0-15,6.716-15,15v212c0,8.284,6.716,15,15,15s15-6.716,15-15V195C271,186.716,264.284,180,256,180z" />
                  <path d="M346,180c-8.284,0-15,6.716-15,15v212c0,8.284,6.716,15,15,15s15-6.716,15-15V195C361,186.716,354.284,180,346,180z" />
                  <path d="M166,180c-8.284,0-15,6.716-15,15v212c0,8.284,6.716,15,15,15s15-6.716,15-15V195C181,186.716,174.284,180,166,180z" />
                </svg>
              </Button>
              {user._id === userId ? (
                <Button
                  onClick={() => dispatch(setUpdatedMessageId(messageId))}
                  ariaLabel={t("ariaLabel.editM")}
                  className="btn-r btn-sec no-border"
                >
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 477.873 477.873"
                    xmlSpace="preserve"
                  >
                    <path
                      d="M392.533,238.937c-9.426,0-17.067,7.641-17.067,17.067V426.67c0,9.426-7.641,17.067-17.067,17.067H51.2
                      c-9.426,0-17.067-7.641-17.067-17.067V85.337c0-9.426,7.641-17.067,17.067-17.067H256c9.426,0,17.067-7.641,17.067-17.067
                      S265.426,34.137,256,34.137H51.2C22.923,34.137,0,57.06,0,85.337V426.67c0,28.277,22.923,51.2,51.2,51.2h307.2
                      c28.277,0,51.2-22.923,51.2-51.2V256.003C409.6,246.578,401.959,238.937,392.533,238.937z"
                    />
                    <path
                      d="M458.742,19.142c-12.254-12.256-28.875-19.14-46.206-19.138c-17.341-0.05-33.979,6.846-46.199,19.149L141.534,243.937
                      c-1.865,1.879-3.272,4.163-4.113,6.673l-34.133,102.4c-2.979,8.943,1.856,18.607,10.799,21.585
                      c1.735,0.578,3.552,0.873,5.38,0.875c1.832-0.003,3.653-0.297,5.393-0.87l102.4-34.133c2.515-0.84,4.8-2.254,6.673-4.13
                      l224.802-224.802C484.25,86.023,484.253,44.657,458.742,19.142z M434.603,87.419L212.736,309.286l-66.287,22.135l22.067-66.202
                      L390.468,43.353c12.202-12.178,31.967-12.158,44.145,0.044c5.817,5.829,9.095,13.72,9.12,21.955
                      C443.754,73.631,440.467,81.575,434.603,87.419z"
                    />
                  </svg>
                </Button>
              ) : null}
            </Fragment>
          ) : null}
        </div>
      </div>
    </div>
  );
}
