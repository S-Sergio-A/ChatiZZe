import React from "react";

type ChatInfoAction = {
  type: "SHOW_CHAT_INFO";
  payload: ChatInfoType;
};

interface ChatInfoType {
  show: boolean;
}

interface ChatInfoContextType extends ChatInfoType {
  showChatInfo(show: boolean): void;
}

const initialState: ChatInfoType = {
  show: false
};

const reducer = (state: ChatInfoType, action: ChatInfoAction): ChatInfoType => {
  if (action.type === "SHOW_CHAT_INFO") {
    return { ...state, show: action.payload.show };
  }

  return state;
};

export const ChatInfoContext = React.createContext<ChatInfoContextType>(initialState as ChatInfoContextType);

export const ChatInfoContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [activation, dispatch] = React.useReducer(reducer, initialState);

  function showChatInfo(show: boolean): void {
    dispatch({
      type: "SHOW_CHAT_INFO",
      payload: {
        show: show
      }
    });
  }

  return (
    <ChatInfoContext.Provider
      value={{
        ...activation,
        showChatInfo
      }}
    >
      {children}
    </ChatInfoContext.Provider>
  );
};
