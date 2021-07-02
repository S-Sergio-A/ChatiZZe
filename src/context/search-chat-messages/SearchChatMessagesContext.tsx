import React from "react";

type SearchChatMessagesAction = {
  type: "SET_SEARCHED_MESSAGES";
  payload: SearchChatMessagesType;
};

interface SearchChatMessagesType {
  chatName: string;
  messages: { [key: string]: any }[];
}

interface SearchChatMessagesContextType extends SearchChatMessagesType {
  setMessages(chatName: string, messages: { [key: string]: any }[]): void;
}

const initialState: SearchChatMessagesType = {
  chatName: '',
  messages: []
};

const reducer = (state: SearchChatMessagesType, action: SearchChatMessagesAction): SearchChatMessagesType => {
  if (action.type === "SET_SEARCHED_MESSAGES") {
    return { ...state, chatName: action.payload.chatName };
  }

  return state;
};

export const SearchChatMessagesContext = React.createContext<SearchChatMessagesContextType>(initialState as SearchChatMessagesContextType);

export const SearchChatMessagesContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [activation, dispatch] = React.useReducer(reducer, initialState);

  function setMessages(chatName: string, messages: { [key: string]: any }[]): void {
    dispatch({
      type: "SET_SEARCHED_MESSAGES",
      payload: {
        chatName: chatName,
        messages: messages
      }
    });
  }

  return (
    <SearchChatMessagesContext.Provider
      value={{
        ...activation,
        setMessages
      }}
    >
      {children}
    </SearchChatMessagesContext.Provider>
  );
};
