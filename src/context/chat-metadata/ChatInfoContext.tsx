import React, { useContext } from "react";
import { UserRightsEnum } from "../../utils/types/UserRightsType";
import axios from "axios";
import { userLinks } from "../../utils/api-endpoints.enum";
import { ChatContext } from "../chat/ChatContext";

type ChatMetadataAction = {
  type: "LOAD_CHAT_METADATA" | "CLEAR_CHAT_METADATA";
  payload?: ChatMetadataType;
};

interface ChatMetadataType {
  name: string;
  membersCount: number;
  activeMembersCount: number;
  sentFilesCount: number;
  userRights: (
    | UserRightsEnum.SEND_MESSAGES
    | UserRightsEnum.SEND_FILES
    | UserRightsEnum.ADD_NEW_MEMBERS
    | UserRightsEnum.DELETE_MEMBERS
    | UserRightsEnum.CHANGE_RIGHTS_OF_OTHERS
  )[];
  logo: string;
  notificationsOn: boolean;
}

interface ChatMetadataContextType extends ChatMetadataType {
  loadChatMetadata(): void;
  clearChatMetadata(): void;
}

const initialState: ChatMetadataType = {
  name: "New Group",
  membersCount: 1,
  activeMembersCount: 1,
  sentFilesCount: 0,
  userRights: [UserRightsEnum.SEND_MESSAGES],
  logo: "logo",
  notificationsOn: true
};

const reducer = (state: ChatMetadataType, action: ChatMetadataAction): ChatMetadataType => {
  if (action.type === "LOAD_CHAT_METADATA") {
    if (action.payload) {
      return {
        ...state,
        name: action.payload.name,
        membersCount: action.payload.membersCount,
        activeMembersCount: action.payload.activeMembersCount,
        sentFilesCount: action.payload.sentFilesCount,
        userRights: action.payload.userRights,
        logo: action.payload.logo,
        notificationsOn: action.payload.notificationsOn
      };
    } else {
      return {
        ...initialState
      };
    }
  }

  if (action.type === "CLEAR_CHAT_METADATA") {
    return {
      ...initialState
    };
  }

  return state;
};

export const ChatMetadataContext = React.createContext<ChatMetadataContextType>(initialState as ChatMetadataContextType);

export const ChatMetadataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [activation, dispatch] = React.useReducer(reducer, initialState);
  const { chatName } = useContext(ChatContext);
  
  async function loadChatMetadata(): Promise<void> {
    let data = {
      name: "New Group",
      membersCount: 1,
      activeMembersCount: 1,
      sentFilesCount: 0,
      userRights: [UserRightsEnum.SEND_MESSAGES],
      logo: "logo",
      notificationsOn: true
    };

    await axios.get(userLinks.loadChatMetadata(chatName)).then((response) => {
      data = response.data.metadata;
    });

    dispatch({
      type: "LOAD_CHAT_METADATA",
      payload: {
        name: data.name,
        membersCount: data.membersCount,
        activeMembersCount: data.activeMembersCount,
        sentFilesCount: data.sentFilesCount,
        userRights: data.userRights,
        logo: data.logo,
        notificationsOn: data.notificationsOn
      }
    });
  }

  function clearChatMetadata(): void {
    dispatch({
      type: "LOAD_CHAT_METADATA"
    });
  }

  return (
    <ChatMetadataContext.Provider
      value={{
        ...activation,
        loadChatMetadata,
        clearChatMetadata
      }}
    >
      {children}
    </ChatMetadataContext.Provider>
  );
};
