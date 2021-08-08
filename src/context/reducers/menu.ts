import { SET_MENU_BUTTON_REF, SHOW_MENU } from "../consts/actionTypes";

type MenuAction = {
  type: typeof SET_MENU_BUTTON_REF | typeof SHOW_MENU;
  payload: MenuType;
};

interface MenuType {
  showOffsideMenu?: boolean;
  menuButtonRef?: any | null;
}

const initialState = {
  showOffsideMenu: false,
  menuButtonRef: null
};

export const reducer = (state: MenuType = initialState, action: MenuAction): MenuType => {
  switch (action.type) {
    case SET_MENU_BUTTON_REF:
      return { ...state, menuButtonRef: action.payload.menuButtonRef };
    case SHOW_MENU:
      return { ...state, showOffsideMenu: action.payload.showOffsideMenu };
    default:
      return state;
  }
};
