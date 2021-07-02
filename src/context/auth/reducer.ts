import { ActionTypes } from "./actionTypes.enum";
import { changePersonalData, checkState, loadPersonalData, login, logout } from "./dispatcher";
import { AuthAction, AuthType } from "./types";

export const reducer = (state: AuthType, action: AuthAction) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return login(state);
    case ActionTypes.LOGOUT:
      return logout(state);
    case ActionTypes.CHECK_STATE:
      return checkState(state);
    case ActionTypes.LOAD_PERSONAL_DATA:
      return loadPersonalData(state);
    case ActionTypes.CHANGE_PERSONAL_DATA:
      return changePersonalData(action.payload, state);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
