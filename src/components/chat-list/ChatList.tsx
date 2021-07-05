import { useContext } from "react";
import { ChatContext } from "../../context/chat/ChatContext";
import "./ChatList.css";
import { SearchInput } from "../input/search-input/SearchInput";
import { useCookies } from "react-cookie";

export default function ChatList({ chats }: { chats: any[] }) {
  const { chatName, setActiveChat } = useContext(ChatContext);
  const [cookies] = useCookies(["user"]);

  return (
    <section className="chat-list grid">
      <SearchInput />
      <ul className="flex j-c-f-s a-i-c f-f-c-n">
        {chats.map((item) => (
          <li key={item.key} className={`chat-wrapper f-w ${chatName === item.name ? "active" : ""}`}>
            <button className="chat f-w f-h grid" type="button" onClick={() => setActiveChat(item.chatId)} aria-label={`${item.name} chat`}>
              <img
                src={item.logo ? item.logo : "https://via.placeholder.com/50"}
                alt={`${item.name} chat logo`}
                className="chat-logo flex j-c-c a-i-c"
              />
              <div className={`chat-header grid ${item.isChannel ? "channel" : ""}`}>
                <span className="name flex a-i-c j-c-f-s f-w__600">
                  {item.isChannel ? <img src={item.channelIcon} alt="" /> : null} {item.name}
                </span>
                <span className="time flex a-i-c j-c-f-e">{item.recentMessage.time}</span>
              </div>
              <div className="chat-message grid">
                <span className="author flex a-i-c j-c-f-s">
                  {item.recentMessage.author.id === cookies.userId ? item.mrecentMessage.author.username : "You"}:
                </span>
                <span className="message flex a-i-c j-c-f-s">{item.recentMessage.message}</span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
