import { SHOW_NOT_ACTIVATED_MODAL } from "../consts/actionTypes";

type ActivationAction = {
  type: typeof SHOW_NOT_ACTIVATED_MODAL;
  payload: ActivationType;
};

interface ActivationType {
  notActivated: boolean;
}

const initialState = {
  notActivated: false
};

export const reducer = (state: ActivationType = initialState, action: ActivationAction): ActivationType => {
  switch (action.type) {
    case SHOW_NOT_ACTIVATED_MODAL:
      return { ...state, notActivated: action.payload.notActivated };
    default:
      return state;
  }
};
