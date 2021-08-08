import { SET_MENU_BUTTON_REF, SHOW_MENU } from "../consts/actionTypes";

function showMenu(showOffsideMenu: boolean) {
  return { type: SHOW_MENU, payload: { showOffsideMenu } };
}

function setMenuButtonRef(menuButtonRef: any) {
  return { type: SET_MENU_BUTTON_REF, payload: { menuButtonRef } };
}

export { showMenu, setMenuButtonRef };
