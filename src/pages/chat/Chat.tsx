import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ChatList from "../../components/chat-list/ChatList";
import ChatArea from "../../components/chat-area/ChatArea";
import { userLinks } from "../../utils/api-endpoints.enum";
import { ChatContext } from "../../context/chat/ChatContext";
import chatList from "./__tests__/chats.json";
import messagesList from "./__tests__/messages.json";
import "./Chat.css";

export default function Chat() {
  const [chats, setChats] = useState<
    {
      key: string;
      chatId: number;
      name: string;
      logo: string;
      isChannel: boolean;
      recentMessage: {
        author: {
          id: number;
          username: string;
        };
        message: string;
        time: string;
      };
    }[]
  >([]);
  const [messages, setMessages] = useState([]);

  const { chatName } = useContext(ChatContext);

  useEffect(() => {
    loadChats();
    loadMessages();
  }, []);

  async function loadChats() {
    setChats(chatList);
    // axios.get(userLinks.loadChats).then((response) => {
    //   setChats(response.data.chats);
    // });
  }

  async function loadMessages() {
    setChats(messages);
    // axios.get(userLinks.loadMessages(chatName)).then((response) => {
    //   setMessages(response.data.chats);
    // });
  }

  return (
    <main id="main" className="chat-page grid">
      <ChatList chats={chatList} />
      <ChatArea chat={messagesList} />
    </main>
  );
}
