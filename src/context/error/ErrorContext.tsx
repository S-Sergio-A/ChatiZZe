import React from "react";

type ErrorAction = {
  type: "SET_ERROR_CODE_AND_SHOW_ERROR_MODAL";
  payload: { errorCode: number };
};

interface ErrorType {
  showModal: boolean;
  errorCode: number;
}

interface ErrorContextType extends ErrorType {
  showErrorModal(errorCode: number): void;
}

const initialState: ErrorType = {
  showModal: false,
  errorCode: 0
};

const reducer = (state: ErrorType, action: ErrorAction): ErrorType => {
  if (action.type === "SET_ERROR_CODE_AND_SHOW_ERROR_MODAL") {
    return { ...state, showModal: Boolean(action.payload.errorCode), errorCode: action.payload.errorCode };
  }

  return state;
};

export const ErrorContext = React.createContext<ErrorContextType>(initialState as ErrorContextType);

export const ErrorContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, dispatch] = React.useReducer(reducer, initialState);

  function showErrorModal(errorCode: number): void {
    dispatch({
      type: "SET_ERROR_CODE_AND_SHOW_ERROR_MODAL",
      payload: {
        errorCode: errorCode
      }
    });
  }

  return (
    <ErrorContext.Provider
      value={{
        ...error,
        showErrorModal
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};
