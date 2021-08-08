import { CHECK_THEME, SET_CUSTOM_THEME, SET_DARK_THEME, SET_LIGHT_THEME, SHOW_CUSTOM_THEME_MODAL } from "../consts/actionTypes";
import { Cookies } from "react-cookie";

const themeType = new Cookies().get("theme-type");
let theme = new Cookies().get("theme");

if (themeType && theme) {
  switch (themeType.theme) {
    case "light":
      theme = {
        type: "light",
        primary: "#7400b8",
        secondary: "#dfbeff",
        layout: "#ebebeb",
        borderPrimary: "#dfe1e5",
        borderSecondary: "#b7b5b5",
        colorPrimary: "#ffffff",
        colorSecondary: "#000000",
        backgroundImage: ""
      };
      break;
    case "dark":
      theme = {
        type: "dark",
        primary: "#ffd300",
        secondary: "#2b2a22",
        layout: "#15130e",
        borderPrimary: "#a89e75",
        borderSecondary: "#202020",
        colorPrimary: "#181818",
        colorSecondary: "#c6c6c6",
        backgroundImage: ""
      };
      break;
    case "custom":
      theme = {
        type: theme.type,
        primary: theme.primary,
        secondary: theme.secondary,
        layout: theme.layout,
        borderPrimary: theme.borderPrimary,
        borderSecondary: theme.borderSecondary,
        colorPrimary: theme.colorPrimary,
        colorSecondary: theme.colorSecondary,
        backgroundImage: theme.backgroundImage
      };
      break;
    default:
      theme = {
        type: "",
        primary: "",
        secondary: "",
        layout: "",
        borderPrimary: "",
        borderSecondary: "",
        colorPrimary: "#ffffff",
        colorSecondary: "#000000",
        backgroundImage: ""
      };
      break;
  }
} else {
  theme = {
    type: "light",
    primary: "#7400b8",
    secondary: "#dfbeff",
    layout: "#ebebeb",
    borderPrimary: "#dfe1e5",
    borderSecondary: "#b7b5b5",
    colorPrimary: "#ffffff",
    colorSecondary: "#000000",
    backgroundImage: ""
  };
}

type ThemeAction = {
  type: typeof SHOW_CUSTOM_THEME_MODAL | typeof SET_LIGHT_THEME | typeof SET_DARK_THEME | typeof SET_CUSTOM_THEME | typeof CHECK_THEME;
  payload: ThemeType;
};

interface ThemeType {
  showCustomThemeModal: boolean;
  type: "light" | "dark" | "custom";
  primary: string;
  secondary: string;
  layout: string;
  borderPrimary: string;
  borderSecondary: string;
  colorPrimary: string;
  colorSecondary: string;
  backgroundImage: string;
}

const initialState: ThemeType = {
  showCustomThemeModal: false,
  type: theme.type,
  primary: theme.primary,
  secondary: theme.secondary,
  layout: theme.layout,
  borderPrimary: theme.borderPrimary,
  borderSecondary: theme.borderSecondary,
  colorPrimary: theme.colorPrimary,
  colorSecondary: theme.colorSecondary,
  backgroundImage: theme.backgroundImage
};

export const reducer = (state: ThemeType = initialState, action: ThemeAction): ThemeType => {
  switch (action.type) {
    case CHECK_THEME: {
      return {
        ...state,
        type: action.payload.type,
        primary: action.payload.primary,
        secondary: action.payload.secondary,
        layout: action.payload.layout,
        borderPrimary: action.payload.borderPrimary,
        borderSecondary: action.payload.borderSecondary,
        colorPrimary: action.payload.colorPrimary,
        colorSecondary: action.payload.colorSecondary,
        backgroundImage: action.payload.backgroundImage
      };
    }
    case SHOW_CUSTOM_THEME_MODAL: {
      return {
        ...state,
        showCustomThemeModal: action.payload.showCustomThemeModal
      };
    }
    case SET_LIGHT_THEME: {
      return {
        ...state,
        type: "light",
        primary: "#7400b8",
        secondary: "#dfbeff",
        layout: "#ebebeb",
        borderPrimary: "#dfe1e5",
        borderSecondary: "#b7b5b5",
        colorPrimary: "#ffffff",
        colorSecondary: "#000000",
        backgroundImage: ""
      };
    }
    case SET_DARK_THEME: {
      return {
        ...state,
        type: "dark",
        primary: "#ffd300",
        secondary: "#2b2a22",
        layout: "#15130e",
        borderPrimary: "#a89e75",
        borderSecondary: "#202020",
        colorPrimary: "#181818",
        colorSecondary: "#c6c6c6",
        backgroundImage: ""
      };
    }
    case SET_CUSTOM_THEME: {
      return {
        ...state,
        type: "custom",
        primary: action.payload.primary,
        secondary: action.payload.secondary,
        layout: action.payload.layout,
        borderPrimary: action.payload.borderPrimary,
        borderSecondary: action.payload.borderSecondary,
        colorPrimary: action.payload.colorPrimary,
        colorSecondary: action.payload.colorSecondary,
        backgroundImage: action.payload.backgroundImage
      };
    }
    default:
      return state;
  }
};
