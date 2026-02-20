import { use, useEffect } from "react";
import { ScoreContext } from "../ScoreWrapper/ScoreWrapper";
import { DIFFICULTY_NAME } from "@/utils/difficulties/types";
import { Current, High, ScoreContainer, Slash } from "./layouts";

// score that we see during game - the screen tells us the current score and we get the highscore from context
export const ScoreCount = ({
  currentScore,
  difficulty,
}: {
  currentScore: number;
  difficulty: DIFFICULTY_NAME;
}) => {
  const { setNewScore, scores } = use(ScoreContext);

  const highScore = scores[difficulty];

  useEffect(() => {
    if (currentScore > highScore) {
      setNewScore(difficulty, currentScore);
    }
  }, [currentScore, difficulty, highScore, scores, setNewScore]);

  return (
    <ScoreContainer>
      <Current testID="score-current" green={currentScore === highScore}>
        {currentScore}
      </Current>
      <Slash>|</Slash>
      <High>{highScore}</High>
    </ScoreContainer>
  );
};
