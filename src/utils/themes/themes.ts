import { DefaultTheme } from "styled-components/native";

export enum THEME_NAMES {
  dark = "dark",
  light = "light",
}

export const themes: { [themeName in THEME_NAMES]: DefaultTheme } = {
  [THEME_NAMES.dark]: {
    role: "dark",
    background: "#0f0d0a",
    backgroundHighlight: "#14120e",
    themeIcon: "sun-o",
    themeIconColor: "white",
    primary: "white",
    primaryTransparent: "rgba(255,255,255,0.25)",
    menuButtonBackground: "#13110a",
    menuButtonBorder: "white",
    highScore: "#00ff77",
  },
  [THEME_NAMES.light]: {
    role: "light",
    background: "#f1e3c6",
    backgroundHighlight: "#e4dbbc",
    themeIcon: "moon-o",
    themeIconColor: "black",
    primary: "black",
    primaryTransparent: "rgba(0,0,0,0.25)",
    menuButtonBackground: "white",
    menuButtonBorder: "black",
    highScore: "#006730",
  },
};
