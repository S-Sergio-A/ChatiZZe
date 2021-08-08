import { SHOW_COOKIE_INFO, SHOW_SUCCESSFUL_VERIFICATION } from "../consts/actionTypes";

type NotificationAction = {
  type: typeof SHOW_COOKIE_INFO | typeof SHOW_SUCCESSFUL_VERIFICATION;
  payload: NotificationType;
};

interface NotificationType {
  showCookie: boolean;
  showVerification: boolean;
}

const initialState = {
  showCookie: false,
  showVerification: false
};

export const reducer = (state: NotificationType = initialState, action: NotificationAction): NotificationType => {
  switch (action.type) {
    case SHOW_COOKIE_INFO:
      return { ...state, showCookie: action.payload.showCookie };
    case SHOW_SUCCESSFUL_VERIFICATION:
      return { ...state, showVerification: action.payload.showVerification };
    default:
      return state;
  }
};
