import React, { ChangeEvent, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { SearchChatMessagesContext } from "../../../context/search-chat-messages/SearchChatMessagesContext";
import { ChatContext } from "../../../context/chat/ChatContext";
import { userLinks } from "../../../utils/api-endpoints.enum";
import "./SearchInput.css";

export const SearchInput = () => {
  const [keyword, setKeyword] = useState("");
  const [t] = useTranslation();
  const { setMessages } = useContext(SearchChatMessagesContext);
  const { chatName } = useContext(ChatContext);
  
  function onChange(event: ChangeEvent<HTMLInputElement>){
    setKeyword(event.target.value);
    
    searchMessages();
  }
  
  async function searchMessages() {
    axios.get(userLinks.searchMessage(chatName, keyword)).then((response)=> {
      setMessages(chatName, response.data.messages);
    });
  }

  return (
    <input inputMode="search" onChange={onChange} placeholder={t("search.placeholder")} value={keyword} />
  );
};
