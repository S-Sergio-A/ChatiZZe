import React, { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { resetUpdatedMessagePrevState, setUpdatedMessageNewState } from "../../context/actions/chat";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import useOutsideClick from "../../utils/hooks/useOutsideClick";
import { RootState } from "../../context/rootState.interface";
import useKeyDown from "../../utils/hooks/useKeyDown";
import { Button } from "../button/Button";
import "./ChatInput.css";
import Modal from "../modal/Modal";
import { fileToBase64 } from "../../utils/fileToBase64";

type TextMessage = {
  text: string;
};

type FileMessage = {
  attachment?: any[];
};

export type Message = { roomId: string; timestamp: string; user: string } & TextMessage & FileMessage & { timestamp: string };

const MAX_LENGTH = 5;

export const ChatInput = ({
  socketRef,
  expand,
  setExpand,
  editing,
  setEditing
}: {
  socketRef: React.MutableRefObject<any>;
  expand: boolean;
  setExpand: (val: boolean) => void;
  editing: boolean;
  setEditing: (val: boolean) => void;
}) => {
  const [t] = useTranslation();
  const dispatch = useDispatch();

  const roomId = useSelector((state: RootState) => state.chat.roomId);
  const userId = useSelector((state: RootState) => state.auth.user._id);
  const username = useSelector((state: RootState) => state.auth.user.username);
  const updatedMessagePrevState = useSelector((state: RootState) => state.chat.updatedMessagePrevState);
  const enlargeChatList = useSelector((state: RootState) => state.chat.enlargeChatList);

  const initialMessage = { user: userId, username, roomId, text: "", attachment: [], timestamp: "" };

  const [attachedFilesClass, setAttachedFilesClass] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState<Message>(initialMessage);
  const [showEmoji, setShowEmoji] = useState(false);

  const inputRef = useRef<any>(null);
  const inputAreaRef = useRef<any>(null);
  const textAreaRef = useRef<any>(null);
  const messageRef = useRef<any>(null);
  const caretRef = useRef<any>(0);

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (editing) {
      if (textAreaRef.current) textAreaRef.current.focus();
    } else {
      if (textAreaRef.current) textAreaRef.current.blur();
    }
  }, [editing, textAreaRef]);

  useEffect(() => {
    if (enlargeChatList) {
      if (editing) setEditing(false);
      messageRef.current = "";
      setMessage(initialMessage);
    }
  }, [roomId, enlargeChatList]);

  useEffect(() => {
    if (updatedMessagePrevState && Object.keys(updatedMessagePrevState).length !== 0) {
      setMessage(updatedMessagePrevState);
      messageRef.current = updatedMessagePrevState.text;
      setEditing(true);
      dispatch(resetUpdatedMessagePrevState());
    }
  }, [updatedMessagePrevState]);

  useEffect(() => {
    function getCaretOnClick(event: any) {
      if (textAreaRef.current && textAreaRef.current === document.activeElement) {
        caretRef.current = event.target.selectionStart;
      }
    }

    document.addEventListener("click", getCaretOnClick);
    return () => {
      document.removeEventListener("click", getCaretOnClick);
    };
  }, [textAreaRef]);

  const sendMessage = () => {
    if (editing) {
      dispatch(setUpdatedMessageNewState(message));
      if (socketRef.current) socketRef.current.emit("update-message", message);
      setEditing(false);
    } else {
      if (socketRef.current) socketRef.current.emit("new-message", message);
    }
    setMessage(initialMessage);
    messageRef.current = initialMessage.text;

    if (expand) setExpand(false);
    if (showEmoji) setShowEmoji(false);
  };

  function onChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setMessage({
      ...message,
      text: event.target.value,
      timestamp: new Date(Date.now()).toLocaleDateString()
    });

    if (!editing) {
      messageRef.current = event.target.value;
    }

    if (textAreaRef.current && textAreaRef.current === document.activeElement) {
      caretRef.current = event.target.selectionStart;
    }
  }

  async function onFileChange(event: any) {
    if (Array.from(event.target.files).length > MAX_LENGTH) {
      event.preventDefault();
      alert(`Cannot upload more than ${MAX_LENGTH} files!`);
      return;
    }

    if (event.target.files) {
      setShowMessageModal(true);
      const attachedFilesArray = [];

      const length = event.target.files.length <= 5 ? event.target.files.length : MAX_LENGTH;

      for (let i = 0; i < length; i++) {
        const file = await fileToBase64(event.target.files[i]).catch((e) => Error(e));
        attachedFilesArray.push(file);
      }

      switch (attachedFilesArray.length) {
        case 1:
          setAttachedFilesClass("one");
          break;
        case 2:
          setAttachedFilesClass("two");
          break;
        case 3:
          setAttachedFilesClass("three");
          break;
        case 4:
          setAttachedFilesClass("four");
          break;
        case 5:
          setAttachedFilesClass("five");
          break;
        default:
          break;
      }

      setMessage({ ...message, attachment: attachedFilesArray });
    }
  }

  const handleEmojiSelect = (event: any) => {
    setMessage({
      ...message,
      text: message.text.substring(0, caretRef.current) + event.native + message.text.substring(caretRef.current, message.text.length),
      timestamp: new Date(Date.now()).toLocaleDateString()
    });
    if (!editing) {
      messageRef.current = message.text;
    }
  };

  useOutsideClick(inputAreaRef, () => {
    if (expand) setExpand(false);
    if (showEmoji) setShowEmoji(false);
  });

  useKeyDown("Escape", () => {
    if (editing) {
      setEditing(false);
      setMessage(initialMessage);
      messageRef.current = initialMessage.text;
    }

    if (showEmoji) setShowEmoji(false);
    if (expand) setExpand(false);

    textAreaRef.current.blur();
  });

  return (
    <Fragment>
      <div className="input-area grid" ref={inputAreaRef} aria-expanded={expand}>
        <header className={`editing f-w ${!editing ? "none" : "grid"}`}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="20px"
            height="20px"
            viewBox="0 0 477.873 477.873"
            xmlSpace="preserve"
            className="a-s-c j-s-c"
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
          <p className="flex j-c-c a-i-f-s f-f-c-n">
            <span>{t("chatInput.header")}</span>
            <span className="msg-prev">{messageRef.current}</span>
          </p>
          <Button
            ariaLabel="Abort editing"
            onClick={() => {
              if (editing) setEditing(false);
              if (expand) setExpand(false);
              if (showEmoji) setShowEmoji(false);
              setMessage(initialMessage);
              messageRef.current = initialMessage.text;
            }}
            className="btn-r no-border btn-sec"
          >
            <svg
              className="close"
              width="16px"
              height="16px"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 22.88 22.88"
              xmlSpace="preserve"
            >
              <path
                d="M0.324,1.909c-0.429-0.429-0.429-1.143,0-1.587c0.444-0.429,1.143-0.429,1.587,0l9.523,9.539
                l9.539-9.539c0.429-0.429,1.143-0.429,1.571,0c0.444,0.444,0.444,1.159,0,1.587l-9.523,9.524l9.523,9.539
                c0.444,0.429,0.444,1.143,0,1.587c-0.429,0.429-1.143,0.429-1.571,0l-9.539-9.539l-9.523,9.539c-0.444,0.429-1.143,0.429-1.587,0
                c-0.429-0.444-0.429-1.159,0-1.587l9.523-9.539L0.324,1.909z"
              />
            </svg>
          </Button>
        </header>
        <div
          className={`btn-cont flex j-c-c a-i-c ${expand ? "exp" : ""} ${width < 769 ? "f-f-c-n" : "f-f-r-n"}`}
          style={expand ? { rowGap: "15px" } : undefined}
        >
          <div className="attach-file-btn">
            <input onChange={onFileChange} type="file" accept="image/*" hidden ref={inputRef} className="none" multiple />
            <Button
              onClick={() => inputRef.current && inputRef.current.click()}
              type="button"
              className="btn-i btn-sec btn-r no-border"
              ariaLabel={t("ariaLabel.button.attach")}
            >
              <svg viewBox="-132 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m130.414062 512h-13.800781c-31.558593
                0-60.714843-11.011719-82.085937-31-22.265625-20.828125-34.527344-50.15625-34.527344-82.589844l.285156-287.71875c.164063-64.1875
                37.738282-110.691406 89.375-110.691406h.214844l5.609375.0195312c26.285156.0664063 49.765625 12.2578128 66.097656 34.3320308
                14.859375 20.082032 23 47.351563 22.925781 76.785157l-.679687 271.058593c-.046875 17.585938-5.433594 34.105469-15.175781
                46.515626-10.714844 13.652343-25.609375 21.164062-41.957032 21.164062-.042968 0-.089843 0-.132812
                0-16.035156-.042969-31.855469-7.558594-43.414062-20.628906-11.40625-12.894532-17.660157-29.710938-17.617188-47.347656l.542969-216.652344c.023437-8.429688
                6.863281-15.246094 15.289062-15.246094h.039063c8.441406.019531 15.269531 6.882812 15.246094 15.324219l-.542969 216.652343c-.023438
                10.140626 3.507812 19.734376 9.945312 27.015626 5.777344 6.53125 13.28125 10.289062 20.585938 10.304687h.054687c8.660156 0
                14.519532-5.140625 17.910156-9.460937 5.550782-7.074219
                8.621094-16.917969 8.648438-27.71875l.683594-271.054688c.054687-22.90625-5.957032-43.691406-16.929688-58.523438-7.386718-9.980468-20.601562-21.890624-41.613281-21.941406l-5.605469-.023437c-.046875 0-.09375 0-.140625 0-20.917969
                0-34.144531 11.8125-41.5625 21.734375-11.046875 14.777344-17.164062 35.53125-17.21875 58.4375l-.289062 287.679687c0 48.085938 36.1875
                83 86.039062 83h13.800781c49.855469 0 86.035157-34.914062 86.035157-83.015625v-239.984375c0-8.441406 6.847656-15.289062 15.289062-15.289062
                8.441407 0 15.289063 6.847656 15.289063 15.289062v239.984375c0 32.433594-12.261719 61.761719-34.519532 82.589844-21.375 19.988281-50.527343
                31-82.09375 31zm0 0"
                />
              </svg>
            </Button>
          </div>
          <Button
            onClick={() => setShowEmoji(!showEmoji)}
            type="button"
            className="btn-i btn-sec btn-r no-border"
            ariaLabel={t("ariaLabel.button.emoji")}
          >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve">
              <path
                d="M437.019,74.981C388.668,26.629,324.38,0,256,0S123.332,26.629,74.981,74.981C26.628,123.332,0,187.62,0,256
              s26.628,132.668,74.981,181.019C123.332,485.371,187.62,512,256,512s132.668-26.629,181.019-74.981
              C485.372,388.668,512,324.38,512,256S485.372,123.332,437.019,74.981z M256,481.524c-124.354,0-225.524-101.17-225.524-225.524
              S131.646,30.476,256,30.476S481.524,131.646,481.524,256S380.354,481.524,256,481.524z"
              />
              <path
                d="M200.622,188.396c-24.953-24.955-65.556-24.953-90.509,0c-5.951,5.95-5.951,15.599,0,21.55
              c5.952,5.95,15.601,5.95,21.551,0c13.072-13.071,34.34-13.07,47.41,0c2.976,2.976,6.875,4.464,10.774,4.464
              s7.8-1.488,10.774-4.464C206.573,203.995,206.573,194.347,200.622,188.396z"
              />
              <path
                d="M401.884,188.396c-24.953-24.953-65.556-24.955-90.509,0c-5.951,5.95-5.951,15.599,0,21.55
              c5.952,5.95,15.601,5.95,21.551,0c13.07-13.071,34.338-13.072,47.41,0c2.976,2.976,6.875,4.464,10.774,4.464
              s7.8-1.488,10.774-4.464C407.835,203.995,407.835,194.347,401.884,188.396z"
              />
              <path
                d="M391.111,267.175H120.889c-8.416,0-15.238,6.823-15.238,15.238c0,82.902,67.447,150.349,150.349,150.349
              s150.349-67.447,150.349-150.349C406.349,273.997,399.527,267.175,391.111,267.175z M256,402.286
              c-60.938,0-111.402-45.703-118.909-104.635H374.91C367.402,356.583,316.938,402.286,256,402.286z"
              />
            </svg>
          </Button>
          {showEmoji && <Picker onSelect={handleEmojiSelect} emojiSize={16} showPreview={false} />}
        </div>
        <div className="container flex a-i-c j-c-c f-f-c-n">
          <textarea
            onFocus={() => setExpand(true)}
            className={`ta f-w f-h ${expand ? "expanded" : ""}`}
            maxLength={4000}
            ref={textAreaRef}
            onChange={onChange}
            aria-expanded={expand}
            value={message.text}
          />
        </div>
        <div className="flex j-c-c a-i-c">
          <Button onClick={sendMessage} type="button" className="btn-i btn-sec btn-r no-border" ariaLabel={t("ariaLabel.button.send")}>
            {editing ? (
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 288.941 288.941"
                width="20px"
                height="20px"
                xmlSpace="preserve"
              >
                <path
                  d="M285.377,46.368c-4.74-4.704-12.439-4.704-17.179,0L96.309,217.114L20.734,142.61
                c-4.74-4.704-12.439-4.704-17.179,0s-4.74,12.319,0,17.011l84.2,82.997c4.692,4.644,12.499,4.644,17.191,0l180.43-179.239
                C290.129,58.687,290.129,51.06,285.377,46.368C280.637,41.664,290.129,51.06,285.377,46.368z"
                />
              </svg>
            ) : (
              <svg enableBackground="new 0 0 512 512" height="25px" viewBox="0 0 512 512" width="25px" xmlns="http://www.w3.org/2000/svg">
                <path d="m499.394 237.364-471.982-187.41c-16.306-6.474-32.489 9.83-25.907 26.149l56.465 139.955c2.051 5.083 6.09 9.102 11.175 11.121l72.581 28.82-72.581 28.82c-5.086 2.019-9.125 6.038-11.175 11.121l-56.466 139.955c-6.569 16.286 9.566 32.637 25.907 26.149l471.982-187.41c16.774-6.661 16.844-30.582.001-37.27zm-443.304 170.173 35.75-88.611 111.55-44.292c16.771-6.66 16.841-30.582 0-37.27l-111.55-44.293-35.75-88.611 381.641 151.538z" />
              </svg>
            )}
          </Button>
        </div>
      </div>
      <Modal onModalClose={() => setShowMessageModal(false)} show={showMessageModal} className="message-modal">
        <Modal.Header onCloseModal={() => setShowMessageModal(false)} className="a-i-f-e" />
        <Modal.Body>
          <ul className={`grid images ${attachedFilesClass}`}>
            {message.attachment &&
              message.attachment.map((item: any, index: number) => (
                <li key={index}>
                  <img src={item} alt={item.name} className="f-h f-w" />
                </li>
              ))}
          </ul>
        </Modal.Body>
        <Modal.Footer className="grid input-area">
          <div
            className={`btn-cont flex j-c-c a-i-c ${expand ? "exp" : ""} ${width < 769 ? "f-f-c-n" : "f-f-r-n"}`}
            style={expand ? { rowGap: "15px" } : undefined}
          >
            <div className="attach-file-btn">
              <Button
                onClick={() => inputRef.current && inputRef.current.click()}
                type="button"
                className="btn-i btn-sec btn-r no-border"
                ariaLabel={t("ariaLabel.button.attach")}
              >
                <svg viewBox="-132 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m130.414062 512h-13.800781c-31.558593
                    0-60.714843-11.011719-82.085937-31-22.265625-20.828125-34.527344-50.15625-34.527344-82.589844l.285156-287.71875c.164063-64.1875
                    37.738282-110.691406 89.375-110.691406h.214844l5.609375.0195312c26.285156.0664063 49.765625 12.2578128 66.097656 34.3320308
                    14.859375 20.082032 23 47.351563 22.925781 76.785157l-.679687 271.058593c-.046875 17.585938-5.433594 34.105469-15.175781
                    46.515626-10.714844 13.652343-25.609375 21.164062-41.957032 21.164062-.042968 0-.089843 0-.132812
                    0-16.035156-.042969-31.855469-7.558594-43.414062-20.628906-11.40625-12.894532-17.660157-29.710938-17.617188-47.347656l.542969-216.652344c.023437-8.429688
                    6.863281-15.246094 15.289062-15.246094h.039063c8.441406.019531 15.269531 6.882812 15.246094 15.324219l-.542969 216.652343c-.023438
                    10.140626 3.507812 19.734376 9.945312 27.015626 5.777344 6.53125 13.28125 10.289062 20.585938 10.304687h.054687c8.660156 0
                    14.519532-5.140625 17.910156-9.460937 5.550782-7.074219
                    8.621094-16.917969 8.648438-27.71875l.683594-271.054688c.054687-22.90625-5.957032-43.691406-16.929688-58.523438-7.386718-9.980468-20.601562-21.890624-41.613281-21.941406l-5.605469-.023437c-.046875 0-.09375 0-.140625 0-20.917969
                    0-34.144531 11.8125-41.5625 21.734375-11.046875 14.777344-17.164062 35.53125-17.21875 58.4375l-.289062 287.679687c0 48.085938 36.1875
                    83 86.039062 83h13.800781c49.855469 0 86.035157-34.914062 86.035157-83.015625v-239.984375c0-8.441406 6.847656-15.289062 15.289062-15.289062
                    8.441407 0 15.289063 6.847656 15.289063 15.289062v239.984375c0 32.433594-12.261719 61.761719-34.519532 82.589844-21.375 19.988281-50.527343
                    31-82.09375 31zm0 0"
                  />
                </svg>
              </Button>
            </div>
            <Button
              onClick={() => setShowEmoji(!showEmoji)}
              type="button"
              className="btn-i btn-sec btn-r no-border"
              ariaLabel={t("ariaLabel.button.emoji")}
            >
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve">
                <path
                  d="M437.019,74.981C388.668,26.629,324.38,0,256,0S123.332,26.629,74.981,74.981C26.628,123.332,0,187.62,0,256
                  s26.628,132.668,74.981,181.019C123.332,485.371,187.62,512,256,512s132.668-26.629,181.019-74.981
                  C485.372,388.668,512,324.38,512,256S485.372,123.332,437.019,74.981z M256,481.524c-124.354,0-225.524-101.17-225.524-225.524
                  S131.646,30.476,256,30.476S481.524,131.646,481.524,256S380.354,481.524,256,481.524z"
                />
                <path
                  d="M200.622,188.396c-24.953-24.955-65.556-24.953-90.509,0c-5.951,5.95-5.951,15.599,0,21.55
                  c5.952,5.95,15.601,5.95,21.551,0c13.072-13.071,34.34-13.07,47.41,0c2.976,2.976,6.875,4.464,10.774,4.464
                  s7.8-1.488,10.774-4.464C206.573,203.995,206.573,194.347,200.622,188.396z"
                />
                <path
                  d="M401.884,188.396c-24.953-24.953-65.556-24.955-90.509,0c-5.951,5.95-5.951,15.599,0,21.55
                  c5.952,5.95,15.601,5.95,21.551,0c13.07-13.071,34.338-13.072,47.41,0c2.976,2.976,6.875,4.464,10.774,4.464
                  s7.8-1.488,10.774-4.464C407.835,203.995,407.835,194.347,401.884,188.396z"
                />
                <path
                  d="M391.111,267.175H120.889c-8.416,0-15.238,6.823-15.238,15.238c0,82.902,67.447,150.349,150.349,150.349
                  s150.349-67.447,150.349-150.349C406.349,273.997,399.527,267.175,391.111,267.175z M256,402.286
                  c-60.938,0-111.402-45.703-118.909-104.635H374.91C367.402,356.583,316.938,402.286,256,402.286z"
                />
              </svg>
            </Button>
            {showEmoji && <Picker onSelect={handleEmojiSelect} emojiSize={16} showPreview={false} />}
          </div>
          <div className="container flex a-i-c j-c-c f-f-c-n">
            <textarea className="ta f-w f-h" maxLength={4000} ref={textAreaRef} onChange={onChange} value={message.text} />
          </div>
          <div className="flex j-c-c a-i-c">
            <Button onClick={sendMessage} type="button" className="btn-i btn-sec btn-r no-border" ariaLabel={t("ariaLabel.button.send")}>
              <svg enableBackground="new 0 0 512 512" height="25px" viewBox="0 0 512 512" width="25px" xmlns="http://www.w3.org/2000/svg">
                <path d="m499.394 237.364-471.982-187.41c-16.306-6.474-32.489 9.83-25.907 26.149l56.465 139.955c2.051 5.083 6.09 9.102 11.175 11.121l72.581 28.82-72.581 28.82c-5.086 2.019-9.125 6.038-11.175 11.121l-56.466 139.955c-6.569 16.286 9.566 32.637 25.907 26.149l471.982-187.41c16.774-6.661 16.844-30.582.001-37.27zm-443.304 170.173 35.75-88.611 111.55-44.292c16.771-6.66 16.841-30.582 0-37.27l-111.55-44.293-35.75-88.611 381.641 151.538z" />
              </svg>
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};
