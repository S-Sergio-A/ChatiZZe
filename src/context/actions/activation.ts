import { SHOW_NOT_ACTIVATED_MODAL } from "../consts/actionTypes";

function showNotActivated(notActivated: boolean) {
  return { type: SHOW_NOT_ACTIVATED_MODAL, payload: { notActivated } };
}

export { showNotActivated };
