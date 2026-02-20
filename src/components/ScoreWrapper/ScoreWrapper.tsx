import { DIFFICULTY_NAME } from "@/utils/difficulties/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { TSCORES } from "./types";

const emptyScores: TSCORES = Object.fromEntries(
  Object.values(DIFFICULTY_NAME).map((key) => [key, 0]),
) as TSCORES;

export const ScoreContext = createContext<{
  scores: TSCORES;
  setNewScore: (difficulty: DIFFICULTY_NAME, score: number) => void;
}>({
  scores: emptyScores,
  setNewScore: () => {},
});

// Wrapper that sets up context for keeping the highscore, which gets saved in memory.
export const ScoreWrapper = ({ children }: { children: React.ReactNode }) => {
  const [scores, setScores] = useState<TSCORES>(emptyScores);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("scores")
      .then((savedScores) => {
        if (savedScores) setScores(JSON.parse(savedScores) as TSCORES);
      })
      .finally(() => setIsLoaded(true));
  }, []);

  useEffect(() => {
    if (isLoaded) AsyncStorage.setItem("scores", JSON.stringify(scores));
  }, [isLoaded, scores]);

  const setNewScore = (difficulty: DIFFICULTY_NAME, score: number) => {
    setScores((oldScores) => {
      const newScores = { ...oldScores };
      newScores[difficulty] = Math.max(newScores[difficulty], score);
      return newScores;
    });
  };

  return (
    <ScoreContext value={{ scores: scores || emptyScores, setNewScore }}>
      {children}
    </ScoreContext>
  );
};
