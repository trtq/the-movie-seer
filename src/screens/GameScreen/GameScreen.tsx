import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SCREENS, TQuizNavigatorStackParamList } from "@/router/types";
import { SafeContainer } from "@/components/SafeContainer/SafeContainer";
import React, { useCallback, useEffect, useState } from "react";
import { DIFFICULTIES } from "@/utils/difficulties/difficulties";
import {
  InsideContainer,
  HeartsBlock,
  Heart,
  HeartContainer,
  ScoreContainer,
  GiveUpButtonContainer,
  GiveUpButtonButtonIcon,
} from "./layouts";
import { useSharedValue, withDelay, withSpring } from "react-native-reanimated";
import { GameCard } from "@/components/GameCard/GameCard";
import { ScoreCount } from "@/components/ScoreCount/ScoreCount";
import { GameOverModal } from "@/components/GameModals/GameOverModal";
import { ErrorModal } from "@/components/GameModals/ErrorModal";
import { GiveUpModal } from "@/components/GameModals/GiveUpModal";

// this screen shows the game and keeps the game state. It shows the current questions and tracks the game state
export const GameScreen = ({
  navigation,
  route: {
    params: { difficulty },
  },
}: NativeStackScreenProps<TQuizNavigatorStackParamList, SCREENS.Game>) => {
  const [currentScore, setCurrentScore] = useState(0);
  const animationProgress = useSharedValue(0);
  const [lives, setLives] = useState(DIFFICULTIES[difficulty].health);
  const [giveUpModalVisible, setGiveUpModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  // animationProgress smoothly follows currentScore - the card components track both of these and are in the foreground once currentScore = animationProgress.value, allowing for smooth animations
  useEffect(() => {
    if (lives > 0)
      animationProgress.value = withDelay(
        1200,
        withSpring(currentScore, {
          duration: 500,
        }),
      );
  }, [animationProgress, currentScore, lives]);

  const onRightAnswer = () => {
    setCurrentScore((oldScore) => oldScore + 1);
  };

  const onWrongAnswer = () => {
    setLives((oldLives) => oldLives - 1);
    setCurrentScore((oldScore) => oldScore + 1);
  };

  // onError ends up being a dependence, so we have to wrap it in useCallback
  const onError = useCallback(() => {
    setErrorModalVisible(true);
  }, []);

  return (
    <>
      <SafeContainer>
        <InsideContainer>
          <GiveUpButtonContainer onPress={() => setGiveUpModalVisible(true)}>
            <GiveUpButtonButtonIcon name="close" />
          </GiveUpButtonContainer>
          <ScoreContainer>
            <ScoreCount currentScore={currentScore} difficulty={difficulty} />
          </ScoreContainer>
          <HeartsBlock>
            {[...Array(lives)].map((item, index) => (
              <HeartContainer key={"heart" + index}>
                <Heart testID="heart-icon" name="heart" />
              </HeartContainer>
            ))}
          </HeartsBlock>
          {/* we print only 3 GameCards, and change their keys throughout the game - same logic as outputing an array with .map - thanks to keys react knows that the GameCard's state should persist thorughout three different calls */}
          {currentScore > 0 && (
            <GameCard
              key={"question" + (currentScore - 1)}
              questionNum={currentScore - 1}
              animationProgress={animationProgress}
              onRightAnswer={onRightAnswer}
              onWrongAnswer={onWrongAnswer}
              onError={onError}
              difficulty={difficulty}
              disabled
            />
          )}
          <GameCard
            key={"question" + currentScore}
            questionNum={currentScore}
            animationProgress={animationProgress}
            onRightAnswer={onRightAnswer}
            onWrongAnswer={onWrongAnswer}
            onError={onError}
            disabled={lives === 0}
            difficulty={difficulty}
          />
          <GameCard
            key={"question" + (currentScore + 1)}
            questionNum={currentScore + 1}
            animationProgress={animationProgress}
            onRightAnswer={onRightAnswer}
            onWrongAnswer={onWrongAnswer}
            onError={onError}
            disabled
            difficulty={difficulty}
          />
        </InsideContainer>
      </SafeContainer>
      {lives === 0 && (
        <GameOverModal
          onRestart={() => navigation.replace(SCREENS.Game, { difficulty })}
          onMenu={() => navigation.popToTop()}
          score={currentScore}
        />
      )}
      {errorModalVisible && <ErrorModal onMenu={() => navigation.popToTop()} />}
      {giveUpModalVisible && (
        <GiveUpModal
          onContinue={() => setGiveUpModalVisible(false)}
          onMenu={() => navigation.popToTop()}
        />
      )}
    </>
  );
};
