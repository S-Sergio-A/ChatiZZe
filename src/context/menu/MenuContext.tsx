import React from "react";

type MenuAction = {
  type: "SHOW_MENU" | "SET_MENU_BUTTON_REF";
  payload: MenuType;
};

interface MenuType {
  show?: boolean;
  menuButtonRef?: any | null;
}

interface MenuContextType extends MenuType {
  showMenu(show: boolean): void;

  setRef(ref: React.MutableRefObject<any | null>): void;
}

const initialState: MenuType = {
  show: false,
  menuButtonRef: null
};

const reducer = (state: MenuType, action: MenuAction): MenuType => {
  if (action.type === "SHOW_MENU") {
    return { ...state, show: action.payload.show };
  }

  if (action.type === "SET_MENU_BUTTON_REF") {
    return { ...state, menuButtonRef: action.payload.menuButtonRef };
  }

  return state;
};

export const MenuContext = React.createContext<MenuContextType>(initialState as MenuContextType);

export const MenuContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [menu, dispatch] = React.useReducer(reducer, initialState);

  function showMenu(show: boolean): void {
    dispatch({
      type: "SHOW_MENU",
      payload: {
        show: show
      }
    });
  }

  function setRef(ref: React.MutableRefObject<any | null>): void {
    dispatch({
      type: "SET_MENU_BUTTON_REF",
      payload: {
        menuButtonRef: ref
      }
    });
  }

  return (
    <MenuContext.Provider
      value={{
        ...menu,
        showMenu,
        setRef
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
