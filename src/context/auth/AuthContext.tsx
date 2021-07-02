import React from "react";
import { AuthContextType, initialState } from "./types";
import { reducer } from "./reducer";
import { ActionTypes } from "./actionTypes.enum";

export const AuthContext = React.createContext<AuthContextType>(initialState as AuthContextType);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, dispatch] = React.useReducer(reducer, initialState);

  function login(): void {
    dispatch({
      type: ActionTypes.LOGIN,
      payload: {}
    });
  }

  function logout(): void {
    dispatch({
      type: ActionTypes.LOGOUT,
      payload: {}
    });
  }

  function checkState(): void {
    dispatch({
      type: ActionTypes.CHECK_STATE,
      payload: {}
    });
  }

  function loadPersonalData(): void {
    dispatch({
      type: ActionTypes.LOAD_PERSONAL_DATA,
      payload: {}
    });
  }

  function changePersonalData(newData: { [key: string]: any }): void {
    dispatch({
      type: ActionTypes.CHANGE_PERSONAL_DATA,
      payload: {
        newData: newData
      }
    });
  }

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        login,
        logout,
        checkState,
        loadPersonalData,
        changePersonalData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
