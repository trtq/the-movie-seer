import { SCREENS, TQuizNavigatorStackParamList } from "@/router/types";
import {
  Logo,
  Wizard,
  ButtonsBlock,
  ButtonContainer,
  ButtonText,
  BottomElements,
  ThemeButton,
  ThemeIcon,
} from "./layouts";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { use } from "react";
import { ThemeContext } from "@/components/ThemeWrapper/ThemeWrapper";
import { SafeContainer } from "@/components/SafeContainer/SafeContainer";

export const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<TQuizNavigatorStackParamList, SCREENS.Home>) => {
  const switchTheme = use(ThemeContext);
  return (
    <SafeContainer>
      <Logo testID="logo" />
      <ButtonsBlock>
        <ButtonContainer
          onPress={() => navigation.navigate(SCREENS.Difficulty)}
        >
          <ButtonText>play</ButtonText>
        </ButtonContainer>
        <ButtonContainer onPress={() => navigation.navigate(SCREENS.About)}>
          <ButtonText>about</ButtonText>
        </ButtonContainer>
      </ButtonsBlock>
      <BottomElements>
        <Wizard />
        <ThemeButton testID="theme-button" onPress={switchTheme}>
          <ThemeIcon name="sun-o" />
        </ThemeButton>
      </BottomElements>
    </SafeContainer>
  );
};
