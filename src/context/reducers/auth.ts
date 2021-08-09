import { CHECK_STATE, LOGIN, LOGOUT, SHOW_FORGOT_PASSWORD } from "../consts/actionTypes";

const initialUserState = {
  _id: "",
  username: "",
  email: "",
  phoneNumber: "",
  photo: "",
  firstName: "",
  lastName: "",
  birthday: ""
};

type AuthAction = {
  type: typeof LOGIN | typeof LOGOUT | typeof CHECK_STATE | typeof SHOW_FORGOT_PASSWORD;
  payload: { [key: string]: any };
};

type AuthType = {
  logged: boolean;
  user: {
    _id: string;
    username: string;
    email: string;
    phoneNumber: string;
    photo: string;
    firstName: string;
    lastName: string;
    birthday: string;
  };
  showForgotPassword: boolean;
};

const initialState: AuthType = {
  logged: false,
  user: initialUserState,
  showForgotPassword: false
};

export const reducer = (state: AuthType = initialState, action: AuthAction): AuthType => {
  switch (action.type) {
    case LOGIN:
      return { ...state, logged: action.payload.logged, user: action.payload.user };
    case LOGOUT:
      return { ...state, logged: false, user: initialUserState };
    case CHECK_STATE:
      return {
        ...state,
        logged: action.payload.logged,
        user: action.payload.user
      };
    case SHOW_FORGOT_PASSWORD:
      return {
        ...state,
        showForgotPassword: action.payload.showForgotPassword
      };
    default:
      return state;
  }
};
