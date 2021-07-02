import { AuthType, PersonalData } from "./types";
import { Cookies } from "react-cookie";

const cookies: any = new Cookies();

function login(state: AuthType) {
  cookies.set("user-auth", { logged: true });
  return { ...state, logged: true };
}

function logout(state: AuthType) {
  cookies.remove("user-auth");
  return { ...state, logged: true };
}

function checkState(state: AuthType) {
  const logged = cookies["user-auth"].logged;

  return { ...state, logged: logged };
}

function loadPersonalData(state: AuthType) {
  const personalData = cookies["user-personal-data"];

  return { ...state, personalData: personalData };
}

function changePersonalData(newData: PersonalData, state: AuthType) {
  const oldData = cookies["user-personal-data"];

  for (const [key, value] of Object.entries(newData)) {
    if (value === "") {
      newData[key] = oldData[key];
    }
  }

  cookies.set("user-data", newData);

  return { ...state, personalData: newData };
}

export { login, logout, checkState, loadPersonalData, changePersonalData };
