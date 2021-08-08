import { SET_ERROR_CODE_AND_SHOW_ERROR_MODAL } from "../consts/actionTypes";

function setError(errorText: string) {
  return { type: SET_ERROR_CODE_AND_SHOW_ERROR_MODAL, payload: { errorText, show: true } };
}

function hideModal() {
  return { type: SET_ERROR_CODE_AND_SHOW_ERROR_MODAL, payload: { errorText: "", show: false } };
}

export { setError, hideModal };
