import { Container } from "./layouts";
import { Button } from "react-native";
import { TQuizNavigatorStackParamList, SCREENS } from "@/router/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export const DifficultyScreen = ({
  navigation,
}: NativeStackScreenProps<
  TQuizNavigatorStackParamList,
  SCREENS.Difficulty
>) => {
  return (
    <Container>
      <Button title="hard" onPress={() => navigation.navigate(SCREENS.Game)} />
      <Button
        title="normal"
        onPress={() => navigation.navigate(SCREENS.Game)}
      />
      <Button title="easy" onPress={() => navigation.navigate(SCREENS.Game)} />
      <Button title="back" onPress={navigation.goBack} />
    </Container>
  );
};
