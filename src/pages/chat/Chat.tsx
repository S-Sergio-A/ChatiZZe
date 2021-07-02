import { useContext, useEffect, useState } from 'react';
import axios from "axios";
import ChatList from "../../components/chat-list/ChatList";
import ChatArea from "../../components/chat-area/ChatArea";
import { userLinks } from "../../utils/api-endpoints.enum";
import { ChatContext } from "../../context/chat/ChatContext";

export default function Chat() {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);

  const { chatName } = useContext(ChatContext);
  
  useEffect(()=>{
    loadChats();
    loadMessages();
  }, [])

  async function loadChats() {
    axios.get(userLinks.loadChats).then((response) => {
      setChats(response.data.chats);
    });
  }

  async function loadMessages() {
    axios.get(userLinks.loadMessages(chatName)).then((response) => {
      setMessages(response.data.chats);
    });
  }

  return (
    <div className="chat-page grid">
      <ChatList chats={chats} />
      <ChatArea messages={messages} />
    </div>
  );
}
