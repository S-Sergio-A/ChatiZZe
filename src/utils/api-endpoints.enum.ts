export const clientLinks = {
  invoke: "/invoke",
  getToken: "/token",
  contactUs: "/contact",
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
  searchRooms: (name: string) => `/room/${name}`,
  updateRoom: (userId: string, roomId: string) => `/room?roomId=${roomId}?userId=${userId}`,
  changeRoomPhoto: (userId: string, roomId: string) => `/room-photo?roomId=${roomId}?userId=${userId}`,
  deleteRoom: (roomId: string) => `/room?roomId=${roomId}`,
  addUserToRoom: (userId: string, roomId: string, newUserIdentifier: string) =>
    `/user?userId=${userId}&roomId=${roomId}&newUserIdentifier=${newUserIdentifier}`,
  deleteUserFromRoom: (userId: string, roomId: string) => `/user?userId=${userId}&roomId=${roomId}&type=DELETE_USER`,
  changeUserRightsInRoom: (userId: string, roomId: string) => `/user-rights?userId=${userId}&roomId=${roomId}`,
  loadUserRights: (userId: string, roomId: string) => `/rights?userId=${userId}&roomId=${roomId}`,
  leaveRoom: (userId: string, roomId: string) => `/user?userId=${userId}&roomId=${roomId}&type=LEAVE_ROOM`,
  notifications: (userId: string, roomId: string, notifications: string) =>
    `/notifications?userId=${userId}&roomId=${roomId}&notifications=${notifications}`,
};
