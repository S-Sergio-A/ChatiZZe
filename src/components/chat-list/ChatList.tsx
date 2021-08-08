import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import { timer } from "rxjs";
import axios from "axios";
import {
  changeChatListSize,
  displayCreateChatModal,
  displayUserMenu,
  setActiveChatAction,
  setCurrentChatRights,
  setUserMenuButtonRef
} from "../../context/actions/chat";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import { RootState } from "../../context/rootState.interface";
import { getRandomColor } from "../../utils/color/shadeColor";
import { userLinks } from "../../utils/api-endpoints.enum";
import useKeyDown from "../../utils/hooks/useKeyDown";
import MenuButton from "../button/menu/MenuButton";
import { Button } from "../button/Button";
import "./ChatList.css";



export default function ChatList({ chats }: { chats: any[] }) {
  const [t] = useTranslation();
  const [cookies] = useCookies(["user"]);

  const [rooms, setRooms] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [notFound, setNotFound] = useState(false);
  const [hide, setHide] = useState(false);

  const userId = useSelector((state: RootState) => state.auth.user._id);
  const roomId = useSelector((state: RootState) => state.chat.roomId);
  const enlargeChatList = useSelector((state: RootState) => state.chat.enlargeChatList);

  const menuRef = useRef<any>(null);
  const inputRef = useRef<any>(null);

  const dispatch = useDispatch();

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (searchQuery.length === 0) {
      if (notFound) {
        setNotFound(false);
      }
      setRooms(chats);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (chats.length > 0 && rooms.length === 0) {
      setRooms(chats);
    }
  }, [chats]);

  useEffect(() => {
    dispatch(changeChatListSize(width < 769));
  }, [width]);

  useEffect(() => {
    timer(300).subscribe(() => setHide(!enlargeChatList && width < 769));
  }, [enlargeChatList]);

  async function loadRights(roomId: string) {
    axios.get(userLinks.loadUserRights(userId, roomId)).then(({ data }) => {
      dispatch(setCurrentChatRights(data.rights));
    });
  }

  async function searchRooms(): Promise<void> {
    if (searchQuery.length !== 0) {
      axios.get(userLinks.searchRooms(searchQuery)).then(({ data }) => {
        if (data.length > 0) {
          if (notFound) {
            setNotFound(false);
          }
          setRooms(data);
        } else {
          setNotFound(true);
        }
      });
    }
  }

  useKeyDown(
    "Escape",
    () => {
      if (inputRef.current) inputRef.current.blur();
    },
    [inputRef]
  );

  useKeyDown("Enter", () => searchRooms(), [inputRef.current && inputRef.current == document.activeElement, searchQuery.length !== 0]);

  return (
    <section className={`chat-list-cont ${hide ? "none" : "grid"}`} ref={menuRef}>
      <div className="chat-list grid">
        <div className="search-field flex a-i-c j-c-s-a">
          <MenuButton setRef={(ref: any) => dispatch(setUserMenuButtonRef(ref))} setShow={() => dispatch(displayUserMenu(true))} />
          <input
            className="search"
            inputMode="search"
            onBlur={() => searchRooms()}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={t("search.placeholder")}
            ref={inputRef}
          />
        </div>
        <div className={`list-wrapper ${!enlargeChatList ? "sm" : ""}`}>
          {notFound ? (
            <p className="t-c a-s-c j-s-c">Not found</p>
          ) : (
            <ul className="flex j-c-f-s a-i-c f-f-c-n">
              {rooms &&
                rooms.map((item: any) => {
                  const firstColor = getRandomColor();
                  const secondColor = getRandomColor();
                  const thirdColor = getRandomColor();
                  const fourthColor = getRandomColor();
                 return  <li key={item._id} className="chat-wrapper f-w">
                    <button
                      className={`chat btn-sec no-border f-w f-h grid ${roomId === item._id ? "active" : ""}`}
                      type="button"
                      onClick={() => {
                        loadRights(item._id).then(() => {
                          dispatch(setActiveChatAction(item.name, item._id, item.isPrivate, item.isUser));
                          dispatch(changeChatListSize(false));
                        });
        
                        timer(300).subscribe(() => {
                          if (searchQuery.length > 0 && inputRef.current) {
                            inputRef.current.blur();
                            inputRef.current.value = "";
                            setSearchQuery("");
                          }
                        });
                      }}
                      aria-label={`${item.name} ${t("chat")}`}
                    >
                      {item.logo ? (
                        <img src={item.logo} alt={`${item.name} chat logo`} className="chat-logo flex j-c-c a-i-c" />
                      ) : (
                        <svg height="50" viewBox="0 0 512 512" width="50" xmlns="http://www.w3.org/2000/svg"
                             className="chat-logo">
                          <title>{item.name + " " + t("chatLogo")}</title>
                          <path
                            fill={firstColor}
                            d="m40.831 368.544c4.869-3.891 7.779-8.554 8.647-13.89 1.137-6.991-1.325-15.447-6.586-22.621-9.94-13.551-7.025-32.919-4.638-42.64a15.677 15.677 0 0 0 -7.952 2.591 15.492 15.492 0 0 0 -6.708 10c-3.774 19.184-5.329 45.437 8.691 61.562a15.6 15.6 0 0 0 8.546 4.998z"
                          />
                          <path
                            fill={secondColor}
                            d="m324.5 148.542a168.485 168.485 0 0 1 35.8-40.975c-3.085-8.623-5.876-10.422-12.6-14.757a131.664 131.664 0 0 1 -20.679-15.976c-10.86-10.16-19.121-28.267-25.161-41.487-.624-1.367-1.281-2.807-1.944-4.237 1.5 9.834 2.24 24.5-7.73 44.32-12.925 25.7-4.388 62.611-.964 74.859 16.178-2.813 27.757-2.309 33.278-1.747z"
                          />
                          <path fill={thirdColor}
                                d="m228.315 240.99a3.186 3.186 0 1 0 3.187 3.185 3.189 3.189 0 0 0 -3.187-3.185z" />
                          <path
                            fill={fourthColor}
                            d="m486.224 314.184-16.4-8.836a45.268 45.268 0 0 1 -20.852-23.691c-9.41-24.68-21.463-30.445-24.377-31.508a168.176 168.176 0 0 1 -28.637 1.977 5 5 0 0 1 0-10c21.3 0 38.017-1.87 50.4-11 21.864-16.11 34.466-30.226 39.659-44.422 4.665-12.755 3.222-25.137 1.552-39.474-1.5-12.842-3.193-27.4-.89-45.052 4.667-35.779 2.19-62.345-.15-76.672-1.1 1.585-2.357 3.312-3.766 5.147-7.269 24.794-42.731 71.5-83.657 90.522-11.369 5.284-22.42 17.394-28.842 31.6-5.435 12.027-9.964 30.754-.673 51.672a5 5 0 1 1 -9.138 4.059c-18.34-41.286 7.7-83.973 34.438-96.4 24.836-11.544 47.96-34.563 62.78-55.361-12.871 10.997-29.905 22.775-52.171 33.597-64.071 31.146-81.274 80.891-81.44 81.39a5 5 0 0 1 -9.487-3.162 83.591 83.591 0 0 1 4.521-10.364c-7.82-.317-21.712.148-39.9 4.946-26.659 7.036-68.226 25.086-114.868 71.121a43.587 43.587 0 0 1 -11.748 8.284l-46.706 22.47a46.629 46.629 0 0 1 8.859 32.832 5 5 0 1 1 -9.933-1.151 36.879 36.879 0 0 0 -8.098-27.262l-15.839 7.62c3.671 5.013 7.8 13.629 7.8 27.045a5 5 0 0 1 -10 0c0-12.765-4.4-19.653-7-22.615l-12.925 6.219a25.85 25.85 0 0 1 -10.35 2.513c-1.986 7.425-5.432 24.968 2.58 35.891 6.916 9.429 9.975 20.415 8.393 30.141a30.219 30.219 0 0 1 -5.625 13.3c22.613.753 61.408-2.233 94.637-26.159a5 5 0 0 1 5.843 8.116c-32.283 23.244-69.248 28.037-93.749 28.135 1.951 3.237 5.978 7.013 14.3 8.537 2.976.543 7.97-.536 13.258-1.68a104.563 104.563 0 0 1 18.39-2.789c25.4-.947 37.463 6.858 51.429 15.9 7.369 4.77 14.989 9.7 25.685 14.111 39.652 16.341 72.78 27.225 105.54 27.225h.119c36.972-.03 69.845-14.046 103.454-44.111a5 5 0 0 1 6.667 7.453c-32.063 28.682-64.928 43.89-100.164 46.306a121.941 121.941 0 0 1 34.59 32.093 9.108 9.108 0 0 0 14.14.806l140.777-155.172a9.114 9.114 0 0 0 -2.426-14.147zm-89.587-93.39a5 5 0 0 1 5.647-4.237c1.466.2 34.942 4.249 51.031-35.1a5 5 0 1 1 9.255 3.786c-9.94 24.31-26.087 34.246-37.881 38.3a58.735 58.735 0 0 1 -18.873 3.184 37.7 37.7 0 0 1 -4.943-.275 5 5 0 0 1 -4.236-5.658zm-168.322 36.567a13.186 13.186 0 1 1 13.185-13.186 13.2 13.2 0 0 1 -13.185 13.186z"
                          />
                        </svg>
                      )}
                      <div className={`header grid ${item.isUser ? "" : "channel-"}`}>
                        <span className="name t-l a-s-c f-w__900">
                          {item.isUser ? <img src={"channelIcon"} alt="" /> : null} {item.name}
                        </span>
                        <span className="time t-l a-s-c">{"item.recentMessage.time"}</span>
                      </div>
                      <div className="chat-message grid">
                        <span className="author flex a-i-c j-c-f-s">
                          {item?.recentMessage?.author?.id === cookies.userId ? "item.recentMessage.author.username" : "You"}:
                        </span>
                        <span className="message flex a-i-c j-c-f-s">{"item.recentMessage.message"}</span>
                      </div>
                    </button>
                  </li>
                })}
            </ul>
          )}
        </div>
        <div className="add-chat flex j-c-c a-i-c">
          <Button onClick={() => dispatch(displayCreateChatModal(true))} layoutType="flex" className="btn-sm" type="button">
            {t("modal.createChat.header")}
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 8.2C14 7.64772 13.5523 7.2 13 7.2C12.4477 7.2 12 7.64772 12 8.2H14ZM12 17.8C12 18.3523 12.4477 18.8 13 18.8C13.5523 18.8 14 18.3523 14 17.8H12ZM17.8 14C18.3523 14 18.8 13.5523 18.8 13C18.8 12.4477 18.3523 12 17.8 12V14ZM8.2 12C7.64772 12 7.2 12.4477 7.2 13C7.2 13.5523 7.64772 14 8.2 14V12ZM12 8.2V13H14V8.2H12ZM12 13V17.8H14V13H12ZM13 14H17.8V12H13V14ZM13 12H8.2V14H13V12ZM24 13C24 19.0751 19.0751 24 13 24V26C20.1797 26 26 20.1797 26 13H24ZM13 24C6.92487 24 2 19.0751 2 13H0C0 20.1797 5.8203 26 13 26V24ZM2 13C2 6.92487 6.92487 2 13 2V0C5.8203 0 0 5.8203 0 13H2ZM13 2C19.0751 2 24 6.92487 24 13H26C26 5.8203 20.1797 0 13 0V2Z" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}
