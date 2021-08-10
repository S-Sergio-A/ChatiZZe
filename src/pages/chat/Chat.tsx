import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { io } from "socket.io-client";
import { timer } from "rxjs";
import i18n from "i18next";
import axios from "axios";
import {
  reloadChats,
  resetDeletedMessageId,
  resetUpdatedMessageId,
  resetUpdatedMessageNewState, setActiveChat,
  setUpdatedMessagePrevState
} from "../../context/actions/chat";
import UserSettingsModal from "../../components/chat-user-settings-modal/UserSettingsModal";
import AddUserModal from "../../components/chat-add-user-modal/AddUserModal";
import CreateChatModal from "../../components/chat-create-modal/CreateChatModal";
import ManageChatModal from "../../components/chat-manage-modal/ManageChatModal";
import ChatDataModal from "../../components/chat-data-modal/ChatDataModal";
import { UserChatMenu } from "../../components/chat-menu/UserChatMenu";
import { RootState } from "../../context/rootState.interface";
import ChatList from "../../components/chat-list/ChatList";
import ChatArea from "../../components/chat-area/ChatArea";
import { userLinks } from "../../utils/api-endpoints.enum";
import "../../components/chat-modals/ChatModals.css";
import Head from "../../components/head/Head";
import "./Chat.css";

export default function Chat() {
  const [t] = useTranslation();
  const [chats, setChats] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  const [newMessage, setNewMessage] = useState<boolean>(false);

  const [cookies] = useCookies([]);

  const socketRef = useRef<any>(null);
  const indexOfUpdated = useRef(-1);

  const dispatch = useDispatch();

  const history = useHistory();

  const logged = useSelector((state: RootState) => state.auth.logged);
  const chatData = useSelector((state: RootState) => state.chat.data);
  const roomId = useSelector((state: RootState) => state.chat.data.roomId);
  const userId = useSelector((state: RootState) => state.auth.user._id);

  const deletedMessageId = useSelector((state: RootState) => state.chat.deletedMessageId);
  const updatedMessageId = useSelector((state: RootState) => state.chat.updatedMessageId);
  const updatedMessageNewState = useSelector((state: RootState) => state.chat.updatedMessageNewState);

  const showUserMenu = useSelector((state: RootState) => state.chat.showUserMenu);
  const enlargeChatList = useSelector((state: RootState) => state.chat.enlargeChatList);
  const reload = useSelector((state: RootState) => state.chat.reload);

  useEffect(() => {
    if (!logged) {
      history.push({ pathname: `/${i18n.language}/user/login` });
    }
  }, [logged]);

  useEffect(() => {
    if (roomId.length !== 0 && userId.length !== 0) {
      socketRef.current = io(
        process.env.REACT_APP_WSS_SERVER ? `${process.env.REACT_APP_WSS_SERVER}?roomId=${roomId}&userId=${userId}` : "",
        {
          reconnection: true,
          reconnectionAttempts: 4,
          reconnectionDelay: 3000,
          reconnectionDelayMax: 10000,
          transports: ["websocket"]
        }
      );

      socketRef.current.emit("load-last-messages");

      socketRef.current.on("last-messages", (lastMessages: any) => {
        setMessages(lastMessages.reverse());
      });

      socketRef.current.on("users", (activeUsers: any) => {
        dispatch(setActiveChat({ ...chatData, activeUsers: activeUsers.length }));
      });

      socketRef.current.on("new-message", (newMessage: any) => {
        setMessages((oldMessages) => [...oldMessages, newMessage]);
        setNewMessage(true);
        timer(100).subscribe(() => setNewMessage(false));
      });

      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [roomId, userId]);

  useEffect(() => {
    if (reload) {
      loadChats();
      dispatch(reloadChats(false));
    }
  }, [reload]);

  useEffect(() => {
    if (chats.length === 0) loadChats();
  }, []);

  useEffect(() => {
    if (deletedMessageId !== "") {
      const messagesCopy = [...messages];
      const indexOfDeleted = messagesCopy.findIndex((item) => item._id === deletedMessageId);

      messagesCopy.splice(indexOfDeleted, 1);
      setMessages(messagesCopy);
      dispatch(resetDeletedMessageId());
    }
  }, [deletedMessageId]);

  useEffect(() => {
    if (updatedMessageId !== "") {
      const messagesCopy = [...messages];

      indexOfUpdated.current = messagesCopy.findIndex((item) => item._id === updatedMessageId);
      dispatch(setUpdatedMessagePrevState(messagesCopy[indexOfUpdated.current]));
      dispatch(resetUpdatedMessageId());
    }
  }, [updatedMessageId]);

  useEffect(() => {
    if (Object.keys(updatedMessageNewState).length !== 0) {
      const messagesCopy = [...messages];

      messagesCopy[indexOfUpdated.current] = updatedMessageNewState;
      setMessages(messagesCopy);
      dispatch(resetUpdatedMessageNewState());
    }
  }, [updatedMessageNewState]);

  async function loadChats() {
    axios
      .get(userLinks.loadUserRooms, {
        headers: {
          "Access-Token": cookies["accessToken"]?.accessToken,
          "Refresh-Token": cookies["refreshToken"]?.refreshToken
        }
      })
      .then(({ data }) => {
        setChats(data);
      });
  }

  return (
    <React.Fragment>
      <Head title={t("chat.seo.title")} description={t("chat.seo.description")} />
      <div className="placeholder-f" />
      <main id="main" className={`chat-page grid ${enlargeChatList ? "enlarge-menu" : ""}`}>
        <ChatList chats={chats} />
        <ChatArea messages={messages} newMessage={newMessage} socketRef={socketRef} />
        <CreateChatModal />
        <AddUserModal />
        <ChatDataModal socketRef={socketRef} />
        <ManageChatModal socketRef={socketRef} />
        <UserChatMenu />
        <UserSettingsModal />
      </main>
      <div className={`menu-back ${showUserMenu ? "" : "none"}`} />
      <div className="placeholder-s" />
    </React.Fragment>
  );
}
