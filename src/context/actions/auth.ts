import { CHECK_STATE, LOGIN, LOGOUT, SHOW_FORGOT_PASSWORD } from "../consts/actionTypes";
import { Cookies } from "react-cookie";

function login(user: {
  _id: string;
  username: string;
  email: string;
  phoneNumber: string;
  photo: string;
  firstName: string;
  lastName: string;
  birthday: string;
}) {
  return { type: LOGIN, payload: { logged: true, user } };
}

function logout() {
  return { type: LOGOUT, payload: { logged: false } };
}

function checkState(cookies: any) {
  const logged = cookies.hasOwnProperty("user-auth") ? cookies["user-auth"]?.logged : false;
  const user = cookies.hasOwnProperty("user-data")
    ? cookies["user-data"]
    : {
        _id: "initial",
        username: "initial",
        email: "initial",
        phoneNumber: "initial",
        photo: "initial",
        firstName: "initial",
        lastName: "initial",
        birthday: "initial"
      };

  return { type: CHECK_STATE, payload: { logged, user } };
}

function showForgotPassword(showForgotPassword: boolean) {
  return { type: SHOW_FORGOT_PASSWORD, payload: { showForgotPassword } };
}

export { login, logout, checkState, showForgotPassword };
