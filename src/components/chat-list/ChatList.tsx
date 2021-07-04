import { useContext } from "react";
import { ChatContext } from "../../context/chat/ChatContext";
import "./ChatList.css";

export default function ChatList({ chats }: { chats: any[] }) {
  const { chatName, setActiveChat } = useContext(ChatContext);

  return (
    <section className="chat-list">
      <ul className="f-w f-h flex j-c-c a-i-c f-f-c-n">
        {chats.map((item) => (
          <li key={item.key} className={`chat-wrapper f-w ${chatName === item.name ? "active" : ""}`}>
            <button type="button" onClick={() => setActiveChat(item.chatId)} aria-label={`${item.name} chat`}>
              <div className="chat-logo flex j-c-c a-i-c">{item.logo}</div>
              <div className="chat-info flex j-c-c a-i-c f-f-c-n">
                <div className={`chat-name grid ${item.isChannel ? 'channel': ''}`}>
                  {item.isChannel && <img src="channelIcon" alt="" />}
                  <span>{item.name}</span>
                  <span>{item.recentMessage.time}</span>
                </div>
                <div className="flex j-c-f-s a-i-c">
                  <span>{item.recentMessage.author}:</span>
                  <span>{item.recentMessage.message}</span>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
