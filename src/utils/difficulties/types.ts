export type TDifficulty = {
  // how recebt can a movie be - e.g. if it's 2 and right now it's 2026 then only 2026 and 2025 are allower
  years: number;
  // if this is 5, then we will grab the movie out of the first 5 pages on the results for the most popular movie of the year
  pages: number;
  health: number;
  results: number;
};

export enum DIFFICULTY_NAME {
  Easy = "Easy",
  Normal = "Normal",
  Hard = "Hard",
}
