import React from "react";
import { useContext } from "react";
import { ChatContext } from "../../context/chat/ChatContext";
import Message from "../message/Message";
import { ChatInput } from "../chat-input/ChatInput";
import ChatHeader from "../chat-header/ChatHeader";

export default function ChatArea({ messages }: { messages: any[] }) {
  const { chatName } = useContext(ChatContext);

  return (
    <React.Fragment>
      {!chatName ? (
        <section className="chat-layout">
          <h1>Choose a person to chat with</h1>
        </section>
      ) : (
        <section className="chat-layout">
          <ChatHeader/>
          <ul>
            {messages.map((item, index) => (
              <li key={item.id}>
                <Message
                  userImageSrc={item.userImageSrc}
                  messageAuthorId={item.messageAuthorId}
                  messageText={item.messageText}
                  messageTimestamp={item.messageTimestamp}
                  nextMessageAuthorId={messages[index + 1].messageAuthorId}
                />
              </li>
            ))}
          </ul>
          <ChatInput/>
        </section>
      )}
    </React.Fragment>
  );
}
