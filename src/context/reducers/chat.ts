import {
  CHANGE_CHAT_LIST_SIZE,
  RELOAD_CHATS,
  RESET_DELETED_MESSAGE_ID,
  RESET_UPDATED_MESSAGE_ID,
  RESET_UPDATED_MESSAGE_NEW_STATE,
  RESET_UPDATED_MESSAGE_PREV_STATE,
  SET_ACTIVE_CHAT,
  SET_CURRENT_CHAT_RIGHTS,
  SET_DELETED_MESSAGE_ID,
  SET_UPDATED_MESSAGE_ID,
  SET_UPDATED_MESSAGE_NEW_STATE,
  SET_UPDATED_MESSAGE_PREV_STATE,
  SET_USER_MENU_BUTTON_REF,
  SHOW_ADD_USER_MODAL,
  SHOW_CHAT_DATA,
  SHOW_CREATE_CHAT_MODAL,
  SHOW_MANAGE_CHAT_MODAL,
  SHOW_USER_INFO,
  SHOW_USER_MENU,
  SHOW_USER_SETTINGS
} from "../consts/actionTypes";

type ChatAction = {
  type:
    | typeof SET_ACTIVE_CHAT
    | typeof SHOW_CREATE_CHAT_MODAL
    | typeof SHOW_ADD_USER_MODAL
    | typeof SHOW_MANAGE_CHAT_MODAL
    | typeof SHOW_CHAT_DATA
    | typeof RELOAD_CHATS
    | typeof SHOW_USER_INFO
    | typeof SET_DELETED_MESSAGE_ID
    | typeof RESET_DELETED_MESSAGE_ID
    | typeof SET_UPDATED_MESSAGE_ID
    | typeof RESET_UPDATED_MESSAGE_ID
    | typeof SET_UPDATED_MESSAGE_PREV_STATE
    | typeof SET_UPDATED_MESSAGE_NEW_STATE
    | typeof RESET_UPDATED_MESSAGE_PREV_STATE
    | typeof RESET_UPDATED_MESSAGE_NEW_STATE
    | typeof SET_CURRENT_CHAT_RIGHTS
    | typeof SHOW_USER_MENU
    | typeof SET_USER_MENU_BUTTON_REF
    | typeof CHANGE_CHAT_LIST_SIZE
    | typeof SHOW_USER_SETTINGS;
  payload: ChatType;
};

interface ChatType {
  data: {
    chatName: string;
    roomId: string;
    isPrivate: boolean;
    isUser: boolean;
    photo: string;
    description: string;
    usersID: string[];
    activeUsers: number;
    recentMessage: {
      text: string;
      attachment: string[];
      timestamp: string;
      user: {
        _id: string;
        username: string;
      };
    };
  };
  showChatData: boolean;
  showUserInfo: boolean;
  showAddUser: boolean;
  showCreateChat: boolean;
  showUserMenu: boolean;
  userMenuButtonRef: any;
  enlargeChatList: boolean;
  showUserSettings: boolean;
  showManageChatMenu: boolean;
  updatedMessagePrevState: any;
  updatedMessageNewState: any;
  deletedMessageId: string;
  updatedMessageId: string;
  rights: string[];
  reload: boolean;
}

export const initialChatData = {
  chatName: "initial",
  roomId: "",
  isPrivate: false,
  isUser: false,
  photo: "https://via.placeholder.com/60",
  description: "Real description is loading...",
  usersID: ["loading"],
  activeUsers: 1,
  recentMessage: {
    text: "loading...",
    attachment: ["loading..."],
    timestamp: "loading...",
    user: {
      _id: "br",
      username: "Loading..."
    }
  }
};

const initialState = {
  data: initialChatData,
  showChatData: false,
  showUserInfo: false,
  showAddUser: false,
  showCreateChat: false,
  showUserMenu: false,
  userMenuButtonRef: null,
  enlargeChatList: false,
  showUserSettings: false,
  showManageChatMenu: false,
  updatedMessagePrevState: {},
  updatedMessageNewState: {},
  deletedMessageId: "",
  updatedMessageId: "",
  rights: [
    "SEND_MESSAGES",
    "SEND_ATTACHMENTS",
    "DELETE_MESSAGES",
    "ADD_USERS",
    "DELETE_USERS",
    "CHANGE_USER_RIGHTS",
    "CHANGE_ROOM",
    "DELETE_ROOM",
    "UPDATE_MESSAGE"
  ],
  reload: false
};

export const reducer = (state: ChatType = initialState, action: ChatAction): ChatType => {
  switch (action.type) {
    case SET_ACTIVE_CHAT: {
      return {
        ...state,
        data: {
          chatName: action.payload.data.chatName,
          roomId: action.payload.data.roomId,
          isPrivate: action.payload.data.isPrivate,
          isUser: action.payload.data.isUser,
          photo: action.payload.data.photo,
          description: action.payload.data.description,
          usersID: action.payload.data.usersID,
          activeUsers: action.payload.data.activeUsers,
          recentMessage: action.payload.data.recentMessage
        }
      };
    }
    case SHOW_CREATE_CHAT_MODAL: {
      return { ...state, showCreateChat: action.payload.showCreateChat };
    }
    case RELOAD_CHATS: {
      return { ...state, reload: action.payload.reload };
    }
    case SHOW_ADD_USER_MODAL: {
      return { ...state, showAddUser: action.payload.showAddUser };
    }
    case SHOW_MANAGE_CHAT_MODAL: {
      return { ...state, showManageChatMenu: action.payload.showManageChatMenu };
    }
    case SHOW_CHAT_DATA: {
      return { ...state, showChatData: action.payload.showChatData };
    }
    case SHOW_USER_INFO: {
      return { ...state, showUserInfo: action.payload.showUserInfo };
    }
    case SHOW_USER_MENU: {
      return { ...state, showUserMenu: action.payload.showUserMenu };
    }
    case SET_USER_MENU_BUTTON_REF: {
      return { ...state, userMenuButtonRef: action.payload.userMenuButtonRef };
    }
    case CHANGE_CHAT_LIST_SIZE: {
      return { ...state, enlargeChatList: action.payload.enlargeChatList };
    }
    case SHOW_USER_SETTINGS: {
      return { ...state, showUserSettings: action.payload.showUserSettings };
    }
    case SET_DELETED_MESSAGE_ID: {
      return { ...state, deletedMessageId: action.payload.deletedMessageId };
    }
    case RESET_DELETED_MESSAGE_ID: {
      return { ...state, deletedMessageId: "" };
    }
    case SET_UPDATED_MESSAGE_ID: {
      return { ...state, updatedMessageId: action.payload.updatedMessageId };
    }
    case RESET_UPDATED_MESSAGE_ID: {
      return { ...state, updatedMessageId: "" };
    }
    case SET_UPDATED_MESSAGE_PREV_STATE: {
      return { ...state, updatedMessagePrevState: action.payload.updatedMessagePrevState };
    }
    case SET_UPDATED_MESSAGE_NEW_STATE: {
      return { ...state, updatedMessageNewState: action.payload.updatedMessageNewState };
    }
    case RESET_UPDATED_MESSAGE_PREV_STATE: {
      return { ...state, updatedMessagePrevState: {} };
    }
    case RESET_UPDATED_MESSAGE_NEW_STATE: {
      return { ...state, updatedMessageNewState: {} };
    }
    case SET_CURRENT_CHAT_RIGHTS: {
      return { ...state, rights: action.payload.rights };
    }
    default:
      return state;
  }
};
