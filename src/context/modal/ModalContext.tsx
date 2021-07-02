import React from "react";

type ModalAction = {
  type: "SHOW_MODAL";
  payload: ModalType;
};

interface ModalType {
  show: boolean;
}

interface ModalContextType extends ModalType {
  showModal(show: boolean): void;
}

const initialState: ModalType = {
  show: false
};

const reducer = (state: ModalType, action: ModalAction): ModalType => {
  if (action.type === "SHOW_MODAL") {
    return { ...state, show: action.payload.show };
  }

  return state;
};

export const ModalContext = React.createContext<ModalContextType>(initialState as ModalContextType);

export const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, dispatch] = React.useReducer(reducer, initialState);
  
  function showModal(show: boolean): void {
    dispatch({
      type: "SHOW_MODAL",
      payload: {
        show: show
      }
    });
  }
  
  return (
    <ModalContext.Provider
      value={{
        ...modal,
        showModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
