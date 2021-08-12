export const clientLinks = {
  invoke: "/invoke",
  getToken: "/token",
  contactUs: "/contact"
};

export const userLinks = {
  registration: "/sign-up",
  verifyRegistration: (email: string, verification: string) => `/verify-registration?email=${email}&verification=${verification}`,
  login: "/login",
  resetPassword: "/reset-password",
  verifyPasswordReset: (email: string) => `/verify-password-reset?email=${email}`,
  logout: "/logout",

  changeEmail: "/email",
  changeUsername: "/username",
  changePhone: "/phone",
  changePassword: "/password",
  verifyChange: (verification: string, dataType: string) => `/verify-change?verification=${verification}&dataType=${dataType}`,
  changeOptionalData: "/optional",
  changePhoto: "/photo",

  refresh: "/refresh-session",

  createRoom: "/create-room",
  loadRooms: "/rooms",
  loadUserRooms: "/user-rooms",
  searchRooms: (name: string, userId: string) => `/room/${name}?userId=${userId}`,
  recentMessage: (roomId: string) => `/recent-message?roomId=${roomId}`,
  updateRoom: (userId: string, roomId: string) => `/room?roomId=${roomId}&userId=${userId}`,
  changeRoomPhoto: (userId: string, roomId: string) => `/room-photo?roomId=${roomId}&userId=${userId}`,
  deleteRoom: (userId: string, roomId: string) => `/room?userId=${userId}&roomId=${roomId}`,
  addUserToRoom: (userId: string, roomId: string, newUserIdentifier: string) =>
    `/user?userId=${userId}&roomId=${roomId}&newUserIdentifier=${newUserIdentifier}`,
  enterPublicRoom: (userId: string, roomId: string) => `/enter-room?userId=${userId}&roomId=${roomId}`,
  deleteUserFromRoom: (userId: string, roomId: string) => `/user?userId=${userId}&roomId=${roomId}&type=DELETE_USER`,
  changeUserRightsInRoom: (performerUserId: string, targetUserId: string, roomId: string) =>
    `/user-rights?performerUserId=${performerUserId}&targetUserId=${targetUserId}&roomId=${roomId}`,
  loadUserRights: (userId: string, roomId: string) => `/rights?userId=${userId}&roomId=${roomId}`,
  notifications: (userId: string, roomId: string, notifications: string) =>
    `/notifications?userId=${userId}&roomId=${roomId}&notifications=${notifications}`
};
