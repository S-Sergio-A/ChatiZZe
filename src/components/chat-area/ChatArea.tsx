import React from "react";
import { useContext } from "react";
import { ChatContext } from "../../context/chat/ChatContext";
import Message from "../message/Message";
import { ChatInput } from "../chat-input/ChatInput";
import ChatHeader from "../chat-header/ChatHeader";
import "./ChatArea.css";

const chatName = "Booba";

export default function ChatArea({
  chat
}: {
  chat: {
    chatName: string;
    messages: {
      id: number;
      userIcon: string;
      author: {
        id: number;
        username: string;
      };
      text: string;
      timestamp: string;
    }[];
  };
}) {
  // const { chatName } = useContext(ChatContext);

  return (
    <React.Fragment>
      {!chat.chatName ? (
        <section
          className="chat-layout flex a-i-c j-c-f-s f-f-c-n"
          style={{ background: `url(http://localhost:3000/chat_dummy_primary.svg) no-repeat center` }}
        >
          <h1>Choose a person to chat with</h1>
        </section>
      ) : (
        <section className="chat-layout grid">
          <ChatHeader />
          <ul>
            {chat.messages.map((item, index) => (
              <li key={item.id}>
                <Message
                  userIcon={item.userIcon}
                  author={item.author}
                  text={item.text}
                  timestamp={item.timestamp}
                  nextMessageAuthorId={chat.messages[index + 1] ? chat.messages[index + 1].author.id : undefined}
                />
              </li>
            ))}
          </ul>
          <ChatInput />
        </section>
      )}
    </React.Fragment>
  );
}
