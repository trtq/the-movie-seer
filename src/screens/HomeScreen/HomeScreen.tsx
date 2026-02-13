import { SCREENS, TQuizNavigatorStackParamList } from "@/router/types";
import { Container } from "./layouts";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "react-native";
import { WizardAnimation } from "@/components/WizardAnimation/WizardAnimation";

export const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<TQuizNavigatorStackParamList, SCREENS.Home>) => {
  return (
    <Container>
      <Button
        title="continue"
        onPress={() => navigation.navigate(SCREENS.Game)}
      />
      <Button
        title="new game"
        onPress={() => navigation.navigate(SCREENS.Difficulty)}
      />
      <Button
        title="about"
        onPress={() => navigation.navigate(SCREENS.About)}
      />
      <WizardAnimation />
    </Container>
  );
};
