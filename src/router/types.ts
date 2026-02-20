import { DIFFICULTY_NAME } from "@/utils/difficulties/types";

export enum SCREENS {
  Home = "Home",
  Game = "Game",
  Difficulty = "Difficulty",
  About = "About",
}

export type TQuizNavigatorStackParamList = {
  [SCREENS.Home]: undefined;
  [SCREENS.Game]: { difficulty: DIFFICULTY_NAME };
  [SCREENS.Difficulty]: undefined;
  [SCREENS.About]: undefined;
};
