import React from "react";

type ChatAction = {
  type: "SET_ACTIVE_CHAT";
  payload: ChatType;
};

interface ChatType {
  chatName: string;
}

interface ChatContextType extends ChatType {
  setActiveChat(chatName: string): void;
}

const initialState: ChatType = {
  chatName: ""
};

const reducer = (state: ChatType, action: ChatAction): ChatType => {
  if (action.type === "SET_ACTIVE_CHAT") {
    return { ...state, chatName: action.payload.chatName };
  }

  return state;
};

export const ChatContext = React.createContext<ChatContextType>(initialState as ChatContextType);

export const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [activation, dispatch] = React.useReducer(reducer, initialState);

  function setActiveChat(chatName: string): void {
    dispatch({
      type: "SET_ACTIVE_CHAT",
      payload: {
        chatName: chatName
      }
    });
  }

  return (
    <ChatContext.Provider
      value={{
        ...activation,
        setActiveChat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
