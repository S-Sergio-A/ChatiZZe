import { routerMiddleware } from "react-router-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { createBrowserHistory } from "history";
// import { cookieMiddleware } from "./middleware";
import reducer from "./reducer";

// @ts-ignore
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const browserHistory = createBrowserHistory();

const myRouterMiddleware = routerMiddleware(browserHistory);

// const getMiddleware = () => {
//   return applyMiddleware(myRouterMiddleware, cookieMiddleware);
// };

// export const store = createStore(reducer, composeEnhancers(applyMiddleware()));
export const store = createStore(reducer);
