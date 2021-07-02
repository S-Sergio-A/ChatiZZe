import React from "react";

type ActivationAction = {
  type: "SHOW_SUCCESSFUL_ACTIVATION_MODAL" | "SHOW_NOT_ACTIVATED_MODAL";
  payload: ActivationType;
};

interface ActivationType {
  activationModal: boolean;
  notActivated: boolean;
}

interface ActivationContextType extends ActivationType {
  showSuccessfulActivationModal(show: boolean): void;
  showNotActivatedModal(show: boolean): void;
}

const initialState: ActivationType = {
  activationModal: false,
  notActivated: false
};

const reducer = (state: ActivationType, action: ActivationAction): ActivationType => {
  if (action.type === "SHOW_SUCCESSFUL_ACTIVATION_MODAL") {
    return { ...state, activationModal: action.payload.activationModal };
  }

  if (action.type === "SHOW_NOT_ACTIVATED_MODAL") {
    return { ...state, notActivated: action.payload.notActivated };
  }

  return state;
};

export const ActivationContext = React.createContext<ActivationContextType>(initialState as ActivationContextType);

export const ActivationContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [activation, dispatch] = React.useReducer(reducer, initialState);

  function showSuccessfulActivationModal(show: boolean): void {
    dispatch({
      type: "SHOW_SUCCESSFUL_ACTIVATION_MODAL",
      payload: {
        activationModal: show,
        notActivated: false
      }
    });
  }

  function showNotActivatedModal(show: boolean): void {
    dispatch({
      type: "SHOW_NOT_ACTIVATED_MODAL",
      payload: {
        notActivated: show,
        activationModal: false
      }
    });
  }

  return (
    <ActivationContext.Provider
      value={{
        ...activation,
        showSuccessfulActivationModal,
        showNotActivatedModal
      }}
    >
      {children}
    </ActivationContext.Provider>
  );
};
