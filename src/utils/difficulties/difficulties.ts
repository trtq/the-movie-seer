import { DIFFICULTY_NAME, TDifficulty } from "./types";

export const DIFFICULTIES: { [difficulty in DIFFICULTY_NAME]: TDifficulty } = {
  [DIFFICULTY_NAME.Easy]: {
    years: 15,
    pages: 3,
    health: 4,
    results: 3,
    minVotes: 1000,
    harderPictures: false,
  },
  [DIFFICULTY_NAME.Normal]: {
    years: 20,
    pages: 4,
    health: 3,
    results: 4,
    minVotes: 600,
    harderPictures: true,
  },
  [DIFFICULTY_NAME.Hard]: {
    years: 25,
    pages: 7,
    health: 2,
    results: 4,
    minVotes: 200,
    harderPictures: true,
  },
};
