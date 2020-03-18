import { createMuiTheme } from "@material-ui/core/styles";
import { pink, blue } from "@material-ui/core/colors";

import storage from "./store/storage";

export const THEMES = {
  light: "light",
  dark: "dark"
};

export const toggleTheme = currentTheme => {
  const { light, dark } = THEMES;

  const newTheme = currentTheme === light ? dark : light;

  return newTheme;
};

export const getDefaultTheme = () => {
  const { dark, light } = THEMES;
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").match
      ? dark
      : light;
  } catch (e) {
    return light;
  }
};

/**
 * @deprecated This function is temporary while login is isolated.
 */
export const isDarkTheme = () => {
  let theme;
  try {
    theme = storage.getTheme();
    // eslint-disable-next-line no-empty
  } catch (e) {}

  if (!theme) {
    theme = getDefaultTheme();
  }

  return theme === THEMES.dark;
};

export default {
  [THEMES.light]: createMuiTheme({
    palette: {
      primary: "#1f75ef",
      secondary: "#00307c",
      background: { default: "#1f4f4f4" }
    }
  }),
  [THEMES.dark]: createMuiTheme({
    palette: {
      primary: blue,
      secondary: pink,
      type: "dark"
    }
  })
};
