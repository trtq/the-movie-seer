import { AnswersContainer, Card, Loader, MoviePicture } from "./layouts";
import { useEffect, useState } from "react";
import {
  SharedValue,
  SlideOutLeft,
  useAnimatedStyle,
} from "react-native-reanimated";
import { s } from "react-native-size-matters";
import { DIFFICULTY_NAME } from "@/utils/difficulties/types";
import { GameAnswerButton } from "../GameAnswerButton/GameAnswerButton";
import { generateQuestion } from "@/apiCalls/generateQuestion";
import { TQuestion } from "@/apiCalls/types";

const cardDistance = s(330);

// A gamecard component gets mounted in the game, loads up the question for itself and waits for an answer
export const GameCard = ({
  onRightAnswer,
  onWrongAnswer,
  onError,
  disabled,
  questionNum,
  animationProgress,
  difficulty,
}: {
  onRightAnswer: () => void;
  onWrongAnswer: () => void;
  onError: () => void;
  disabled: boolean;
  questionNum: number;
  animationProgress: SharedValue<number>;
  difficulty: DIFFICULTY_NAME;
}) => {
  const [question, setQuestion] = useState<TQuestion | null>(null);

  useEffect(() => {
    const getQuestion = async () => {
      try {
        setQuestion(await generateQuestion(difficulty));
      } catch {
        onError();
      }
    };
    getQuestion();
  }, [difficulty, onError]);

  // questionNum is the current active question - animationProgress smoothly follows it along - so at question - animationProgress the card should be in the middle of the screen.
  const cardMovement = useAnimatedStyle(() => {
    const position = questionNum - animationProgress.value;
    return { transform: [{ translateX: position * cardDistance }] };
  });

  return (
    <Card style={cardMovement} exiting={SlideOutLeft.delay(1200)}>
      {question ? (
        <>
          <MoviePicture source={question.picture} />
          <AnswersContainer>
            {question.answers.map((answer) => (
              <GameAnswerButton
                correct={answer.correct}
                disabled={disabled}
                onPress={answer.correct ? onRightAnswer : onWrongAnswer}
                key={answer.id}
              >
                {answer.name}
              </GameAnswerButton>
            ))}
          </AnswersContainer>
        </>
      ) : (
        <Loader testID="question-loader" />
      )}
    </Card>
  );
};
