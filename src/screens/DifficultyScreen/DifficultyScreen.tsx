import {
  ButtonsBlock,
  DifficultyButton,
  DifficultyButtonInside,
  DifficultyButtonText,
  HighscoreHighlight,
  HighscoreText,
} from "./layouts";
import { TQuizNavigatorStackParamList, SCREENS } from "@/router/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BackButton } from "@/components/BackButton/BackButton";
import { SafeContainer } from "@/components/SafeContainer/SafeContainer";
import { DIFFICULTY_NAME } from "@/utils/difficulties/types";
import { use } from "react";
import { ScoreContext } from "@/components/ScoreWrapper/ScoreWrapper";

// the difficulties are not set in stone - although some styling should be changed if a fourth difficulty is needed
export const DifficultyScreen = ({
  navigation,
}: NativeStackScreenProps<
  TQuizNavigatorStackParamList,
  SCREENS.Difficulty
>) => {
  const { scores } = use(ScoreContext);
  return (
    <SafeContainer>
      <BackButton onPress={navigation.goBack} />
      <ButtonsBlock>
        {Object.values(DIFFICULTY_NAME).map((difficulty) => (
          <DifficultyButton
            key={difficulty}
            onPress={() => navigation.navigate(SCREENS.Game, { difficulty })}
            testID={difficulty + "difficultytest"}
          >
            <DifficultyButtonInside>
              <DifficultyButtonText>{difficulty}</DifficultyButtonText>
              <HighscoreText>
                High score:{" "}
                <HighscoreHighlight>{scores[difficulty]}</HighscoreHighlight>
              </HighscoreText>
            </DifficultyButtonInside>
          </DifficultyButton>
        ))}
      </ButtonsBlock>
    </SafeContainer>
  );
};
