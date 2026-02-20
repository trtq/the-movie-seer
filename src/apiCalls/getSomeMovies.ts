import axios from "axios";
import { TMovie } from "./types";

// this just gets some rather random movies for the wizard - it's the most popular movies from one random year
export const getSomeMovies = async (): Promise<TMovie[]> => {
  const apiUrl = process.env.EXPO_PUBLIC_TMDB_API_URL;
  const apiKey = process.env.EXPO_PUBLIC_TMDB_READ_KEY;
  const date = new Date();
  const year = date.getFullYear() - Math.round(Math.random() * 40);
  const response = await axios.get(
    `${apiUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=vote_count.desc&primary_release_year=${year}&with_original_language=en`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    },
  );
  if (response.data?.results) {
    return response.data?.results;
  }
  throw "movies not found";
};
