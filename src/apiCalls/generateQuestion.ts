import { DIFFICULTIES } from "@/utils/difficulties/difficulties";
import { DIFFICULTY_NAME } from "@/utils/difficulties/types";
import axios from "axios";
import { TQuestion } from "./types";

const shuffleArray = (array: unknown[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// this generates a question - picture, id, and several answers, one of which is correct
export const generateQuestion = async (
  difficulty: DIFFICULTY_NAME,
  retries = 7,
): Promise<TQuestion> => {
  const apiUrl = process.env.EXPO_PUBLIC_TMDB_API_URL;
  const apiImageUrl = process.env.EXPO_PUBLIC_TMDB_IMAGE_URL;
  const apiKey = process.env.EXPO_PUBLIC_TMDB_READ_KEY;

  const date = new Date();
  // a year of the generated question is random, the range depends on the difficulty
  const year =
    date.getFullYear() -
    Math.round(Math.random() * DIFFICULTIES[difficulty].years);
  // same with the page in the list of results
  const page = 1 + Math.round(Math.random() * DIFFICULTIES[difficulty].pages);
  // amountOfWrongAnswers - amount of incorrect results that will be generated. "- 1" - because one will be correct
  const amountOfWrongAnswers = DIFFICULTIES[difficulty].results - 1;
  // this call will get us a list of movies - how unpopular they are depends on difficulty and random chance. Will pick one movie out of the list.
  const moviesResp = await axios.get(
    `${apiUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=vote_count.desc&page=${page}&primary_release_year=${year}&with_original_language=en`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      timeout: 3000,
    },
  );
  if (moviesResp.status !== 200 || !moviesResp.data) {
    throw "results are incorrect";
  }
  if (moviesResp.data?.results.length === 0) {
    throw "no results";
  }
  // this filter guards against movies not having a backdrop image - doesn't happen in practice but is theoretically possible
  const validMovies =
    moviesResp.data?.results.filter((m: any) => m.backdrop_path) ?? [];
  if (validMovies.length > 0) {
    const movie = validMovies[Math.floor(Math.random() * validMovies.length)];
    // now that we have our movie, we get a list of similar movies to get some incorrect answers.
    const similarResp = await axios.get(
      `${apiUrl}/movie/${movie.id}/similar?language=en-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        timeout: 10000,
      },
    );
    if (similarResp.status !== 200 || !similarResp.data) {
      throw "result for a similar movie search are incorrect";
    }
    if (similarResp.data?.results.length > amountOfWrongAnswers) {
      const result: TQuestion = {
        id: movie.id,
        picture: apiImageUrl + movie.backdrop_path,
        answers: [{ id: movie.id, name: movie.title, correct: true }],
      };
      let similarsCopy = [...similarResp.data.results];
      // the incorrect answers will be picked out of 8 most similar movies
      similarsCopy = similarsCopy.slice(0, 8);
      shuffleArray(similarsCopy);
      const similarAnswers = similarsCopy.slice(0, amountOfWrongAnswers);
      for (const similar of similarAnswers) {
        result.answers.push({
          id: similar.id,
          name: similar.title,
          correct: false,
        });
      }
      shuffleArray(result.answers);
      return result;
    } else {
      // ~1% of movies have no similar results and require a retry; give up after 7 attempts
      if (retries <= 0)
        throw "could not find a movie with sufficient similar results";
      return await generateQuestion(difficulty, retries - 1);
    }
  } else {
    // all movies on this page had no backdrop - retry with a new random page
    if (retries <= 0) throw "could not find a movie with a backdrop image";
    return await generateQuestion(difficulty, retries - 1);
  }
};
