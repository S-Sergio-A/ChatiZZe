import { SHOW_COOKIE_INFO, SHOW_SUCCESSFUL_VERIFICATION } from "../consts/actionTypes";

function showCookie(showCookie: boolean) {
  return { type: SHOW_COOKIE_INFO, payload: { showCookie } };
}

function showVerification(showVerification: boolean) {
  return { type: SHOW_SUCCESSFUL_VERIFICATION, payload: { showVerification } };
}

export { showCookie, showVerification };
