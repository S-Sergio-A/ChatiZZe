import { CHECK_THEME, SET_CUSTOM_THEME, SET_DARK_THEME, SET_LIGHT_THEME, SHOW_CUSTOM_THEME_MODAL } from "../consts/actionTypes";

function setShowCustomThemeModal(showCustomThemeModal: boolean) {
  return { type: SHOW_CUSTOM_THEME_MODAL, payload: { showCustomThemeModal } };
}

function setLightTheme() {
  return { type: SET_LIGHT_THEME };
}

function setDarkTheme() {
  return { type: SET_DARK_THEME };
}

function setCustomTheme(
  primary: string,
  secondary: string,
  layout: string,
  borderPrimary: string,
  borderSecondary: string,
  colorPrimary: string,
  colorSecondary: string,
  backgroundImage: string
) {
  if (colorPrimary === "#ffffff" || colorSecondary === "#ffffff") {
    colorSecondary = "#000000";
  } else if (colorPrimary === "#000000" || colorSecondary === "#000000") {
    colorSecondary = "#ffffff";
  }

  return {
    type: SET_CUSTOM_THEME,
    payload: { primary, secondary, layout, borderPrimary, borderSecondary, colorPrimary, colorSecondary, backgroundImage }
  };
}

function checkTheme(cookies: any) {
  let type = "",
    primary = "",
    secondary = "",
    layout = "",
    borderPrimary = "",
    borderSecondary = "",
    colorPrimary = "",
    colorSecondary = "",
    backgroundImage = "";

  if (cookies.hasOwnProperty("theme-type")) {
    type = cookies["theme-type"].type;
  }

  if (type === "custom" && cookies.hasOwnProperty("theme")) {
    const theme = cookies["theme"];

    primary = theme.primary;
    secondary = theme.secondary;
    layout = theme.layout;
    borderPrimary = theme.borderPrimary;
    borderSecondary = theme.borderSecondary;
    colorPrimary = theme.colorPrimary;
    colorSecondary = theme.colorSecondary;
    backgroundImage = theme.backgroundImage;
  } else if (type === "dark") {
    return setDarkTheme();
  } else {
    return setLightTheme();
  }

  return {
    type: CHECK_THEME,
    payload: { type, primary, secondary, layout, borderPrimary, borderSecondary, colorPrimary, colorSecondary, backgroundImage }
  };
}

export { setLightTheme, setDarkTheme, setCustomTheme, checkTheme, setShowCustomThemeModal };
