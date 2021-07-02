import React from "react";

type MenuAction = {
  type: "SHOW_MENU";
  payload: MenuType;
};

interface MenuType {
  show: boolean;
}

interface MenuContextType extends MenuType {
  showMenu(show: boolean): void;
}

const initialState: MenuType = {
  show: false
};

const reducer = (state: MenuType, action: MenuAction): MenuType => {
  if (action.type === "SHOW_MENU") {
    return { ...state, show: action.payload.show };
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

  return (
    <MenuContext.Provider
      value={{
        ...menu,
        showMenu
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
