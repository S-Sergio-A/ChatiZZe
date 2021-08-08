import { SET_ERROR_CODE_AND_SHOW_ERROR_MODAL } from "../consts/actionTypes";

type ErrorAction = {
  type: typeof SET_ERROR_CODE_AND_SHOW_ERROR_MODAL;
  payload: ErrorType;
};

interface ErrorType {
  show: boolean;
  errorText: string;
}

const initialState = {
  show: false,
  errorText: ""
};

export const reducer = (state: ErrorType = initialState, action: ErrorAction): ErrorType => {
  switch (action.type) {
    case SET_ERROR_CODE_AND_SHOW_ERROR_MODAL:
      return { ...state, show: action.payload.show, errorText: action.payload.errorText };
    default:
      return state;
  }
};
