import { DIFFICULTY_NAME, TDifficulty } from "./types";

export const DIFFICULTIES: { [difficulty in DIFFICULTY_NAME]: TDifficulty } = {
  [DIFFICULTY_NAME.Easy]: {
    years: 15,
    pages: 3,
    health: 4,
    results: 3,
  },
  [DIFFICULTY_NAME.Normal]: {
    years: 20,
    pages: 5,
    health: 3,
    results: 4,
  },
  [DIFFICULTY_NAME.Hard]: {
    years: 25,
    pages: 7,
    health: 2,
    results: 4,
  },
};
