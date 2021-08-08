import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import { displayAddUserModal } from "../../context/actions/chat";
import { RootState } from "../../context/rootState.interface";
import { userLinks } from "../../utils/api-endpoints.enum";
import ChangeUserRightsModal from "../chat-change-user-rights-modal/ChangeUserRightsModal";
import ConfirmationModal from "../confirmation-modal/ConfirmationModal";
import { Button } from "../button/Button";
import "./ChatUsersList.css";

export default function ChatUsersList({ users }: { users: any[] }) {
  const [t] = useTranslation();
  const [confirmDelete, setConfirmDelete] = useState({
    show: false,
    _id: ""
  });

  const [changeUser, setChangeUser] = useState({
    show: false,
    _id: ""
  });

  const [userRights, setUserRights] = useState([]);

  const roomId = useSelector((state: RootState) => state.chat.roomId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (changeUser._id) getUserRights(changeUser._id);
  }, [changeUser]);

  const removeUser = (userId: string) => {
    axios.delete(userLinks.deleteUserFromRoom(userId, roomId)).then(({ data, status }) => {
      if (data.errors) {
        // dispatch(setError(data.errors));
      }
    });
  };

  const getUserRights = (userId: string) => {
    axios.get(userLinks.loadUserRights(userId, roomId)).then(({ data }) => {
      setUserRights(data.rights);
    });
  };

  return (
    <div className="users flex a-i-c j-c-f-s f-f-c-n f-w">
      <header className="f-w flex a-i-c j-c-s-b">
        <svg width="29" height="24" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.2 4.8C19.2 6.07304 18.6943 7.29394 17.7941 8.19411C16.8939 9.09429 15.673 9.6 14.4 9.6C13.127 9.6 11.9061 9.09429 11.0059 8.19411C10.1057 7.29394 9.6 6.07304 9.6 4.8C9.6 3.52696 10.1057 2.30606 11.0059 1.40589C11.9061 0.505713 13.127 0 14.4 0C15.673 0 16.8939 0.505713 17.7941 1.40589C18.6943 2.30606 19.2 3.52696 19.2 4.8Z" />
          <path d="M27.2 8C27.2 8.84869 26.8629 9.66262 26.2627 10.2627C25.6626 10.8629 24.8487 11.2 24 11.2C23.1513 11.2 22.3374 10.8629 21.7373 10.2627C21.1371 9.66262 20.8 8.84869 20.8 8C20.8 7.15131 21.1371 6.33737 21.7373 5.73726C22.3374 5.13714 23.1513 4.8 24 4.8C24.8487 4.8 25.6626 5.13714 26.2627 5.73726C26.8629 6.33737 27.2 7.15131 27.2 8Z" />
          <path d="M20.8 19.2C20.8 17.5026 20.1257 15.8747 18.9255 14.6745C17.7253 13.4743 16.0974 12.8 14.4 12.8C12.7026 12.8 11.0747 13.4743 9.87452 14.6745C8.67428 15.8747 8 17.5026 8 19.2V24H20.8V19.2Z" />
          <path d="M8 8C8 8.84869 7.66286 9.66262 7.06274 10.2627C6.46263 10.8629 5.64869 11.2 4.8 11.2C3.95131 11.2 3.13737 10.8629 2.53726 10.2627C1.93714 9.66262 1.6 8.84869 1.6 8C1.6 7.15131 1.93714 6.33737 2.53726 5.73726C3.13737 5.13714 3.95131 4.8 4.8 4.8C5.64869 4.8 6.46263 5.13714 7.06274 5.73726C7.66286 6.33737 8 7.15131 8 8Z" />
          <path d="M24 24V19.2C24.0023 17.5733 23.5893 15.9728 22.8 14.5504C23.5094 14.3689 24.2508 14.3517 24.9678 14.5003C25.6848 14.649 26.3583 14.9593 26.9371 15.4079C27.5159 15.8564 27.9846 16.4311 28.3074 17.0883C28.6303 17.7455 28.7987 18.4678 28.8 19.2V24H24Z" />
          <path d="M6 14.5504C5.2108 15.9729 4.79776 17.5733 4.8 19.2V24H4.25151e-07V19.2C-0.000307949 18.4673 0.167141 17.7442 0.489515 17.0862C0.811889 16.4282 1.28063 15.8527 1.85981 15.4039C2.439 14.9551 3.11325 14.6448 3.8309 14.4968C4.54854 14.3489 5.29053 14.3672 6 14.5504Z" />
        </svg>
        <p>{t("usersH")}</p>
        <Button
          onClick={() => dispatch(displayAddUserModal(true))}
          type="button"
          ariaLabel={t("button.addUser")}
          className="btn-r btn-sec no-border add"
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 8.2C14 7.64772 13.5523 7.2 13 7.2C12.4477 7.2 12 7.64772 12 8.2H14ZM12 17.8C12 18.3523 12.4477 18.8 13 18.8C13.5523 18.8 14 18.3523 14 17.8H12ZM17.8 14C18.3523 14 18.8 13.5523 18.8 13C18.8 12.4477 18.3523 12 17.8 12V14ZM8.2 12C7.64772 12 7.2 12.4477 7.2 13C7.2 13.5523 7.64772 14 8.2 14V12ZM12 8.2V13H14V8.2H12ZM12 13V17.8H14V13H12ZM13 14H17.8V12H13V14ZM13 12H8.2V14H13V12ZM24 13C24 19.0751 19.0751 24 13 24V26C20.1797 26 26 20.1797 26 13H24ZM13 24C6.92487 24 2 19.0751 2 13H0C0 20.1797 5.8203 26 13 26V24ZM2 13C2 6.92487 6.92487 2 13 2V0C5.8203 0 0 5.8203 0 13H2ZM13 2C19.0751 2 24 6.92487 24 13H26C26 5.8203 20.1797 0 13 0V2Z" />
          </svg>
        </Button>
      </header>
      <ul className="flex a-i-c j-c-f-s f-f-c-n f-w">
        <ConfirmationModal
          show={confirmDelete.show}
          action={() => removeUser(confirmDelete._id)}
          onClose={() => setConfirmDelete({ show: false, _id: "" })}
          message={t("modal.confirm.del_u")}
        />
        <ChangeUserRightsModal
          show={changeUser.show}
          onClose={() => setChangeUser({ show: false, _id: "" })}
          _id={changeUser._id}
          userRights={userRights && userRights}
        />
        {users &&
          users.map((item) => (
            <li key={item._id} className="f-w grid">
              <img src={item.photo} alt={item.username} />
              <div className="flex j-c-c a-i-f-s f-f-c-n">
                <p className="h6-s">{item.username}</p>
                {/*<p>{item.lastSeen}</p>*/}
              </div>
              <div className="cont flex a-i-c j-c-c f-f-c-n">
                <Button
                  onClick={() => setConfirmDelete({ show: true, _id: item._id })}
                  ariaLabel={t("button.del_u")}
                  className="btn-r btn-rem no-border"
                >
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
                <Button
                  onClick={() => setChangeUser({ show: true, _id: item._id })}
                  ariaLabel={t("button.ch_u")}
                  className="btn-r no-border btn-sec"
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
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
