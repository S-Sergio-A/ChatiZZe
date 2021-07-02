const REST_API = "";

export const publicLinks = {
  articles: (language: string) => `${REST_API}/${language}/press/all`,
  pressRelease: (language: string, id: string) => `${REST_API}/${language}/press/id/${id}`
};

export const clientLinks = {
  analytics: `${REST_API}/analytics`,
  createSession: `${REST_API}/client/create-session`,
  contactUs: `${REST_API}/client/contact`,
  subscribe: `${REST_API}/client/subscribe`
};

export const userLinks = {
  changeOptionalData: `${REST_API}/user/optional-data`,
  changeEmail: `${REST_API}/user/change-email`,
  changePassword: `${REST_API}/user/change-password`,
  changeTelNum: `${REST_API}/user/change-tel-num`,
  contactUs: `${REST_API}/user/contact`,
  loadChats: `${REST_API}/user/chats`,
  loadMessages: (chatId: string) => `${REST_API}/user/chats/${chatId}`,
  loadChatMetadata: (chatId: string) => `${REST_API}/user/chats/metadata/${chatId}`,
  searchChannel: (keyword: string) => `${REST_API}/user/channel/${keyword}`,
  searchMessage: (chatName: string, keyword: string) => `${REST_API}/user/${chatName}/messages/${keyword}`,
  error: `${REST_API}/user/error/`,
  login: `${REST_API}/user/login`,
  refresh: `${REST_API}/user/refresh`,
  register: `${REST_API}/user/register`,
  validate: `${REST_API}/user/validate`
};
