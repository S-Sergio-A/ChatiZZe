import {
  RESET_DELETED_MESSAGE_ID,
  SET_ACTIVE_CHAT,
  SET_DELETED_MESSAGE_ID,
  SET_UPDATED_MESSAGE_PREV_STATE,
  SET_UPDATED_MESSAGE_NEW_STATE,
  SET_UPDATED_MESSAGE_ID,
  SHOW_CHAT_DATA,
  SHOW_USER_INFO,
  CHANGE_CHAT_LIST_SIZE,
  SHOW_MANAGE_CHAT_MODAL,
  SHOW_CREATE_CHAT_MODAL,
  RESET_UPDATED_MESSAGE_ID,
  RESET_UPDATED_MESSAGE_NEW_STATE,
  RESET_UPDATED_MESSAGE_PREV_STATE,
  SET_CURRENT_CHAT_RIGHTS,
  SHOW_ADD_USER_MODAL,
  SHOW_USER_MENU,
  SET_USER_MENU_BUTTON_REF,
  SHOW_USER_SETTINGS,
  RELOAD_CHATS
} from "../consts/actionTypes";

function setActiveChatAction(chatName: string, roomId: string, isPrivate: boolean, isUser: boolean) {
  return { type: SET_ACTIVE_CHAT, payload: { chatName, roomId, isPrivate, isUser } };
}

function displayCreateChatModal(showCreateChat: boolean) {
  return { type: SHOW_CREATE_CHAT_MODAL, payload: { showCreateChat } };
}

function reloadChats(reload: boolean) {
  return { type: RELOAD_CHATS, payload: { reload } };
}

function displayAddUserModal(showAddUser: boolean) {
  return { type: SHOW_ADD_USER_MODAL, payload: { showAddUser } };
}

function displayManageChatModal(showManageChatMenu: boolean) {
  return { type: SHOW_MANAGE_CHAT_MODAL, payload: { showManageChatMenu } };
}

function displayChatData(showChatData: boolean) {
  return { type: SHOW_CHAT_DATA, payload: { showChatData } };
}

function displayUserInfo(showUserInfo: boolean) {
  return { type: SHOW_USER_INFO, payload: { showUserInfo } };
}

function displayUserMenu(showUserMenu: boolean) {
  return { type: SHOW_USER_MENU, payload: { showUserMenu } };
}

function setUserMenuButtonRef(userMenuButtonRef: any) {
  return { type: SET_USER_MENU_BUTTON_REF, payload: { userMenuButtonRef } };
}

function changeChatListSize(enlargeChatList: boolean) {
  return { type: CHANGE_CHAT_LIST_SIZE, payload: { enlargeChatList } };
}

function displayUserSettings(showUserSettings: boolean) {
  return { type: SHOW_USER_SETTINGS, payload: { showUserSettings } };
}

function setDeletedMessageId(deletedMessageId: string) {
  return { type: SET_DELETED_MESSAGE_ID, payload: { deletedMessageId } };
}

function setUpdatedMessageId(updatedMessageId: string) {
  return { type: SET_UPDATED_MESSAGE_ID, payload: { updatedMessageId } };
}

function setUpdatedMessagePrevState(updatedMessagePrevState: any) {
  return { type: SET_UPDATED_MESSAGE_PREV_STATE, payload: { updatedMessagePrevState } };
}

function setUpdatedMessageNewState(updatedMessageNewState: any) {
  return { type: SET_UPDATED_MESSAGE_NEW_STATE, payload: { updatedMessageNewState } };
}

function resetDeletedMessageId() {
  return { type: RESET_DELETED_MESSAGE_ID };
}

function resetUpdatedMessageId() {
  return { type: RESET_UPDATED_MESSAGE_ID };
}

function resetUpdatedMessagePrevState() {
  return { type: RESET_UPDATED_MESSAGE_PREV_STATE };
}

function resetUpdatedMessageNewState() {
  return { type: RESET_UPDATED_MESSAGE_NEW_STATE };
}

function setCurrentChatRights(rights: string[]) {
  return { type: SET_CURRENT_CHAT_RIGHTS, payload: { rights } };
}

export {
  setActiveChatAction,
  displayCreateChatModal,
  displayAddUserModal,
  displayChatData,
  reloadChats,
  displayUserInfo,
  displayUserMenu,
  setUserMenuButtonRef,
  changeChatListSize,
  displayUserSettings,
  displayManageChatModal,
  setDeletedMessageId,
  resetDeletedMessageId,
  setUpdatedMessageId,
  setUpdatedMessagePrevState,
  setUpdatedMessageNewState,
  resetUpdatedMessageId,
  resetUpdatedMessagePrevState,
  resetUpdatedMessageNewState,
  setCurrentChatRights
};
