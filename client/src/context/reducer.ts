import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { activation, auth, chat, error, menu, notification, theme } from "./reducers";

export default combineReducers({
  activation,
  auth,
  chat,
  error,
  menu,
  notification,
  theme,
  router: routerReducer
});
