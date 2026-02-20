import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    role: string;
    background: string;
    backgroundHighlight: string;
    themeIcon: "sun-o" | "moon-o";
    themeIconColor: string;
    primary: string;
    primaryTransparent: string;
    menuButtonBackground: string;
    menuButtonBorder: string;
    highScore: string;
  }
}
