import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { displayUserSettings } from "../../context/actions/chat";
import { RootState } from "../../context/rootState.interface";
import ChangePhoto from "../button/change-photo/ChangePhoto";
import { Button } from "../button/Button";
import Modal from "../modal/Modal";
import FirstLastNamesSubModal from "./sub-modals/FirstLastNamesSubModal";
import BirthdaySubModal from "./sub-modals/BirthdaySubModal";
import PasswordChangeForm from "./forms/PasswordChangeForm";
import UsernameChangeForm from "./forms/UsernameChangeForm";
import EmailChangeForm from "./forms/EmailChangeForm";
import PhoneChangeForm from "./forms/PhoneChangeForm";
import "./UserSettings.css";

export default function UserSettingsModal() {
  const [t] = useTranslation();
  const [cookies] = useCookies([]);

  const user = useSelector((state: RootState) => state.auth.user);
  const showUserSettings = useSelector((state: RootState) => state.chat.showUserSettings);

  const [emailChange, setEmailChange] = useState(false);
  const [usernameChange, setUsernameChange] = useState(false);
  const [phoneChange, setPhoneChange] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);

  const [showNamesSubModal, setShowNamesSubModal] = useState(false);
  const [showBirthdaySubModal, setShowBirthdaySubModal] = useState(false);

  const dispatch = useDispatch();

  function closeModal() {
    dispatch(displayUserSettings(false));
  }

  return (
    <Modal onModalClose={closeModal} show={showUserSettings} className="user-settings">
      <Modal.Header onCloseModal={closeModal} layoutType="flex">
        <h1 className="h5-s">{t("modal.settings.header")}</h1>
      </Modal.Header>
      <Modal.Body
        className={`grid ${emailChange ? "email-ch" : ""} ${usernameChange ? "username-ch" : ""} ${phoneChange ? "phone-ch" : ""} ${
          passwordChange ? "password-ch" : ""
        }`}
      >
        <div className="ruler f-w" />
        <div className="top grid">
          <ChangePhoto
            alt={`${user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username}`}
            previousState={
              user.photo ? user.photo : cookies["dummy-photo"] ? cookies["dummy-photo"].photo : "https://via.placeholder.com/100"
            }
          />
          <Button onClick={() => setShowNamesSubModal(true)} className="btn-ter j-c-s-b f-f-r-n">
            <p>
              <span>{user.firstName}</span>
              <span>{user.lastName}</span>
            </p>
            <svg height="20px" viewBox="0 0 512 512" width="20px" xmlns="http://www.w3.org/2000/svg">
              <path d="m498.828125 76.84375-63.671875-63.675781c-8.488281-8.484375-19.792969-13.16406275-31.828125-13.167969-.007813 0-.011719 0-.019531 0-12.035156 0-23.332032 4.671875-31.8125 13.152344l-324.648438 324.644531c-2.660156 2.722656-3.753906 6.597656-4.542968 9.023437l-41.726563 146.046876c-1.496094 5.242187-.035156 10.882812 3.816406 14.734374 2.855469 2.855469 6.691407 4.398438 10.613281 4.398438 1.378907 0 2.765626-.1875 4.125-.578125l145.964844-41.703125c.433594-.125 6.882813-2.34375 9.105469-4.566406l324.644531-324.648438c8.488282-8.484375 13.15625-19.789062 13.152344-31.832031-.003906-12.035156-4.683594-23.339844-13.171875-31.828125zm-461.964844 398.292969 28.023438-98.078125 70.054687 70.054687zm126.726563-41.824219-84.902344-84.902344 260.953125-260.953125 84.902344 84.902344zm314.03125-314.03125-31.851563 31.855469-84.90625-84.90625 31.855469-31.851563c2.8125-2.8125 6.574219-4.359375 10.589844-4.359375h.007812c4.023438 0 7.792969 1.554688 10.613282 4.375l63.675781 63.675781c5.851562 5.851563 5.859375 15.367188.015625 21.210938zm0 0" />
            </svg>
          </Button>
          <Button onClick={() => setShowBirthdaySubModal(true)} className="btn-ter  j-c-s-b f-f-r-n">
            <p>{user.birthday}</p>
            <svg height="20px" viewBox="0 0 512 512" width="20px" xmlns="http://www.w3.org/2000/svg">
              <path d="m498.828125 76.84375-63.671875-63.675781c-8.488281-8.484375-19.792969-13.16406275-31.828125-13.167969-.007813 0-.011719 0-.019531 0-12.035156 0-23.332032 4.671875-31.8125 13.152344l-324.648438 324.644531c-2.660156 2.722656-3.753906 6.597656-4.542968 9.023437l-41.726563 146.046876c-1.496094 5.242187-.035156 10.882812 3.816406 14.734374 2.855469 2.855469 6.691407 4.398438 10.613281 4.398438 1.378907 0 2.765626-.1875 4.125-.578125l145.964844-41.703125c.433594-.125 6.882813-2.34375 9.105469-4.566406l324.644531-324.648438c8.488282-8.484375 13.15625-19.789062 13.152344-31.832031-.003906-12.035156-4.683594-23.339844-13.171875-31.828125zm-461.964844 398.292969 28.023438-98.078125 70.054687 70.054687zm126.726563-41.824219-84.902344-84.902344 260.953125-260.953125 84.902344 84.902344zm314.03125-314.03125-31.851563 31.855469-84.90625-84.90625 31.855469-31.851563c2.8125-2.8125 6.574219-4.359375 10.589844-4.359375h.007812c4.023438 0 7.792969 1.554688 10.613282 4.375l63.675781 63.675781c5.851562 5.851563 5.859375 15.367188.015625 21.210938zm0 0" />
            </svg>
          </Button>
        </div>
        <FirstLastNamesSubModal showSubModal={showNamesSubModal} setShowSubModal={setShowNamesSubModal} />
        <BirthdaySubModal showSubModal={showBirthdaySubModal} setShowSubModal={setShowBirthdaySubModal} />
        <div className="ruler f-w" />
        <EmailChangeForm emailChange={emailChange} setEmailChange={setEmailChange} />
        <div className="ruler f-w" />
        <UsernameChangeForm usernameChange={usernameChange} setUsernameChange={setUsernameChange} />
        <div className="ruler f-w" />
        <PhoneChangeForm phoneChange={phoneChange} setPhoneChange={setPhoneChange} />
        <div className="ruler f-w" />
        <PasswordChangeForm passwordChange={passwordChange} setPasswordChange={setPasswordChange} />
      </Modal.Body>
    </Modal>
  );
}
