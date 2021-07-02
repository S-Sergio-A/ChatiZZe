import React from "react";

type ThemeAction = {
  type: "SET_LIGHT_THEME" | "SET_DARK_THEME" | "SET_CUSTOM_THEME";
  payload: ThemeType;
};

interface ThemeType {
  primary?: string;
  secondary?: string;
  backgroundImage?: string;
}

interface ThemeContextType extends ThemeType {
  setLightTheme(): void;
  setDarkTheme(): void;
  setCustomTheme(primary?: string, secondary?: string, backgroundImage?: string): void;
}

const initialState: ThemeType = {
  primary: "#171614",
  secondary: "#FFD100",
  backgroundImage: ""
};

const reducer = (state: ThemeType, action: ThemeAction): ThemeType => {
  if (action.type === "SET_LIGHT_THEME") {
    return { ...state, primary: "#D6D6D6", secondary: "#480CA8", backgroundImage: "" };
  }

  if (action.type === "SET_DARK_THEME") {
    return { ...state, primary: "#171614", secondary: "#FFD100", backgroundImage: "" };
  }

  if (action.type === "SET_CUSTOM_THEME") {
    return {
      ...state,
      primary: action.payload.primary ? action.payload.primary : state.primary,
      secondary: action.payload.secondary ? action.payload.secondary : state.secondary,
      backgroundImage: action.payload.backgroundImage ? action.payload.backgroundImage : state.backgroundImage
    };
  }

  return state;
};

export const ThemeContext = React.createContext<ThemeContextType>(initialState as ThemeContextType);

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, dispatch] = React.useReducer(reducer, initialState);

  function setLightTheme(): void {
    dispatch({
      type: "SET_LIGHT_THEME",
      payload: {
        primary: "#D6D6D6",
        secondary: "#480CA8",
        backgroundImage: ""
      }
    });
  }

  function setDarkTheme(): void {
    dispatch({
      type: "SET_DARK_THEME",
      payload: {
        primary: "#171614",
        secondary: "#FFD100",
        backgroundImage: ""
      }
    });
  }

  function setCustomTheme(primary?: string, secondary?: string, backgroundImage?: string): void {
    dispatch({
      type: "SET_CUSTOM_THEME",
      payload: {
        primary: primary,
        secondary: secondary,
        backgroundImage: backgroundImage
      }
    });
  }

  return (
    <ThemeContext.Provider
      value={{
        ...theme,
        setLightTheme,
        setDarkTheme,
        setCustomTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
