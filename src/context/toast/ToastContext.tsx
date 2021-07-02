import React from "react";

type ToastAction = {
  type: "SHOW_COOKIE_INFO";
  payload: ToastType;
};

interface ToastType {
  show: boolean;
}

interface ToastContextType extends ToastType {
  showCookieInfo(show: boolean): void;
}

const initialState: ToastType = {
  show: false
};

const reducer = (state: ToastType, action: ToastAction): ToastType => {
  if (action.type === "SHOW_COOKIE_INFO") {
    return { ...state, show: action.payload.show };
  }
  return state;
};

export const ToastContext = React.createContext<ToastContextType>(initialState as ToastContextType);

export const ToastContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, dispatch] = React.useReducer(reducer, initialState);

  function showCookieInfo(show: boolean): void {
    dispatch({
      type: "SHOW_COOKIE_INFO",
      payload: {
        show: show
      }
    });
  }

  return (
    <ToastContext.Provider
      value={{
        ...toast,
        showCookieInfo
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
