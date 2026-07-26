export type TDifficulty = {
  // how recent can a movie be - if it's 2 and right now it's 2026 then only 2025 and 2024 are allowed - current year excluded
  years: number;
  // if this is 5, then we will grab the movie out of the first 5 pages on the results for the most popular movie of the year
  pages: number;
  health: number;
  results: number;
  // a movie has to have at least this many votes on TMDB to be picked
  minVotes: number;
  // default picture is usually a very obvious. if this is true we pull additional pictures and show one of them
  harderPictures: boolean;
};

export enum DIFFICULTY_NAME {
  Easy = "Easy",
  Normal = "Normal",
  Hard = "Hard",
}
